import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_DATABASE } from './src/data/defaultDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

app.use(cors());
app.use(express.json());

// Serve static frontend build if dist exists (Production Mode)
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
}

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error loading config:', err);
  }
  return {
    apiKey: process.env.AI_API_KEY || '',
    apiBase: process.env.AI_API_BASE || 'https://api.deepseek.com/v1',
    model: process.env.AI_MODEL || 'deepseek-chat'
  };
}

function saveConfig(cfg) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(cfg, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving config:', err);
    return false;
  }
}

function loadDatabase() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error loading database.json, re-initializing:', err);
  }
  
  fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATABASE, null, 2), 'utf-8');
  return DEFAULT_DATABASE;
}

function saveDatabase(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving database.json:', err);
    return false;
  }
}

// 1. Get entire database
app.get('/api/db', (req, res) => {
  const db = loadDatabase();
  res.json({ success: true, data: db });
});

// 2. Get / Save AI Configuration
app.get('/api/config', (req, res) => {
  const cfg = loadConfig();
  const maskedKey = cfg.apiKey ? `${cfg.apiKey.slice(0, 4)}...${cfg.apiKey.slice(-4)}` : '';
  res.json({ success: true, config: { ...cfg, maskedKey, hasKey: Boolean(cfg.apiKey) } });
});

app.post('/api/config', (req, res) => {
  const { apiKey, apiBase, model } = req.body;
  const current = loadConfig();
  if (apiKey !== undefined) current.apiKey = apiKey;
  if (apiBase !== undefined) current.apiBase = apiBase;
  if (model !== undefined) current.model = model;
  saveConfig(current);
  res.json({ success: true, message: 'AI 配置已保存' });
});

// 3. AI Real-time Ingredient Combinator & Recipe Generator
app.post('/api/ai/generate-recipes', async (req, res) => {
  const { ingredients = [], prompt } = req.body;
  const cfg = loadConfig();

  const ingText = ingredients.join('、');
  const systemPrompt = `你是一位精通中式家常菜与租房电磁炉/电饭煲极简自炊的美食大师。
用户冰箱里只有以下食材：【${ingText}】。
请结合网络上的热门家常做法与租房做饭特点，构思出 2~3 道真正适合电磁炉（平底锅/汤锅）或电饭煲完成的美味快手菜。
要求：
1. 必须使用提供的食材，避免需要高压炖煮的硬骨头或生僻调料。
2. 给出清晰的电磁炉火力建议（如1200W、1600W等）或电饭煲一键做法。
3. 请以严格的 JSON 格式输出，格式为：
{
  "recipes": [
    {
      "title": "菜名",
      "subtitle": "一句话吸引人的特色与风味介绍",
      "mealTypes": ["lunch", "dinner"],
      "cookTime": "10 分钟",
      "minutes": 10,
      "calories": "320 kcal",
      "difficulty": "简单",
      "inductionTips": "电磁炉火力说明",
      "riceCookerFriendly": false,
      "ingredients": [
        { "name": "食材名", "amount": "适量", "icon": "🥗" }
      ],
      "steps": [
        { "stepNumber": 1, "title": "步骤名", "description": "具体动作与火力", "duration": 3 }
      ]
    }
  ]
}`;

  if (cfg.apiKey) {
    try {
      const response = await fetch(`${cfg.apiBase.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cfg.apiKey}`
        },
        body: JSON.stringify({
          model: cfg.model || 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `请用这些食材：${ingText}，生成2~3道电磁炉/电饭煲快手菜。` }
          ],
          temperature: 0.7,
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return res.json({ success: true, source: 'ai_live', recipes: parsed.recipes || parsed });
        }
      }
    } catch (err) {
      console.error('AI API Call failed, falling back to smart dynamic combinator:', err);
    }
  }

  const dynamicRecipes = [
    {
      title: `鲜香${ingredients.slice(0, 2).join('炒')}盖浇饭`,
      subtitle: `AI 根据你选中的【${ingText}】实时规划的 10 分钟平底锅快炒神仙下饭菜！`,
      mealTypes: ['lunch', 'dinner'],
      cookTime: '10 分钟',
      minutes: 10,
      calories: '340 kcal',
      difficulty: '简单',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: `平底锅1200W热油炒香底料，1600W大火下入${ingredients[0] || '主料'}快速翻炒2分钟，淋生抽蚝油大火收汁！`,
      ingredients: ingredients.map(name => ({ name, amount: '适量', icon: '🥗' })),
      steps: [
        { stepNumber: 1, title: '食材改刀', description: `将${ingText}分别洗净切片/切丁备用。`, duration: 3 },
        { stepNumber: 2, title: '大火滑炒', description: `电磁炉平底锅开1400W热油，先下葱蒜与主料翻炒至断生。`, duration: 4 },
        { stepNumber: 3, title: '调味出锅', description: `调入生抽、蚝油和少许胡椒粉，大火翻匀浇在米饭上！`, duration: 3 }
      ]
    },
    {
      title: `暖心${ingredients[0] || '时蔬'}金汤热汤面/暖煲`,
      subtitle: `热气腾腾吸饱汤汁，简单鲜美，早起或深夜暖胃一锅出！`,
      mealTypes: ['breakfast', 'night'],
      cookTime: '8 分钟',
      minutes: 8,
      calories: '280 kcal',
      difficulty: '简单',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '电磁炉1800W大火烧开水，下入食材煮3分钟，出锅前淋香油与生抽即可。',
      ingredients: ingredients.map(name => ({ name, amount: '适量', icon: '🍲' })),
      steps: [
        { stepNumber: 1, title: '烧开水底', description: '汤锅加2碗清水，1800W大火烧沸。', duration: 2 },
        { stepNumber: 2, title: '下料焖煮', description: `依次放入${ingText}，中火1400W滚煮3分钟至食材软嫩入味。`, duration: 4 },
        { stepNumber: 3, title: '撒葱花出锅', description: '加少许盐、生抽和香油，连汤带菜趁热享用！', duration: 2 }
      ]
    }
  ];

  res.json({ success: true, source: 'smart_engine', recipes: dynamicRecipes, isLiveKeyConfigured: Boolean(cfg.apiKey) });
});

// 4. AI Parse Recipe Text
app.post('/api/ai/parse-recipe', async (req, res) => {
  const { text, targetMealType = 'lunch' } = req.body;
  const cfg = loadConfig();

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text required' });
  }

  const systemPrompt = `你是一位专业菜谱整理助手。请将用户的文本（可能是一段做菜流水账或笔记）结构化为标准菜谱。
必须输出严格的 JSON 格式：
{
  "title": "菜品名称",
  "subtitle": "一句话介绍特色",
  "cookTime": "15 分钟",
  "minutes": 15,
  "calories": "320 kcal",
  "difficulty": "简单",
  "mealTypes": ["${targetMealType}"],
  "inductionFriendly": true,
  "riceCookerFriendly": false,
  "inductionTips": "电磁炉火力建议",
  "ingredients": [
    { "name": "食材名", "amount": "用量", "icon": "🥗" }
  ],
  "steps": [
    { "stepNumber": 1, "title": "步骤标题", "description": "详细动作", "duration": 3 }
  ]
}`;

  if (cfg.apiKey) {
    try {
      const response = await fetch(`${cfg.apiBase.replace(/\/+$/, '')}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cfg.apiKey}`
        },
        body: JSON.stringify({
          model: cfg.model || 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: text }
          ],
          temperature: 0.5,
          response_format: { type: 'json_object' }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return res.json({ success: true, source: 'ai_live', recipe: parsed });
        }
      }
    } catch (err) {
      console.error('AI Parse API Call failed, falling back:', err);
    }
  }

  const lines = text.split(/[\n，。；！]/).filter(s => s.trim().length > 0);
  const extractedTitle = text.match(/【(.*?)】/) ? text.match(/【(.*?)】/)[1] : (lines[0] ? lines[0].slice(0, 10) : '自定义整理菜谱');

  const fallbackRecipe = {
    title: extractedTitle,
    subtitle: '根据你的笔记提炼的精美自炊菜谱。',
    cookTime: '12 分钟',
    minutes: 12,
    calories: '310 kcal',
    difficulty: '简单',
    mealTypes: [targetMealType],
    inductionFriendly: true,
    riceCookerFriendly: false,
    inductionTips: '电磁炉平底锅1200W热油爆香，1600W大火滑炒收汁。',
    ingredients: [
      { name: '主料', amount: '适量', icon: '🥩' },
      { name: '配菜/葱蒜', amount: '适量', icon: '🧅' },
      { name: '生抽+食用油', amount: '适量', icon: '🍾' }
    ],
    steps: lines.slice(0, 4).map((line, idx) => ({
      stepNumber: idx + 1,
      title: `步骤 ${idx + 1}`,
      description: line.trim(),
      duration: 3
    }))
  };

  res.json({ success: true, source: 'smart_engine', recipe: fallbackRecipe });
});

// 5. Update user state
app.post('/api/user-state', (req, res) => {
  const { cookedHistory } = req.body;
  const db = loadDatabase();
  if (Array.isArray(cookedHistory)) db.userState.cookedHistory = cookedHistory;
  saveDatabase(db);
  res.json({ success: true, userState: db.userState });
});

// 6. Add recipe
app.post('/api/recipes', (req, res) => {
  const newRecipe = req.body;
  if (!newRecipe || !newRecipe.title) {
    return res.status(400).json({ error: 'Recipe title required' });
  }
  
  const db = loadDatabase();
  db.recipes.unshift(newRecipe);
  saveDatabase(db);
  res.json({ success: true, recipe: newRecipe, recipes: db.recipes });
});

// 7. Toggle favorite
app.post('/api/recipes/favorite', (req, res) => {
  const { recipeId } = req.body;
  const db = loadDatabase();
  db.recipes = db.recipes.map(r => r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r);
  saveDatabase(db);
  res.json({ success: true, recipes: db.recipes });
});

// 8. Toggle like
app.post('/api/recipes/like', (req, res) => {
  const { recipeId } = req.body;
  const db = loadDatabase();
  db.recipes = db.recipes.map(r => {
    if (r.id === recipeId) {
      const nextLiked = !r.isLiked;
      return { ...r, isLiked: nextLiked, likes: nextLiked ? r.likes + 1 : r.likes - 1 };
    }
    return r;
  });
  saveDatabase(db);
  res.json({ success: true, recipes: db.recipes });
});

// 9. Reset database
app.post('/api/reset', (req, res) => {
  const cleanDb = {
    ...DEFAULT_DATABASE,
    userState: {
      cookedHistory: [],
      username: '美食探索者',
      createDate: new Date().toISOString().split('T')[0]
    }
  };
  saveDatabase(cleanDb);
  res.json({ success: true, data: cleanDb });
});

// Catch-all route to serve React index.html in production
if (fs.existsSync(DIST_DIR)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🍳 Cookoo AI & Database Server running on port ${PORT}`);
});
