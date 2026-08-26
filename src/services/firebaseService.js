import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off, serverTimestamp } from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import { sanitizeRecipe } from './dbStorage';

// ⚠️ 【开发者必看】：在此处填入你在 Firebase 后台创建的项目配置
// 步骤：前往 https://console.firebase.google.com/
// 1. 创建新项目 (Cookoo)
// 2. 左侧菜单 -> Build -> Realtime Database -> 创建数据库 (选新加坡或美国节点)，规则(Rules)设置为:
//    { "rules": { ".read": "auth != null", ".write": "auth != null" } }
// 3. 左侧菜单 -> Build -> Authentication -> Sign-in method -> 开启 Anonymous (匿名登录)
// 4. Project Overview (项目概览) -> 点击 Web 图标 `</>` -> 注册应用，复制配置替换下方内容：
const firebaseConfig = {
  apiKey: "AIzaSyCzQvcTlVA0KkaIzOheJbb3ymvdWcOhV6s",
  authDomain: "cookoo-sync.firebaseapp.com",
  databaseURL: "https://cookoo-sync-default-rtdb.firebaseio.com",
  projectId: "cookoo-sync",
  storageBucket: "cookoo-sync.firebasestorage.app",
  messagingSenderId: "17761292930",
  appId: "1:17761292930:web:ed8af5c47a677d35e15a9b",
  measurementId: "G-DXBLKNGR3K"
};

// ==========================================
// Firebase 实时同步引擎 (毫秒级 WebSocket)
// ==========================================
let app = null;
let database = null;
let auth = null;
let currentUnsubscribe = null;
export let isFirebaseReady = false;

// 1. 初始化 Firebase 并静默匿名登录
export async function initFirebaseAndLogin() {
  if (firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.warn("⚠️ Firebase 未配置！请替换 firebaseService.js 中的 firebaseConfig。实时同步暂停。");
    return false;
  }
  try {
    if (!app) {
      app = initializeApp(firebaseConfig);
      database = getDatabase(app);
      auth = getAuth(app);
    }
    await signInAnonymously(auth);
    isFirebaseReady = true;
    console.log("🔥 Firebase 匿名登录成功，WebSocket 通道已建立！");
    return true;
  } catch (e) {
    console.error("Firebase 初始化失败:", e);
    return false;
  }
}

export const localClientId = Math.random().toString(36).substring(2, 15);

// 2. 将全局数据推送到 Firebase
export function pushToGlobalState(recipes, userState) {
  if (!isFirebaseReady || !database) return;
  const dbRef = ref(database, 'cookoo_global_state');
  
  const payload = {
    recipes: recipes || [],
    userState: userState || {},
    pushTimestamp: Date.now(),
    senderId: localClientId // 用来标识是当前设备的修改，防止自己接收自己
  };
  
  set(dbRef, payload).catch(e => console.error('Push error:', e));
}

// 3. 订阅 Firebase 的全局实时数据流
export function subscribeToGlobalState(onDataPushedFromCloud) {
  if (!isFirebaseReady || !database) return;
  
  if (currentUnsubscribe) {
    currentUnsubscribe();
    currentUnsubscribe = null;
  }
  
  const dbRef = ref(database, 'cookoo_global_state');
  
  const listener = onValue(dbRef, (snapshot) => {
    const cloudData = snapshot.val();
    if (cloudData && cloudData.userState) {
       onDataPushedFromCloud(cloudData);
    } else {
       onDataPushedFromCloud(null);
    }
  });

  currentUnsubscribe = () => off(dbRef, 'value', listener);
}


// ==========================================
// LWW 架构与 Tombstones 状态合并引擎 (同上)
// ==========================================
export function mergeDataForCode(localData = {}, cloudData = {}) {
  const localRecipes = localData.recipes || [];
  const localState = localData.userState || {};

  const cloudRecipes = cloudData.recipes || [];
  const cloudState = cloudData.userState || {};

  const localTime = localState.lastModified || 0;
  const cloudTime = cloudState.lastModified || 0;

  let mergedRecipes = [];
  let mergedState = {};

  if (cloudTime > localTime && (Array.isArray(cloudRecipes) || cloudState.lastModified)) {
    mergedRecipes = cloudRecipes.length > 0 ? cloudRecipes : localRecipes;
    mergedState = { ...cloudState };
  } else if (localTime > cloudTime && (Array.isArray(localRecipes) || localState.lastModified)) {
    mergedRecipes = localRecipes.length > 0 ? localRecipes : cloudRecipes;
    mergedState = { ...localState };
  } else {
    const recipeMap = new Map();
    (localRecipes || []).forEach(r => r?.id && recipeMap.set(r.id, r));
    (cloudRecipes || []).forEach(r => {
      if (r?.id) {
        const existing = recipeMap.get(r.id);
        recipeMap.set(r.id, { ...existing, ...r });
      }
    });
    mergedRecipes = Array.from(recipeMap.values());

    const localFavs = new Set(localState.favoriteIds || localRecipes.filter(r => r.isFavorite).map(r => r.id));
    const cloudFavs = new Set(cloudState.favoriteIds || cloudRecipes.filter(r => r.isFavorite).map(r => r.id));
    const mergedFavs = Array.from(new Set([...localFavs, ...cloudFavs]));

    const localLikes = new Set(localState.likedIds || localRecipes.filter(r => r.isLiked).map(r => r.id));
    const cloudLikes = new Set(cloudState.likedIds || cloudRecipes.filter(r => r.isLiked).map(r => r.id));
    const mergedLikes = Array.from(new Set([...localLikes, ...cloudLikes]));

    const deletedRecordIds = new Set([
      ...(localState.deletedRecordIds || []),
      ...(cloudState.deletedRecordIds || [])
    ]);

    const historyMap = new Map();
    [...(localState.cookedHistory || []), ...(cloudState.cookedHistory || [])].forEach(item => {
      if (item && (item.id || item.timestamp)) {
        const key = item.id || `${item.title}_${item.timestamp}`;
        if (!deletedRecordIds.has(key) && !deletedRecordIds.has(item.id)) {
          historyMap.set(key, item);
        }
      }
    });

    mergedState = {
      favoriteIds: mergedFavs,
      likedIds: mergedLikes,
      deletedRecordIds: Array.from(deletedRecordIds),
      cookedHistory: Array.from(historyMap.values()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)),
      lastModified: Math.max(localTime, cloudTime, Date.now())
    };
  }

  const deletedRecipeSet = new Set(mergedState.deletedRecipeIds || []);
  if (deletedRecipeSet.size > 0) {
    mergedRecipes = mergedRecipes.filter(r => !deletedRecipeSet.has(r.id));
  }

  const deletedRecordSet = new Set(mergedState.deletedRecordIds || []);
  const activeHistory = (mergedState.cookedHistory || []).filter(item => item && !deletedRecordSet.has(item.id));

  const favSet = new Set(mergedState.favoriteIds || []);
  const likeSet = new Set(mergedState.likedIds || []);

  const finalizedRecipes = mergedRecipes.map(sanitizeRecipe).map(r => ({
    ...r,
    isFavorite: favSet.has(r.id),
    isLiked: likeSet.has(r.id),
    likes: likeSet.has(r.id) ? (r.likes > 0 ? r.likes : 1) : 0
  }));

  return {
    recipes: finalizedRecipes,
    userState: {
      ...mergedState,
      cookedHistory: activeHistory
    }
  };
}
