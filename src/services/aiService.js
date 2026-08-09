// AI Service: Supports direct browser client calls (Vercel / Cloudflare / Mobile)
// and synchronizes with local server if available.

const CONFIG_STORAGE_KEY = 'cookoo_ai_config';

export function getAiConfig() {
  try {
    const local = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (local) {
      return JSON.parse(local);
    }
  } catch (e) {}

  return {
    apiKey: '',
    apiBase: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat'
  };
}

export function saveAiConfig(config) {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {}

  // Also notify local server if available
  if (window.location.hostname === 'localhost') {
    fetch('http://localhost:3001/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    }).catch(() => {});
  }
}

// 1. Generate Recipes from Ingredients (家里有什么 - AI 实时全网搭配)
export async function generateRecipesWithAi(ingredients) {
  const cfg = getAiConfig();
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

  // If live API key is configured, call LLM directly from browser (CORS enabled for DeepSeek/OpenAI/Moonshot)
  if (cfg.apiKey && cfg.apiKey.trim()) {
    try {
      const endpoint = `${cfg.apiBase.replace(/\/+$/, '')}/chat/completions`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cfg.apiKey.trim()}`
        },
        body: JSON.stringify({
          model: cfg.model || 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `请用这些食材：${ingText}，生成2~3道适合电磁炉的快手美味家常菜。请务必输出合法的 JSON 格式。` }
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
          const list = parsed.recipes || (Array.isArray(parsed) ? parsed : [parsed]);
          return { success: true, source: 'ai_live', recipes: list };
        }
      } else {
        const errText = await response.text();
        console.warn('AI API Error:', errText);
      }
    } catch (err) {
      console.error('Direct AI Call failed, using smart engine:', err);
    }
  }

  // Smart Algorithmic Kitchen Fallback (Zero error guaranteed)
  const dynamicRecipes = [
    {
      title: `鲜香${ingredients.slice(0, 2).join('炒')}盖浇饭`,
      subtitle: `根据你选中的【${ingText}】实时规划的 10 分钟平底锅快炒神仙下饭菜！`,
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

  return { success: true, source: 'smart_engine', recipes: dynamicRecipes };
}

// 2. AI Parse Text (帮我整理菜谱)
export async function parseRecipeWithAi(text, targetMealType = 'lunch') {
  const cfg = getAiConfig();

  const systemPrompt = `你是一位专业菜谱整理助手。请将用户的文本结构化为标准菜谱，必须输出严格的 JSON 格式：
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

  if (cfg.apiKey && cfg.apiKey.trim()) {
    try {
      const endpoint = `${cfg.apiBase.replace(/\/+$/, '')}/chat/completions`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cfg.apiKey.trim()}`
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
          return { success: true, source: 'ai_live', recipe: parsed };
        }
      }
    } catch (err) {
      console.error('AI Parse direct call error:', err);
    }
  }

  // Fallback
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

  return { success: true, source: 'smart_engine', recipe: fallbackRecipe };
}
