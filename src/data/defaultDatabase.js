export const DEFAULT_DATABASE = {
  userState: {
    cookedHistory: [],
    username: '美食探索者',
    createDate: '2026-08-09'
  },
  recipes: [
    // =========================================================================
    // 🌅 1. 早餐专区 (Breakfast · 共 8 道 · 3~7分钟速做 · 清爽唤醒)
    // =========================================================================
    {
      id: 'b1',
      title: '芝士厚蛋烧培根吐司',
      subtitle: '流心鸡蛋芝士拉丝，外脆里嫩，电磁炉平底锅5分钟搞定！',
      coverImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      cookTime: '5 分钟',
      minutes: 5,
      calories: '310 kcal',
      caloriesValue: 310,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '⚡ 5分钟极速', '吐司主食', '平底锅快炒', '电磁炉友好'],
      potType: '平底不沾锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '平底锅800W低功率融化黄油，倒入蛋液推至微凝固放上吐司和芝士片对折，两面煎金黄出锅。',
      substitutionTips: '💡 培根可用火腿片或午餐肉代替；没有芝士片可单做葱花滑蛋吐司。',
      likes: 54,
      isLiked: false,
      isFavorite: false,
      author: '元气早餐坊',
      publishDate: '2026-08-08 · 07:30',
      ingredients: [
        { name: '吐司面包', amount: 2, unit: '片', baseAmount: 2, icon: '🍞', type: 'pantry' },
        { name: '鸡蛋', amount: 2, unit: '个', baseAmount: 2, icon: '🥚', type: 'egg' },
        { name: '培根/火腿片', amount: 2, unit: '片', baseAmount: 2, icon: '🥓', type: 'meat' },
        { name: '芝士片', amount: 1, unit: '片', baseAmount: 1, icon: '🧀', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '打散蛋液煎培根', description: '鸡蛋加少许盐打散；平底锅1000W热油将培根煎熟盛出。', duration: 2, powerLevel: '1000W' },
        { stepNumber: 2, title: '倒蛋液放吐司', description: '锅内融化黄油倒入蛋液，立刻放上两片吐司粘上蛋液后翻面。', duration: 2, powerLevel: '800W' },
        { stepNumber: 3, title: '夹芝士对折出锅', description: '铺上培根和芝士片，将边缘蛋皮往内折并对折吐司，煎至两面焦黄出锅！', duration: 1, powerLevel: '1000W' }
      ]
    },
    {
      id: 'b2',
      title: '清香奶香燕麦蛋花羹',
      subtitle: '暖胃清甜、膳食纤维满满，小奶锅5分钟一锅端，早起喝一碗浑身暖洋洋！',
      coverImage: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
      cookTime: '5 分钟',
      minutes: 5,
      calories: '210 kcal',
      caloriesValue: 210,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '⚡ 5分钟极速', '温暖汤粥', '电磁炉友好'],
      potType: '小奶锅/小平底锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '电磁炉1400W烧开少量水加燕麦煮浓，倒入纯牛奶转800W微沸，淋入蛋液划出漂亮蛋花。',
      substitutionTips: '💡 可加入几颗枸杞、香蕉片或蓝莓增添天然甜味。',
      likes: 38,
      isLiked: false,
      isFavorite: false,
      author: '暖胃研究所',
      publishDate: '2026-08-07 · 07:15',
      ingredients: [
        { name: '即食快熟燕麦片', amount: 40, unit: '克', baseAmount: 40, icon: '🥣', type: 'pantry' },
        { name: '纯牛奶', amount: 200, unit: 'ml', baseAmount: 200, icon: '🥛', type: 'pantry' },
        { name: '鸡蛋', amount: 1, unit: '个', baseAmount: 1, icon: '🥚', type: 'egg' }
      ],
      steps: [
        { stepNumber: 1, title: '煮软燕麦', description: '小奶锅加半碗清水1400W烧开，倒入燕麦片煮1.5分钟至浓稠。', duration: 2, powerLevel: '1400W' },
        { stepNumber: 2, title: '倒牛奶划蛋花', description: '倒入纯牛奶转800W小火，淋入打散的鸡蛋液轻轻搅动出丝滑蛋花。', duration: 2, powerLevel: '800W' },
        { stepNumber: 3, title: '淋蜂蜜出锅', description: '关火盛入碗中，淋上一小勺蜂蜜即可享用！', duration: 1, powerLevel: '关火' }
      ]
    },
    {
      id: 'b3',
      title: '鲜虾紫菜云吞暖汤',
      subtitle: '紫菜虾皮鲜美清爽，速冻云吞直接下锅6分钟速熟，早起神清气爽！',
      coverImage: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
      cookTime: '6 分钟',
      minutes: 6,
      calories: '280 kcal',
      caloriesValue: 280,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '⚡ 5分钟极速', '温暖汤粥', '电磁炉友好'],
      potType: '小奶锅/小汤锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '碗底先调好生抽紫菜底汤，小锅开2000W大火烧水下云吞煮3分钟浮起，连汤带水冲入碗中！',
      substitutionTips: '💡 速冻小馄饨、速冻水饺均可；没有虾皮可撒几滴香油和白胡椒粉。',
      likes: 47,
      isLiked: false,
      isFavorite: false,
      author: '街角馄饨摊',
      publishDate: '2026-08-06 · 07:45',
      ingredients: [
        { name: '速冻小馄饨/水饺', amount: 10, unit: '个', baseAmount: 10, icon: '🥟', type: 'pantry' },
        { name: '无沙免洗紫菜', amount: 5, unit: '克', baseAmount: 5, icon: '🌿', type: 'pantry' },
        { name: '生抽+香油+白胡椒', amount: 10, unit: 'ml', baseAmount: 10, icon: '🍾', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '调鲜美汤底', description: '汤碗里放入紫菜、虾皮、葱花、1勺生抽、半勺香油和一撮白胡椒粉。', duration: 1, powerLevel: '备料' },
        { stepNumber: 2, title: '大火煮馄饨', description: '锅内加水2000W大火烧沸，下入小馄饨煮3分钟至皮薄透亮全部浮起。', duration: 4, powerLevel: '2000W' },
        { stepNumber: 3, title: '冲入汤碗', description: '先舀两勺滚烫面汤冲开碗底紫菜料汁，再捞入馄饨即成！', duration: 1, powerLevel: '关火' }
      ]
    },
    {
      id: 'b4',
      title: '经典阳春面配溏心荷包蛋',
      subtitle: '清澈透亮的酱油葱油清汤底，细挂面爽滑顺口，配一颗溏心蛋，老传统早味！',
      coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      cookTime: '7 分钟',
      minutes: 7,
      calories: '310 kcal',
      caloriesValue: 310,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '温暖汤粥', '平底锅快炒', '电磁炉友好'],
      potType: '平底锅/小汤锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '先用平底锅煎荷包蛋，再大火下挂面煮4分钟，面汤冲入生抽猪油底碗中，滑爽不油腻。',
      substitutionTips: '💡 猪油是灵魂，没有猪油可用几滴香油替代；可烫两颗小青菜点缀。',
      likes: 41,
      isLiked: false,
      isFavorite: false,
      author: '苏式早面馆',
      publishDate: '2026-08-05 · 07:20',
      ingredients: [
        { name: '细挂面/银丝面', amount: 80, unit: '克', baseAmount: 80, icon: '🍜', type: 'pantry' },
        { name: '鸡蛋', amount: 1, unit: '个', baseAmount: 1, icon: '🥚', type: 'egg' },
        { name: '生抽+猪油/香油', amount: 15, unit: 'ml', baseAmount: 15, icon: '🍾', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '煎溏心荷包蛋', description: '平底锅少油1000W煎荷包蛋至蛋白凝固蛋黄微溏心盛出。', duration: 3, powerLevel: '1000W' },
        { stepNumber: 2, title: '调面汤底', description: '大碗放葱花、1勺生抽、半勺猪油或香油、一小撮白胡椒。', duration: 1, powerLevel: '备料' },
        { stepNumber: 3, title: '煮面冲汤', description: '大火1800W水开下挂面煮3分钟，舀面汤冲入碗中化开猪油，捞入面条盖上荷包蛋！', duration: 3, powerLevel: '1800W' }
      ]
    },
    {
      id: 'b5',
      title: '火腿葱花手抓饼卷蛋',
      subtitle: '免解冻直接下平底锅，自带油无需加油，3分钟焦脆掉渣，上班族极速早点！',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      cookTime: '4 分钟',
      minutes: 4,
      calories: '330 kcal',
      caloriesValue: 330,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '⚡ 5分钟极速', '吐司主食', '平底锅快炒', '电磁炉友好'],
      potType: '平底不沾锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '手抓饼无需解冻，电磁炉平底锅开1000W小火慢煎至两面金黄起酥，打入鸡蛋推散贴合。',
      substitutionTips: '💡 里面可刷甜面酱、番茄酱或老干妈，夹生菜叶和火腿肠。',
      likes: 58,
      isLiked: false,
      isFavorite: false,
      author: '路边摊手抓饼',
      publishDate: '2026-08-04 · 07:10',
      ingredients: [
        { name: '冷冻原味手抓饼', amount: 1, unit: '张', baseAmount: 1, icon: '🫓', type: 'pantry' },
        { name: '鸡蛋', amount: 1, unit: '个', baseAmount: 1, icon: '🥚', type: 'egg' },
        { name: '王中王火腿肠', amount: 1, unit: '根', baseAmount: 1, icon: '🌭', type: 'meat' }
      ],
      steps: [
        { stepNumber: 1, title: '干烙手抓饼', description: '平底锅不放油，手抓饼直接入锅1000W煎1.5分钟至半透明微起酥翻面。', duration: 2, powerLevel: '1000W' },
        { stepNumber: 2, title: '打蛋贴合', description: '在饼上打入一个鸡蛋用锅铲划散，翻面让蛋液与锅底接触煎熟。', duration: 1.5, powerLevel: '1000W' },
        { stepNumber: 3, title: '煎火腿刷酱卷起', description: '锅边煎热火腿肠，饼面刷上甜面酱，卷入火腿肠即可出锅！', duration: 0.5, powerLevel: '关火' }
      ]
    },
    {
      id: 'b6',
      title: '葱香酱油水煎流心荷包蛋',
      subtitle: '焦边香脆、蛋黄溏心爆浆，淋上酱油香油，配白粥吐司绝配！',
      coverImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      cookTime: '3 分钟',
      minutes: 3,
      calories: '160 kcal',
      caloriesValue: 160,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '⚡ 5分钟极速', '平底锅快炒', '电磁炉友好'],
      potType: '平底不粘锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '平底锅1200W热油下鸡蛋煎至底焦黄，转800W淋入1勺生抽和小葱花盖盖焖20秒。',
      substitutionTips: '💡 喜欢全熟可翻面再煎30秒。',
      likes: 36,
      isLiked: false,
      isFavorite: false,
      author: '蛋料理专家',
      publishDate: '2026-08-03 · 07:00',
      ingredients: [
        { name: '鸡蛋', amount: 2, unit: '个', baseAmount: 2, icon: '🥚', type: 'egg' },
        { name: '小葱碎', amount: 5, unit: '克', baseAmount: 5, icon: '🧅', type: 'veg' },
        { name: '生抽+香油', amount: 10, unit: 'ml', baseAmount: 10, icon: '🍾', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '热油下蛋', description: '平底锅下1勺油1200W烧热，打入鸡蛋煎至蛋白凝固边边微焦。', duration: 1.5, powerLevel: '1200W' },
        { stepNumber: 2, title: '烹酱油焖香', description: '调至800W，沿锅边淋入1勺生抽和葱花，盖盖焖20秒出锅！', duration: 1.5, powerLevel: '800W' }
      ]
    },
    {
      id: 'b7',
      title: '番茄鸡蛋热汤挂面',
      subtitle: '浓郁番茄红汤挂满爽滑面条，酸甜开胃暖呼呼，晨间经典快手汤面！',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      cookTime: '8 分钟',
      minutes: 8,
      calories: '340 kcal',
      caloriesValue: 340,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '温暖汤粥', '平底锅快炒', '电磁炉友好'],
      potType: '小汤锅/平底锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '番茄1400W炒出红沙，倒水烧开下挂面和荷包蛋煮3分钟即可。',
      substitutionTips: '💡 可放火腿肠片或一把小白菜叶。',
      likes: 49,
      isLiked: false,
      isFavorite: false,
      author: '暖胃早餐铺',
      publishDate: '2026-08-02 · 07:15',
      ingredients: [
        { name: '熟透番茄', amount: 1, unit: '个', baseAmount: 1, icon: '🍅', type: 'veg' },
        { name: '挂面', amount: 80, unit: '克', baseAmount: 80, icon: '🍜', type: 'pantry' },
        { name: '鸡蛋', amount: 1, unit: '个', baseAmount: 1, icon: '🥚', type: 'egg' }
      ],
      steps: [
        { stepNumber: 1, title: '炒番茄浓汤', description: '番茄切小丁1400W少油炒出沙，加2碗开水大火烧沸。', duration: 3, powerLevel: '1400W' },
        { stepNumber: 2, title: '下面与荷包蛋', description: '打入鸡蛋，下入挂面1600W煮3.5分钟，加生抽盐调味出锅！', duration: 4, powerLevel: '1600W' }
      ]
    },
    {
      id: 'b8',
      title: '嫩煎火腿玉米蛋饼',
      subtitle: '清甜玉米粒包裹在金黄蛋饼里，奶香焦香兼备，一口一个停不下来！',
      coverImage: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
      cookTime: '5 分钟',
      minutes: 5,
      calories: '230 kcal',
      caloriesValue: 230,
      difficulty: '简单',
      mealTypes: ['breakfast'],
      tags: ['早餐', '⚡ 5分钟极速', '吐司主食', '平底锅快炒', '电磁炉友好'],
      potType: '平底不粘锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '鸡蛋与熟玉米粒、火腿丁搅匀，平底锅1000W两面煎金黄切块。',
      substitutionTips: '💡 熟玉米粒可用罐头甜玉米或冷冻玉米粒。',
      likes: 29,
      isLiked: false,
      isFavorite: false,
      author: '元气厨房',
      publishDate: '2026-08-01 · 07:20',
      ingredients: [
        { name: '鸡蛋', amount: 2, unit: '个', baseAmount: 2, icon: '🥚', type: 'egg' },
        { name: '甜玉米粒', amount: 50, unit: '克', baseAmount: 50, icon: '🌽', type: 'veg' },
        { name: '火腿丁', amount: 30, unit: '克', baseAmount: 30, icon: '🌭', type: 'meat' }
      ],
      steps: [
        { stepNumber: 1, title: '搅匀蛋液食材', description: '鸡蛋加玉米粒、火腿丁、一小撮盐和白胡椒搅匀。', duration: 2, powerLevel: '备料' },
        { stepNumber: 2, title: '慢火煎成饼', description: '平底锅热油倒入蛋液，1000W煎2分钟翻面再煎1分钟出锅切块！', duration: 3, powerLevel: '1000W' }
      ]
    },

    // =========================================================================
    // ☀️ 2. 午餐专区 (Lunch · 共 7 道 · 15~20分钟 · 饱腹主食一锅出/下饭快手)
    // =========================================================================
    {
      id: 'l1',
      title: '豆角土豆腊肠懒人焖饭',
      subtitle: '咸香入味，米饭吸饱肉汁锅巴焦香，电饭煲/电磁炉一键搞定主食与菜！',
      coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      cookTime: '20 分钟',
      minutes: 20,
      calories: '480 kcal',
      caloriesValue: 480,
      difficulty: '简单',
      mealTypes: ['lunch'],
      tags: ['午餐', '电饭煲一锅出', '电磁炉友好', '一锅端', '懒人主食'],
      potType: '电饭煲内胆/深平底锅',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '平底锅做法：铺上面条或米饭后沿锅边少量多次淋汤，开1000W中低火盖盖焖，防糊锅。',
      riceCookerTips: '🍚 电饭煲懒人焖饭做法: 淘好大米加平时略少的水，铺上切丁的豆角、土豆和腊肠片，倒入生抽老抽蚝油汁，按【标准煮饭键】，煮好翻拌均匀即可！',
      substitutionTips: '💡 腊肠可替换为五花肉丁、火腿肠或去骨鸡腿肉丁。',
      likes: 52,
      isLiked: false,
      isFavorite: false,
      author: '面饭研究所',
      publishDate: '2026-08-03 · 12:15',
      ingredients: [
        { name: '大米', amount: 150, unit: '克', baseAmount: 150, icon: '🍚', type: 'pantry' },
        { name: '四季豆/豆角', amount: 150, unit: '克', baseAmount: 150, icon: '🌱', type: 'veg' },
        { name: '土豆', amount: 1, unit: '个', baseAmount: 1, icon: '🥔', type: 'veg' },
        { name: '广式腊肠/火腿', amount: 2, unit: '根', baseAmount: 2, icon: '🌭', type: 'meat' },
        { name: '生抽+老抽+蚝油', amount: 25, unit: 'ml', baseAmount: 25, icon: '🍾', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '炒香配菜', description: '锅中热油1400W下葱蒜、豆角段、土豆条和腊肠片炒香。', duration: 3, powerLevel: '1400W' },
        { stepNumber: 2, title: '加水调味', description: '加生抽老抽蚝油，倒入开水烧开。', duration: 2, powerLevel: '1600W' },
        { stepNumber: 3, title: '铺饭焖透', description: '倒入淘好的大米调至1000W中火焖15分钟。', duration: 15, powerLevel: '1000W' },
        { stepNumber: 4, title: '拌匀出锅', description: '翻拌均匀出焦香锅巴！', duration: 2, powerLevel: '关火' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '淘米加水', description: '大米淘洗好放入内胆，加比平时略少的水。', duration: 2, powerLevel: '备料' },
        { stepNumber: 2, title: '铺食材淋酱汁', description: '平铺豆角丁、土豆丁和腊肠斜片，淋入生抽老抽蚝油汁。', duration: 3, powerLevel: '备料' },
        { stepNumber: 3, title: '按【煮饭键】', description: '按下【标准煮饭键】开始焖煮（约25分钟）。', duration: 25, powerLevel: '电饭煲【标准煮饭键】' },
        { stepNumber: 4, title: '翻拌出焦香', description: '跳保温后开盖从下往上充分翻拌均匀享用！', duration: 2, powerLevel: '保温' }
      ]
    },
    {
      id: 'l2',
      title: '照烧无水洋葱鸡腿排盖饭',
      subtitle: '鲜嫩多汁去骨鸡腿肉，电饭煲/电磁炉一键焗出焦香，浓油赤酱午间便当神菜！',
      coverImage: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
      cookTime: '15 分钟',
      minutes: 15,
      calories: '460 kcal',
      caloriesValue: 460,
      difficulty: '简单',
      mealTypes: ['lunch'],
      tags: ['午餐', '电饭煲一锅出', '电磁炉友好', '平底锅快炒', '一锅端', '懒人主食'],
      potType: '平底锅/电饭煲内胆',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '鸡皮朝下小火800W煎出自带鸡油，转1200W焖熟照烧汁，不加一滴油也能焦香酥脆！',
      riceCookerTips: '🍚 电饭煲封神懒人法: 洋葱丝铺满电饭煲底防粘，鸡腿皮朝下放上去，淋入调好的照烧汁，按【标准煮饭键】！自动焗出焦香金黄鸡腿排！',
      substitutionTips: '💡 鸡腿排可用鸡胸肉排代替；照烧汁用生抽2勺+老抽半勺+蚝油1勺+蜂蜜1勺+水4勺调配。',
      likes: 42,
      isLiked: false,
      isFavorite: false,
      author: '日料一人食',
      publishDate: '2026-08-04 · 20:00',
      ingredients: [
        { name: '去骨鸡全腿', amount: 2, unit: '个', baseAmount: 2, icon: '🍗', type: 'meat' },
        { name: '洋葱', amount: 0.5, unit: '个', baseAmount: 0.5, icon: '🧅', type: 'veg' },
        { name: '生抽+老抽+蜂蜜', amount: 25, unit: 'ml', baseAmount: 25, icon: '🍾', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '鸡腿划刀调汁', description: '鸡腿背面划刀；生抽、老抽、蜂蜜、蚝油加4勺水调汁。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '煎鸡皮出油', description: '平底锅不放油，鸡皮朝下800W慢煎4分钟逼出油脂。', duration: 4, powerLevel: '800W' },
        { stepNumber: 3, title: '加洋葱煎香', description: '翻面煎另一面，锅边放入洋葱丝一起煎软出香。', duration: 3, powerLevel: '1000W' },
        { stepNumber: 4, title: '淋汁大火收浓', description: '倒入照烧汁1200W焖4分钟，开1400W收汁切块盖饭！', duration: 5, powerLevel: '1400W' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '洋葱铺底', description: '洋葱切粗丝厚厚铺在电饭煲底垫底防粘。', duration: 2, powerLevel: '备料' },
        { stepNumber: 2, title: '摆鸡腿淋汁', description: '鸡腿皮朝下码在洋葱上，均匀淋入调好的照烧汁。', duration: 2, powerLevel: '备料' },
        { stepNumber: 3, title: '按【煮饭键】', description: '盖盖按下【标准煮饭键】（约20分钟），蒸汽密闭焗熟。', duration: 20, powerLevel: '电饭煲【标准煮饭键】' },
        { stepNumber: 4, title: '切块淋浓汁', description: '跳保温后开盖切条，连汁浇在热米饭上！', duration: 2, powerLevel: '保温' }
      ]
    },
    {
      id: 'l3',
      title: '浓香咖喱土豆鸡块一锅煲',
      subtitle: '去骨鸡腿肉嫩滑爆汁，土豆沙糯，金黄咖喱酱汁拌饭一口沦陷！',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      cookTime: '18 分钟',
      minutes: 18,
      calories: '490 kcal',
      caloriesValue: 490,
      difficulty: '简单',
      mealTypes: ['lunch'],
      tags: ['午餐', '电饭煲一锅出', '电磁炉友好', '一锅端', '懒人主食'],
      potType: '深型汤锅/电饭煲',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '先开1200W煎香鸡块表皮，加开水和咖喱块后转800W小火慢炖10分钟至浓稠。',
      riceCookerTips: '🍚 电饭煲极简版: 鸡腿肉丁、土豆块、胡萝卜丁、洋葱和咖喱块全放内胆加水没过食材，按【煮饭键】20分钟即成！',
      substitutionTips: '💡 咖喱块选百梦多或好侍中辣最香浓；不爱胡萝卜可换成洋葱或青豆。',
      likes: 31,
      isLiked: false,
      isFavorite: false,
      author: '日日便当',
      publishDate: '2026-08-05 · 12:40',
      ingredients: [
        { name: '去骨鸡腿肉丁', amount: 250, unit: '克', baseAmount: 250, icon: '🍗', type: 'meat' },
        { name: '黄心土豆', amount: 1, unit: '个', baseAmount: 1, icon: '🥔', type: 'veg' },
        { name: '咖喱块', amount: 2, unit: '小块', baseAmount: 2, icon: '🧈', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '煎香鸡块', description: '平底汤锅少量油1200W将鸡块煎至两面变白微焦。', duration: 4, powerLevel: '1200W' },
        { stepNumber: 2, title: '下土豆翻炒', description: '倒入土豆块翻炒2分钟加水没过食材烧开。', duration: 4, powerLevel: '1600W' },
        { stepNumber: 3, title: '慢炖浓稠', description: '放入咖喱块化开，开800W慢炖10分钟至浓稠出锅。', duration: 10, powerLevel: '800W' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '全入内胆', description: '鸡丁、土豆、洋葱和咖喱块入内胆加水没过食材。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '按【煮饭键】', description: '按【煮饭键】焖20分钟跳保温翻拌均匀即可。', duration: 20, powerLevel: '电饭煲【煮饭键】' }
      ]
    },
    {
      id: 'l4',
      title: '黑椒洋葱滑炒牛肉丝',
      subtitle: '牛肉丝滑嫩多汁不柴，洋葱清甜脆口，平底锅5分钟大火快手下饭菜！',
      coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      cookTime: '12 分钟',
      minutes: 12,
      calories: '340 kcal',
      caloriesValue: 340,
      difficulty: '简单',
      mealTypes: ['lunch'],
      tags: ['午餐', '平底锅快炒', '电磁炉友好'],
      potType: '平底不粘锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '牛肉断生速度快，电磁炉平底锅开1600W热油滑炒2分钟即可盛出，切忌长时间干煸。',
      substitutionTips: '💡 牛肉丝可用猪里脊肉丝或鸡胸肉丝替换；洋葱可搭配青椒丝增加口感。',
      likes: 34,
      isLiked: false,
      isFavorite: false,
      author: 'Cookoo 厨神',
      publishDate: '2026-08-05 · 19:10',
      ingredients: [
        { name: '牛里脊/嫩牛肉', amount: 200, unit: '克', baseAmount: 200, icon: '🥩', type: 'meat' },
        { name: '紫洋葱', amount: 1, unit: '个', baseAmount: 1, icon: '🧅', type: 'veg' },
        { name: '青椒', amount: 1, unit: '个', baseAmount: 1, icon: '🫑', type: 'veg' },
        { name: '黑胡椒碎+生抽', amount: 15, unit: 'ml', baseAmount: 15, icon: '🧂', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '牛肉抓匀滑嫩浆', description: '牛肉切丝，加生抽、老抽、黑胡椒、淀粉和1勺油抓匀。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '滑炒肉丝', description: '平底锅1600W热油下肉丝迅速滑散炒至八成熟盛出。', duration: 2, powerLevel: '1600W' },
        { stepNumber: 3, title: '炒香洋葱青椒', description: '底油倒入洋葱丝和青椒丝1400W翻炒至出香味变软。', duration: 2, powerLevel: '1400W' },
        { stepNumber: 4, title: '混合出锅', description: '倒回牛肉丝，淋蚝油黑胡椒碎大火翻炒15秒混合出锅！', duration: 1, powerLevel: '1800W' }
      ]
    },
    {
      id: 'l5',
      title: '番茄滑蛋盖浇饭',
      subtitle: '滑嫩流心鸡蛋裹满酸甜浓稠番茄汁，10分钟学生党/租房党午间神速盖饭！',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      cookTime: '10 分钟',
      minutes: 10,
      calories: '320 kcal',
      caloriesValue: 320,
      difficulty: '简单',
      mealTypes: ['lunch'],
      tags: ['午餐', '平底锅快炒', '懒人主食', '电磁炉友好'],
      potType: '平底不沾锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '鸡蛋加2勺温水打散更嫩！电磁炉开1400W热油下蛋液，由外向内推至半凝固盛出。',
      substitutionTips: '💡 喜欢肉食可加入虾仁或煎培根碎一同盖饭。',
      likes: 22,
      isLiked: false,
      isFavorite: false,
      author: 'Cookoo',
      publishDate: '2026-08-01 · 12:30',
      ingredients: [
        { name: '鸡蛋', amount: 3, unit: '个', baseAmount: 3, icon: '🥚', type: 'egg' },
        { name: '大番茄', amount: 2, unit: '个', baseAmount: 2, icon: '🍅', type: 'veg' },
        { name: '生抽+番茄酱', amount: 15, unit: 'ml', baseAmount: 15, icon: '🍾', type: 'pantry' },
        { name: '熟米饭', amount: 1, unit: '碗', baseAmount: 1, icon: '🍚', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '滑炒流心蛋', description: '鸡蛋加少许盐打匀，1400W热油快速推炒至八分熟盛出。', duration: 2, powerLevel: '1400W' },
        { stepNumber: 2, title: '炒酸甜番茄汁', description: '番茄切块下锅1200W炒碎出汁，加番茄酱、白糖、生抽煮浓。', duration: 4, powerLevel: '1200W' },
        { stepNumber: 3, title: '混合浇米饭', description: '倒入滑蛋翻炒两下关火，浇在热米饭上撒葱花开炫！', duration: 2, powerLevel: '关火' }
      ]
    },
    {
      id: 'l6',
      title: '蒜苔香辣肉丝',
      subtitle: '鲜嫩猪肉丝裹满酱汁，搭配爽脆蒜苔与干辣椒，极度下饭！',
      coverImage: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      cookTime: '12 分钟',
      minutes: 12,
      calories: '350 kcal',
      caloriesValue: 350,
      difficulty: '简单',
      mealTypes: ['lunch'],
      tags: ['午餐', '平底锅快炒', '电磁炉友好'],
      potType: '平底不沾锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '肉丝加淀粉锁水，1600W大火滑熟肉丝先盛出，再炒蒜苔，最后合炒不老不柴。',
      substitutionTips: '💡 蒜苔可替换为青椒丝、芹菜段或韭黄。',
      likes: 27,
      isLiked: false,
      isFavorite: false,
      author: '下饭小馆',
      publishDate: '2026-08-02 · 18:30',
      ingredients: [
        { name: '猪里脊肉', amount: 200, unit: '克', baseAmount: 200, icon: '🥩', type: 'meat' },
        { name: '嫩蒜苔', amount: 150, unit: '克', baseAmount: 150, icon: '🌱', type: 'veg' },
        { name: '干辣椒段', amount: 5, unit: '个', baseAmount: 5, icon: '🌶️', type: 'veg' }
      ],
      steps: [
        { stepNumber: 1, title: '肉丝上浆', description: '里脊肉切细丝加生抽、料酒、淀粉和1勺油抓匀。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '滑炒肉丝', description: '平底锅1600W热油快速划散肉丝至变色盛出。', duration: 2, powerLevel: '1600W' },
        { stepNumber: 3, title: '炒蒜苔合炒', description: '底油炒香干辣椒蒜苔，倒回肉丝加生抽老抽大火翻炒30秒出锅！', duration: 4, powerLevel: '1800W' }
      ]
    },
    {
      id: 'l7',
      title: '香菇滑鸡电饭煲焖饭',
      subtitle: '滑嫩鲜香的香菇鸡肉，电饭煲一键同焖，米粒油润喷香！',
      coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      cookTime: '20 分钟',
      minutes: 20,
      calories: '470 kcal',
      caloriesValue: 470,
      difficulty: '简单',
      mealTypes: ['lunch'],
      tags: ['午餐', '电饭煲一锅出', '一锅端', '懒人主食'],
      potType: '电饭煲内胆',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '鸡肉用生抽蚝油生姜腌制，大米加水后铺上鸡块香菇，电饭煲按煮饭键即可。',
      riceCookerTips: '🍚 鲜香滑鸡焖饭: 鸡腿肉丁加生抽、蚝油、淀粉腌制，内胆淘米加水，平铺香菇丁和鸡肉，按【煮饭键】出锅翻匀撒葱花！',
      substitutionTips: '💡 鸡腿肉比鸡胸肉更滑嫩。',
      likes: 40,
      isLiked: false,
      isFavorite: false,
      author: '煲仔世家',
      publishDate: '2026-08-01 · 12:00',
      ingredients: [
        { name: '去骨鸡腿肉', amount: 200, unit: '克', baseAmount: 200, icon: '🍗', type: 'meat' },
        { name: '鲜香菇', amount: 4, unit: '朵', baseAmount: 4, icon: '🍄', type: 'veg' },
        { name: '大米', amount: 150, unit: '克', baseAmount: 150, icon: '🍚', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '腌制鸡肉', description: '鸡肉切丁加生抽、老抽、蚝油、姜丝和淀粉抓匀腌制5分钟。', duration: 5, powerLevel: '备料' },
        { stepNumber: 2, title: '电饭煲同焖', description: '内胆淘米加水平铺香菇和鸡肉，按下【煮饭键】煮20分钟翻匀享用！', duration: 20, powerLevel: '电饭煲【煮饭键】' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '内胆码料', description: '大米淘洗加水，铺上腌制好的鸡丁与香菇片。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '按【煮饭键】', description: '盖盖按下【标准煮饭键】焖熟，出锅撒葱花拌匀即成！', duration: 20, powerLevel: '电饭煲【煮饭键】' }
      ]
    },

    // =========================================================================
    // 🌙 3. 晚餐专区 (Dinner · 共 6 道 · 15~25分钟 · 治愈暖锅大煲 · 卸下疲惫)
    // =========================================================================
    {
      id: 'd1',
      title: '肥牛金针菇响铃卷酸汤煲',
      subtitle: '浓郁酸汤吸满响铃卷与肥牛，免高压锅、电磁炉/电饭煲一锅端治愈晚餐大煲！',
      coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      cookTime: '15 分钟',
      minutes: 15,
      calories: '420 kcal',
      caloriesValue: 420,
      difficulty: '简单',
      mealTypes: ['dinner'],
      tags: ['晚餐', '电饭煲一锅出', '电磁炉友好', '一锅端', '酸辣'],
      potType: '深型汤锅/平底锅/电饭煲内胆',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '先开1200W爆香蒜末和酸汤酱，加水煮沸后调至1600W下肥牛和响铃卷，沸腾焖煮4分钟熟透即可。',
      riceCookerTips: '🍚 电饭煲极简做法: 内胆刷薄油，金针菇和响铃卷铺底，码上肥牛，淋入调好的酸汤酱汁加半碗水，按下【煮饭/快煮键】煮10-12分钟跳保温即可开盖！',
      substitutionTips: '💡 没有响铃卷可用油豆腐或普通腐竹代替；没有酸汤酱可用番茄块加白醋替代。',
      likes: 28,
      isLiked: false,
      isFavorite: false,
      author: 'Cookoo 懒人厨房',
      publishDate: '2026-08-07 · 19:30',
      ingredients: [
        { name: '肥牛卷', amount: 200, unit: '克', baseAmount: 200, icon: '🥩', type: 'meat' },
        { name: '金针菇', amount: 150, unit: '克', baseAmount: 150, icon: '🍄', type: 'veg' },
        { name: '响铃卷/豆皮', amount: 6, unit: '个', baseAmount: 6, icon: '🍢', type: 'pantry' },
        { name: '酸汤酱/黄灯笼辣酱', amount: 25, unit: '克', baseAmount: 25, icon: '🥫', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '铺底备菜', description: '金针菇切老根洗净铺在锅底，上面码上响铃卷。', duration: 2, powerLevel: '备料' },
        { stepNumber: 2, title: '炒香金汤底', description: '开1200W少油炒香蒜末和酸汤酱，倒入2碗开水烧开。', duration: 3, powerLevel: '1200W 中火' },
        { stepNumber: 3, title: '下肥牛焖煮', description: '将酸汤淋入锅中铺上肥牛卷，1600W焖煮4分钟至肥牛变色。', duration: 4, powerLevel: '1600W 大火' },
        { stepNumber: 4, title: '撒椒圈出锅', description: '撒上青红椒圈增香提色，连锅端上桌开吃！', duration: 1, powerLevel: '保温' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '内胆码菜', description: '电饭煲铺金针菇、响铃卷和肥牛卷。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '淋酸汤汁', description: '酸汤酱、蒜末加小半碗温水调匀浇在表面。', duration: 2, powerLevel: '备料' },
        { stepNumber: 3, title: '按【快煮键】', description: '按下【煮饭/快煮键】煮10-12分钟跳保温。', duration: 10, powerLevel: '电饭煲【快煮键】' }
      ]
    },
    {
      id: 'd2',
      title: '寿喜烧肥牛无水豆腐锅',
      subtitle: '甜香醇厚、日式一人食暖心小火锅，电饭煲/电磁炉加酱汁一键焖炖！',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      cookTime: '15 分钟',
      minutes: 15,
      calories: '430 kcal',
      caloriesValue: 430,
      difficulty: '简单',
      mealTypes: ['dinner'],
      tags: ['晚餐', '电饭煲一锅出', '电磁炉友好', '一锅端', '日料'],
      potType: '深平底锅/浅汤锅/电饭煲内胆',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '洋葱娃娃菜自带大量清甜水分，电磁炉开1000W慢焖6分钟自然出浓汤，肥牛蘸无菌蛋液极鲜嫩！',
      riceCookerTips: '🍚 电饭煲做法: 蔬菜豆腐全码进内胆，淋入寿喜烧汁，按下【煮饭键】焖8分钟，开盖放入肥牛焖2分钟即可享用！',
      substitutionTips: '💡 蔬菜可随意添加香菇、魔芋结、茼蒿菜；寿喜烧汁=生抽2勺+米酒2勺+白糖1勺。',
      likes: 38,
      isLiked: false,
      isFavorite: false,
      author: '一人食研究所',
      publishDate: '2026-08-01 · 19:40',
      ingredients: [
        { name: '肥牛片', amount: 200, unit: '克', baseAmount: 200, icon: '🥩', type: 'meat' },
        { name: '嫩豆腐/老豆腐', amount: 1, unit: '块', baseAmount: 1, icon: '🧈', type: 'veg' },
        { name: '娃娃菜/大白菜', amount: 1, unit: '颗', baseAmount: 1, icon: '🥬', type: 'veg' },
        { name: '金针菇/香菇', amount: 100, unit: '克', baseAmount: 100, icon: '🍄', type: 'veg' }
      ],
      steps: [
        { stepNumber: 1, title: '蔬菜码锅底', description: '娃娃菜切段铺底，码上切块豆腐、金针菇和洋葱丝。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '淋汁慢焖', description: '淋入寿喜烧汁与2勺水，开1200W盖盖焖煮5分钟出汁。', duration: 5, powerLevel: '1200W' },
        { stepNumber: 3, title: '烫熟肥牛', description: '揭盖铺上肥牛卷，烫1-2分钟至变色即可直接开吃！', duration: 3, powerLevel: '1400W' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '全入内胆', description: '娃娃菜、豆腐、金针菇分格摆进电饭煲内胆。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '按【快煮键】', description: '淋入寿喜烧汁与3勺水，按下【快煮键】焖8分钟出甜汤。', duration: 8, powerLevel: '电饭煲【快煮键】' },
        { stepNumber: 3, title: '余温焖肥牛', description: '开盖铺肥牛，利用滚烫蒸汽焖2分钟即可享用！', duration: 2, powerLevel: '保温' }
      ]
    },
    {
      id: 'd3',
      title: '番茄土豆巴沙鱼浓汤煲',
      subtitle: '巴沙鱼柳无刺极嫩、5分钟即熟，酸甜浓郁开胃，晚餐减脂暖胃绝配！',
      coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
      cookTime: '18 分钟',
      minutes: 18,
      calories: '310 kcal',
      caloriesValue: 310,
      difficulty: '简单',
      mealTypes: ['dinner'],
      tags: ['晚餐', '电饭煲一锅出', '电磁炉友好', '减脂餐', '一锅端', '酸辣'],
      potType: '平底锅/汤锅/电饭煲',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '番茄炒出红沙是关键！开1400W炒碎番茄，加开水后转1600W煮土豆，最后下鱼片800W微沸滑熟即可。',
      riceCookerTips: '🍚 电饭煲浓汤法: 内胆中放入番茄丁、土豆片、生抽、番茄酱加开水，按【煲汤/煮饭键】煮15分钟至浓稠，最后开盖滑入鱼片焖3分钟出锅！',
      substitutionTips: '💡 巴沙鱼可换成龙利鱼柳、黑鱼片或鲜虾仁；土豆可换成嫩豆腐。',
      likes: 19,
      isLiked: false,
      isFavorite: false,
      author: '轻食小当家',
      publishDate: '2026-08-06 · 18:20',
      ingredients: [
        { name: '巴沙鱼柳/龙利鱼', amount: 250, unit: '克', baseAmount: 250, icon: '🐟', type: 'meat' },
        { name: '熟透大番茄', amount: 2, unit: '个', baseAmount: 2, icon: '🍅', type: 'veg' },
        { name: '土豆', amount: 1, unit: '个', baseAmount: 1, icon: '🥔', type: 'veg' }
      ],
      steps: [
        { stepNumber: 1, title: '鱼片上浆', description: '巴沙鱼斜切厚片，加料酒、盐、黑胡椒和淀粉抓匀腌制5分钟。', duration: 5, powerLevel: '备菜' },
        { stepNumber: 2, title: '炒出番茄汁', description: '少量油倒入番茄块，1400W加半勺盐快速炒出浓郁番茄红汁。', duration: 4, powerLevel: '1400W' },
        { stepNumber: 3, title: '加水煮软土豆', description: '倒入开水并放入土豆片，1800W大火煮6分钟至土豆软烂。', duration: 6, powerLevel: '1800W' },
        { stepNumber: 4, title: '滑入鱼片', description: '调至1000W微沸，下入鱼柳煮2-3分钟至雪白浮起即可。', duration: 3, powerLevel: '1000W' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '番茄土豆入内胆', description: '番茄切块、土豆切片入内胆，加2勺生抽和一碗开水。', duration: 2, powerLevel: '备料' },
        { stepNumber: 2, title: '按【快煮键】', description: '盖盖按下【快煮键】煮12分钟出酸甜浓汤。', duration: 12, powerLevel: '电饭煲【快煮键】' },
        { stepNumber: 3, title: '下鱼片焖熟', description: '开盖平铺鱼片，盖盖焖3分钟至鱼肉熟透即成！', duration: 3, powerLevel: '保温' }
      ]
    },
    {
      id: 'd4',
      title: '蒜蓉粉丝蒸大虾',
      subtitle: '吸满蒜香虾汁的龙口粉丝，清甜Q弹无油烟，晚餐减脂高蛋白轻负担！',
      coverImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
      cookTime: '12 分钟',
      minutes: 12,
      calories: '280 kcal',
      caloriesValue: 280,
      difficulty: '简单',
      mealTypes: ['dinner'],
      tags: ['晚餐', '电饭煲一锅出', '电磁炉友好', '无油烟蒸菜', '减脂餐'],
      potType: '电磁炉蒸锅/电饭煲自带蒸格',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '电磁炉开2100W最高档位迅速将蒸锅水烧大开，上汽后放入盘子蒸6-8分钟即可。',
      riceCookerTips: '🍚 电饭煲一饭一菜省电法: 电饭煲煮米饭时，把装好虾和粉丝的盘子直接放在上层蒸格上，饭熟了虾也正好鲜嫩出锅！',
      substitutionTips: '💡 鲜虾可用去壳冷冻虾仁、扇贝肉或巴沙鱼块代替。',
      likes: 15,
      isLiked: false,
      isFavorite: false,
      author: '蒸功夫',
      publishDate: '2026-08-05 · 18:20',
      ingredients: [
        { name: '鲜活大虾/虾仁', amount: 12, unit: '只', baseAmount: 12, icon: '🦐', type: 'meat' },
        { name: '龙口细粉丝', amount: 1, unit: '小捆', baseAmount: 1, icon: '🍜', type: 'pantry' },
        { name: '大蒜末', amount: 1, unit: '整头', baseAmount: 1, icon: '🧄', type: 'veg' },
        { name: '蒸鱼豉油/生抽', amount: 20, unit: 'ml', baseAmount: 20, icon: '🍾', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '摆盘准备', description: '温水泡软粉丝铺底，鲜虾开背摆在粉丝上。', duration: 4, powerLevel: '备料' },
        { stepNumber: 2, title: '调蒜蓉酱', description: '一半蒜末炒香与生蒜末、生抽混合浇在虾背上。', duration: 3, powerLevel: '800W' },
        { stepNumber: 3, title: '大火蒸制', description: '蒸锅水大开后放入盘子，2100W大火蒸6-7分钟关火焖1分钟。', duration: 7, powerLevel: '2100W' },
        { stepNumber: 4, title: '淋油出锅', description: '撒葱花淋热油激发香气即可上桌！', duration: 1, powerLevel: '关火' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '盘中码虾', description: '耐热浅盘铺粉丝和大虾，浇上调好的蒜蓉生抽汁。', duration: 4, powerLevel: '备料' },
        { stepNumber: 2, title: '放蒸格上', description: '电饭煲下层煮米饭，上层放蒸格并放入虾盘。', duration: 1, powerLevel: '备料' },
        { stepNumber: 3, title: '按【煮饭键】同熟', description: '按【煮饭键】蒸10分钟，饭熟虾嫩一炉出！', duration: 10, powerLevel: '电饭煲【蒸煮/煮饭键】' }
      ]
    },
    {
      id: 'd5',
      title: '酸辣脆爽土豆丝',
      subtitle: '爽脆开胃，酸辣适口，电磁炉平底锅5分钟搞定的晚餐配菜！',
      coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
      cookTime: '10 分钟',
      minutes: 10,
      calories: '180 kcal',
      caloriesValue: 180,
      difficulty: '简单',
      mealTypes: ['dinner'],
      tags: ['晚餐', '电磁炉友好', '酸辣', '减脂餐'],
      potType: '平底不粘锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '土豆丝清水淘洗2遍洗净淀粉才爽脆！电磁炉开1600W大火快炒，出锅前沿锅边烹入香醋。',
      substitutionTips: '💡 喜欢更辣可加剁椒或小米辣；香醋白醋陈醋皆可。',
      likes: 18,
      isLiked: false,
      isFavorite: false,
      author: 'Cookoo',
      publishDate: '2026-08-03 · 11:20',
      ingredients: [
        { name: '黄心土豆', amount: 2, unit: '个', baseAmount: 2, icon: '🥔', type: 'veg' },
        { name: '干辣椒段+蒜', amount: 4, unit: '个', baseAmount: 4, icon: '🌶️', type: 'veg' },
        { name: '香醋/白醋', amount: 20, unit: 'ml', baseAmount: 20, icon: '🍶', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '切丝洗去淀粉', description: '土豆切均匀细丝冷水淘洗2遍沥干。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '爆香干椒花椒', description: '平底锅1200W下花椒、干辣椒段和蒜片炒出香味。', duration: 2, powerLevel: '1200W' },
        { stepNumber: 3, title: '大火快炒烹醋', description: '1600W大火倒入土豆丝翻炒1.5分钟，加盐淋醋翻匀出锅！', duration: 3, powerLevel: '1600W' }
      ]
    },
    {
      id: 'd6',
      title: '娃娃菜粉丝虾滑煲',
      subtitle: '鲜虾滑Q弹爆汁，娃娃菜清甜多汁吸满金汤，暖胃不长胖！',
      coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      cookTime: '12 分钟',
      minutes: 12,
      calories: '260 kcal',
      caloriesValue: 260,
      difficulty: '简单',
      mealTypes: ['dinner'],
      tags: ['晚餐', '电饭煲一锅出', '电磁炉友好', '一锅端', '减脂餐'],
      potType: '深汤锅/平底锅/电饭煲内胆',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '娃娃菜和粉丝铺底加水煮开，勺子下入虾滑丸子，1400W煮4分钟浮起即可。',
      riceCookerTips: '🍚 电饭煲鲜煲: 娃娃菜粉丝铺底，挤上虾滑团子淋入生抽白胡椒汤，按【快煮键】10分钟自动熟透！',
      substitutionTips: '💡 虾滑可用鲜虾仁或巴沙鱼块代替。',
      likes: 35,
      isLiked: false,
      isFavorite: false,
      author: '鲜味工坊',
      publishDate: '2026-08-01 · 19:00',
      ingredients: [
        { name: '纯虾滑/冷冻虾滑', amount: 150, unit: '克', baseAmount: 150, icon: '🦐', type: 'meat' },
        { name: '娃娃菜', amount: 1, unit: '颗', baseAmount: 1, icon: '🥬', type: 'veg' },
        { name: '细粉丝', amount: 1, unit: '小捆', baseAmount: 1, icon: '🍜', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '铺底备菜', description: '娃娃菜切条、泡软粉丝铺在锅底加一碗半清水。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '水开下虾滑', description: '1800W水大滚后用勺子把虾滑挖成丸子下入锅中。', duration: 3, powerLevel: '1800W' },
        { stepNumber: 3, title: '调味出锅', description: '转1200W煮4分钟至虾滑浮起变粉红，加生抽盐白胡椒出锅！', duration: 4, powerLevel: '1200W' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '全入内胆', description: '娃娃菜粉丝铺底挤入虾滑丸子加1碗温水。', duration: 3, powerLevel: '备料' },
        { stepNumber: 2, title: '按【快煮键】', description: '按【快煮键】焖10分钟至虾滑熟透即成！', duration: 10, powerLevel: '电饭煲【快煮键】' }
      ]
    },

    // =========================================================================
    // 🌌 4. 夜宵专区 (Late-night · 共 4 道 · 5~8分钟 · 深夜食堂 · 温暖解馋)
    // =========================================================================
    {
      id: 'n1',
      title: '韩式辛拉面芝士部队小火锅',
      subtitle: '芝士片融化在劲道拉面上，热气腾腾的深夜食堂幸福暖胃神器！',
      coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      cookTime: '8 分钟',
      minutes: 8,
      calories: '490 kcal',
      caloriesValue: 490,
      difficulty: '简单',
      mealTypes: ['night'],
      tags: ['夜宵', '电饭煲一锅出', '电磁炉友好', '一锅端', '10分钟快手'],
      potType: '深汤锅/平底锅/电饭煲内胆',
      inductionFriendly: true,
      riceCookerFriendly: true,
      inductionTips: '电磁炉2000W大火烧开水，下辣酱和食材煮开后转1400W下拉面煮3分钟，最后放芝士片关火焖化。',
      riceCookerTips: '🍚 电饭煲做法: 食材加水放入内胆，按【快煮/煮饭键】烧开煮面4分钟，放芝士片跳保温即可！',
      substitutionTips: '💡 可放任何冰箱存货：午餐肉、火腿肠、泡菜、年糕条、洋葱、芝士片。',
      likes: 45,
      isLiked: false,
      isFavorite: false,
      author: '深夜拉面馆',
      publishDate: '2026-08-02 · 22:10',
      ingredients: [
        { name: '辛拉面/韩式拉面', amount: 1, unit: '包', baseAmount: 1, icon: '🍜', type: 'pantry' },
        { name: '午餐肉/火腿肠', amount: 4, unit: '厚片', baseAmount: 4, icon: '🍖', type: 'meat' },
        { name: '芝士片', amount: 1, unit: '片', baseAmount: 1, icon: '🧀', type: 'pantry' },
        { name: '韩式辣白菜/泡菜', amount: 50, unit: '克', baseAmount: 50, icon: '🥬', type: 'veg' },
        { name: '鸡蛋', amount: 1, unit: '个', baseAmount: 1, icon: '🥚', type: 'egg' }
      ],
      steps: [
        { stepNumber: 1, title: '烧水下底料', description: '锅内加500ml水，加调料包和泡菜2000W烧开。', duration: 3, powerLevel: '2000W' },
        { stepNumber: 2, title: '下配菜与面饼', description: '摆入午餐肉、面饼，打入鸡蛋，1600W煮3.5分钟。', duration: 4, powerLevel: '1600W' },
        { stepNumber: 3, title: '盖芝士片出锅', description: '表面盖芝士片关火焖30秒微融即开吃！', duration: 1, powerLevel: '关火' }
      ],
      riceCookerSteps: [
        { stepNumber: 1, title: '加水与底料', description: '内胆加水500ml，放入调料包、泡菜和午餐肉按【快煮键】。', duration: 5, powerLevel: '电饭煲【快煮键】' },
        { stepNumber: 2, title: '水开下面和蛋', description: '水大滚后放入面饼和鸡蛋，盖盖煮3分钟。', duration: 3, powerLevel: '电饭煲【快煮键】' },
        { stepNumber: 3, title: '放芝士片享用', description: '铺上芝士片按【取消/保温】，利用余温30秒拉丝即成！', duration: 1, powerLevel: '保温' }
      ]
    },
    {
      id: 'n2',
      title: '招牌葱油拌面配溏心蛋',
      subtitle: '焦香浓郁的现熬葱油，裹紧劲道面条，配一颗溏心蛋，简单却极致美味！',
      coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      cookTime: '8 分钟',
      minutes: 8,
      calories: '380 kcal',
      caloriesValue: 380,
      difficulty: '简单',
      mealTypes: ['night'],
      tags: ['夜宵', '电磁炉友好', '10分钟快手'],
      potType: '平底锅/小汤锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '小葱切段用800W小火慢熬出葱油至金黄焦脆，倒入生抽、老抽、白糖沸腾冒泡即可关火拌面。',
      substitutionTips: '💡 挂面、方便面亦可；葱油可多熬一些装瓶常温保存1个月。',
      likes: 39,
      isLiked: false,
      isFavorite: false,
      author: '老弄堂面馆',
      publishDate: '2026-08-01 · 11:50',
      ingredients: [
        { name: '细圆面条/挂面', amount: 150, unit: '克', baseAmount: 150, icon: '🍜', type: 'pantry' },
        { name: '新鲜小葱', amount: 6, unit: '根', baseAmount: 6, icon: '🧅', type: 'veg' },
        { name: '生抽+老抽+白糖', amount: 20, unit: 'ml', baseAmount: 20, icon: '🍾', type: 'pantry' },
        { name: '鸡蛋', amount: 1, unit: '个', baseAmount: 1, icon: '🥚', type: 'egg' }
      ],
      steps: [
        { stepNumber: 1, title: '小火慢熬葱油', description: '平底锅倒油，小葱段下锅800W慢熬4分钟至金黄焦脆。', duration: 4, powerLevel: '800W' },
        { stepNumber: 2, title: '烹入酱油糖汁', description: '倒入生抽、老抽和白糖，1000W微沸冒泡关火。', duration: 1, powerLevel: '1000W' },
        { stepNumber: 3, title: '煮面煎蛋拌匀', description: '面条煮熟沥干浇上葱油拌匀，盖上煎蛋开吃！', duration: 3, powerLevel: '1800W' }
      ]
    },
    {
      id: 'n3',
      title: '深夜老街风味蛋炒方便面',
      subtitle: '方便面煮至七分熟大火翻炒，镬气十足，外焦里软，深夜路边摊同款！',
      coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      cookTime: '6 分钟',
      minutes: 6,
      calories: '420 kcal',
      caloriesValue: 420,
      difficulty: '简单',
      mealTypes: ['night'],
      tags: ['夜宵', '电磁炉友好', '10分钟快手', '平底锅快炒'],
      potType: '平底不粘锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '方便面煮1.5分钟过凉水控干；平底锅1600W大火炒鸡蛋火腿，倒入面条加生抽老抽快速翻炒1分钟！',
      substitutionTips: '💡 可加入洋葱丝、包菜丝或青菜一同翻炒。',
      likes: 51,
      isLiked: false,
      isFavorite: false,
      author: '夜市摊主',
      publishDate: '2026-07-30 · 23:20',
      ingredients: [
        { name: '方便面饼', amount: 1, unit: '包', baseAmount: 1, icon: '🍜', type: 'pantry' },
        { name: '鸡蛋', amount: 1, unit: '个', baseAmount: 1, icon: '🥚', type: 'egg' },
        { name: '火腿肠', amount: 1, unit: '根', baseAmount: 1, icon: '🌭', type: 'meat' }
      ],
      steps: [
        { stepNumber: 1, title: '面饼焯水', description: '水开下面饼煮1.5分钟捞出过凉水沥干。', duration: 2, powerLevel: '1800W' },
        { stepNumber: 2, title: '大火炒配料', description: '平底锅1600W炒散鸡蛋和火腿片。', duration: 2, powerLevel: '1600W' },
        { stepNumber: 3, title: '合炒出锅', description: '下面条加生抽、老抽、少许方便面调料包大火快炒1分钟出锅！', duration: 2, powerLevel: '1800W' }
      ]
    },
    {
      id: 'n4',
      title: '热腾腾番茄浓汤肥牛面',
      subtitle: '酸甜浓郁番茄红汤泡满肥牛与挂面，深夜连汤喝光暖到心窝！',
      coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
      cookTime: '8 分钟',
      minutes: 8,
      calories: '410 kcal',
      caloriesValue: 410,
      difficulty: '简单',
      mealTypes: ['night'],
      tags: ['夜宵', '电磁炉友好', '10分钟快手', '一锅端'],
      potType: '小奶锅/小汤锅',
      inductionFriendly: true,
      riceCookerFriendly: false,
      inductionTips: '番茄炒出浓汁倒水下挂面，最后铺肥牛卷烫1分钟即可。',
      substitutionTips: '💡 肥牛可用午餐肉或肉丸子代替。',
      likes: 43,
      isLiked: false,
      isFavorite: false,
      author: '深夜厨房',
      publishDate: '2026-07-28 · 22:50',
      ingredients: [
        { name: '肥牛卷', amount: 100, unit: '克', baseAmount: 100, icon: '🥩', type: 'meat' },
        { name: '番茄', amount: 1, unit: '个', baseAmount: 1, icon: '🍅', type: 'veg' },
        { name: '挂面/拉面', amount: 80, unit: '克', baseAmount: 80, icon: '🍜', type: 'pantry' }
      ],
      steps: [
        { stepNumber: 1, title: '炒番茄汤底', description: '番茄炒出红沙加2碗水大火烧开。', duration: 3, powerLevel: '1600W' },
        { stepNumber: 2, title: '下面与肥牛', description: '下挂面煮3分钟，铺肥牛烫1分钟加盐生抽关火连汤喝光！', duration: 4, powerLevel: '1600W' }
      ]
    }
  ]
};
