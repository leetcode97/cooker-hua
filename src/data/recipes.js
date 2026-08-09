export const INITIAL_RECIPES = [
  {
    id: '1',
    title: '肥牛金针菇响铃卷煲',
    subtitle: '浓郁酸汤吸满响铃卷与肥牛，免高压锅、电磁炉/电饭煲一锅端神仙下饭菜！',
    coverImage: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    cookTime: '15 分钟',
    minutes: 15,
    calories: '420 kcal',
    caloriesValue: 420,
    difficulty: '简单',
    tags: ['电饭煲一锅出', '电磁炉友好', '一锅端', '10分钟快手', '酸辣', '嫩肉免高压'],
    potType: '深型汤锅/平底锅/电饭煲内胆',
    inductionFriendly: true,
    riceCookerFriendly: true,
    inductionTips: '先开1200W爆香蒜末和酸汤酱，加水煮沸后调至1600W下肥牛和响铃卷，沸腾焖煮4分钟熟透即可。',
    riceCookerTips: '🍚 电饭煲极简做法: 内胆刷薄油，金针菇和响铃卷铺底，码上肥牛，淋入调好的酸汤酱汁加半碗水，按下【煮饭/快煮键】煮10-12分钟跳保温即可开盖！不溅油不用看火。',
    substitutionTips: '💡 没有响铃卷可用油豆腐或普通腐竹代替；没有酸汤酱可用番茄块加白醋与番茄沙司替代。',
    likes: 28,
    isLiked: true,
    isFavorite: true,
    author: 'Cookoo 懒人厨房',
    publishDate: '2026-08-07 · 19:30',
    ingredients: [
      { name: '肥牛卷', amount: 200, unit: '克', baseAmount: 200, icon: '🥩', type: 'meat' },
      { name: '金针菇', amount: 150, unit: '克', baseAmount: 150, icon: '🍄', type: 'veg' },
      { name: '响铃卷/豆皮', amount: 6, unit: '个', baseAmount: 6, icon: '🍢', type: 'pantry' },
      { name: '酸汤酱/黄灯笼辣酱', amount: 25, unit: '克', baseAmount: 25, icon: '🥫', type: 'pantry' },
      { name: '青红杭椒', amount: 2, unit: '根', baseAmount: 2, icon: '🌶️', type: 'veg' },
      { name: '大蒜末', amount: 15, unit: '克', baseAmount: 15, icon: '🧄', type: 'veg' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '铺底备菜 (用时2分)',
        description: '金针菇切掉老根洗净沥干铺在锅底，上面均匀码上响铃卷。',
        duration: 2,
        powerLevel: '准备阶段 (无需开火)'
      },
      {
        stepNumber: 2,
        title: '炒香金汤底 (1200W中火)',
        description: '电磁炉开1200W，少许油炒香蒜末和酸汤酱，倒入2碗开水（约400ml）烧开。',
        duration: 3,
        powerLevel: '1200W 中火'
      },
      {
        stepNumber: 3,
        title: '下肥牛卷与焖煮 (1600W大火)',
        description: '将滚烫酸汤淋入锅中，铺上肥牛卷，电磁炉调至1600W盖盖焖煮4分钟至肥牛变色断生。',
        duration: 4,
        powerLevel: '1600W 大火'
      },
      {
        stepNumber: 4,
        title: '撒青红椒圈出锅 (即开即食)',
        description: '撒上青红椒圈增香提色，直接连锅端上桌开吃，省去洗盘子！',
        duration: 1,
        powerLevel: '保温/关火'
      }
    ],
    riceCookerSteps: [
      {
        stepNumber: 1,
        title: '内胆码菜 (零油烟)',
        description: '电饭煲内胆底部刷少许油，依次铺上金针菇、响铃卷，最上面整齐铺满肥牛卷。',
        duration: 3,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '调配并淋入酸汤汁',
        description: '碗中将酸汤酱、蒜末、少许生抽加小半碗清水调匀，均匀浇在食材上方。',
        duration: 2,
        powerLevel: '备料'
      },
      {
        stepNumber: 3,
        title: '按下【煮饭/快煮键】一键焖煮',
        description: '盖上电饭煲盖子，按下【煮饭键】或【快煮键】，烹煮10-12分钟后手动取消或跳保温。',
        duration: 10,
        powerLevel: '电饭煲【煮饭键】'
      },
      {
        stepNumber: 4,
        title: '开盖撒椒圈拌匀',
        description: '开盖撒入青红椒圈，用筷子轻轻翻拌一下，直接抱着电饭煲内胆开吃！',
        duration: 1,
        powerLevel: '保温'
      }
    ]
  },
  {
    id: '2',
    title: '番茄土豆巴沙鱼浓汤煲',
    subtitle: '巴沙鱼柳无刺滑嫩、5分钟即熟，酸甜浓郁开胃，减脂高蛋白首选！',
    coverImage: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    cookTime: '18 分钟',
    minutes: 18,
    calories: '310 kcal',
    caloriesValue: 310,
    difficulty: '简单',
    tags: ['电饭煲一锅出', '电磁炉友好', '减脂餐', '一锅端', '酸甜', '嫩肉免高压'],
    potType: '平底锅/汤锅/电饭煲',
    inductionFriendly: true,
    riceCookerFriendly: true,
    inductionTips: '番茄炒出红沙是关键！开1400W炒碎番茄，加开水后转1600W煮土豆，最后下鱼片800W微沸滑熟即可，不可久煮。',
    riceCookerTips: '🍚 电饭煲浓汤法: 内胆中放入番茄丁、土豆片、生抽、番茄酱加开水，按【煲汤/煮饭键】煮15分钟至浓稠，最后开盖滑入鱼片焖3分钟出锅！',
    substitutionTips: '💡 巴沙鱼可换成龙利鱼柳、黑鱼片或鲜虾仁；土豆可换成嫩豆腐。',
    likes: 19,
    isLiked: false,
    isFavorite: true,
    author: '轻食小当家',
    publishDate: '2026-08-06 · 18:20',
    ingredients: [
      { name: '巴沙鱼柳/龙利鱼', amount: 250, unit: '克', baseAmount: 250, icon: '🐟', type: 'meat' },
      { name: '熟透大番茄', amount: 2, unit: '个', baseAmount: 2, icon: '🍅', type: 'veg' },
      { name: '土豆', amount: 1, unit: '个', baseAmount: 1, icon: '🥔', type: 'veg' },
      { name: '生抽', amount: 15, unit: 'ml', baseAmount: 15, icon: '🍾', type: 'pantry' },
      { name: '黑胡椒粉', amount: 2, unit: '克', baseAmount: 2, icon: '🧂', type: 'pantry' },
      { name: '料酒/白胡椒', amount: 10, unit: 'ml', baseAmount: 10, icon: '🍶', type: 'pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '鱼片腌制上浆',
        description: '巴沙鱼斜切厚片，加入料酒、少许盐、黑胡椒粉和半勺淀粉抓匀腌制5分钟。',
        duration: 5,
        powerLevel: '备菜'
      },
      {
        stepNumber: 2,
        title: '炒浓番茄沙 (1400W中大火)',
        description: '锅内倒少量油，番茄切小块下锅，1400W加半勺盐快速翻炒压出浓郁番茄红汁。',
        duration: 4,
        powerLevel: '1400W'
      },
      {
        stepNumber: 3,
        title: '加水煮软土豆片 (1800W大火)',
        description: '倒入开水并放入切薄片的土豆，调至1800W大火煮6分钟至土豆软烂。',
        duration: 6,
        powerLevel: '1800W'
      },
      {
        stepNumber: 4,
        title: '滑入鱼片 (1000W慢煮)',
        description: '调至1000W微沸，一片片下入鱼柳，煮2-3分钟至鱼肉雪白浮起，撒葱花即成！',
        duration: 3,
        powerLevel: '1000W 低功率'
      }
    ],
    riceCookerSteps: [
      {
        stepNumber: 1,
        title: '番茄土豆入内胆',
        description: '番茄切块、土豆切薄片放入内胆，加2勺生抽、半勺盐和一碗开水。',
        duration: 2,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '按【快煮/煲汤键】煮浓汤',
        description: '盖盖按下【快煮键】烹煮12分钟，把番茄和土豆煮出酸甜浓郁红汤。',
        duration: 12,
        powerLevel: '电饭煲【快煮键】'
      },
      {
        stepNumber: 3,
        title: '下腌好的鱼片焖熟',
        description: '开盖将巴沙鱼片平铺在浓汤上，盖盖焖煮3分钟至鱼肉变白浮起即成！',
        duration: 3,
        powerLevel: '保温/微沸'
      }
    ]
  },
  {
    id: '3',
    title: '黑椒洋葱滑炒牛肉丝',
    subtitle: '牛肉丝滑嫩多汁不柴，洋葱清甜脆口，平底锅5分钟大火快手菜！',
    coverImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    cookTime: '12 分钟',
    minutes: 12,
    calories: '340 kcal',
    caloriesValue: 340,
    difficulty: '简单',
    tags: ['电磁炉友好', '10分钟快手', '平底锅快炒', '家常菜', '嫩肉免高压'],
    potType: '平底不粘锅 (纯炒菜)',
    inductionFriendly: true,
    riceCookerFriendly: false, // 纯炒菜，不适合电饭煲，不显示电饭煲选项
    inductionTips: '牛肉断生速度快，电磁炉平底锅开1600W热油滑炒2分钟即可盛出，切忌长时间干煸。',
    substitutionTips: '💡 牛肉丝可用猪里脊肉丝或鸡胸肉丝替换；洋葱可搭配青椒丝增加口感。',
    likes: 34,
    isLiked: true,
    isFavorite: false,
    author: 'Cookoo 厨神',
    publishDate: '2026-08-05 · 19:10',
    ingredients: [
      { name: '牛里脊/嫩牛肉', amount: 200, unit: '克', baseAmount: 200, icon: '🥩', type: 'meat' },
      { name: '紫洋葱', amount: 1, unit: '个', baseAmount: 1, icon: '🧅', type: 'veg' },
      { name: '青椒', amount: 1, unit: '个', baseAmount: 1, icon: '🫑', type: 'veg' },
      { name: '黑胡椒碎', amount: 3, unit: '克', baseAmount: 3, icon: '🧂', type: 'pantry' },
      { name: '生抽+老抽', amount: 15, unit: 'ml', baseAmount: 15, icon: '🍾', type: 'pantry' },
      { name: '蚝油+淀粉', amount: 10, unit: 'ml', baseAmount: 10, icon: '🫙', type: 'pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '牛肉抓匀滑嫩浆',
        description: '牛肉顺纹理切细丝，加1勺生抽、半勺老抽、黑胡椒、1勺淀粉和1勺食用油抓匀锁水。',
        duration: 3,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '滑炒肉丝 (1600W中高火)',
        description: '平底锅倒油烧热，1600W下肉丝迅速用筷子划散，炒至八成熟（约1.5分钟）盛出。',
        duration: 2,
        powerLevel: '1600W'
      },
      {
        stepNumber: 3,
        title: '炒香洋葱青椒 (1400W)',
        description: '底油倒入洋葱丝和青椒丝，翻炒至出香味变软。',
        duration: 2,
        powerLevel: '1400W'
      },
      {
        stepNumber: 4,
        title: '混合翻炒调味出锅',
        description: '倒回牛肉丝，淋入蚝油和现磨黑胡椒碎，大火翻炒15秒混合均匀出锅！',
        duration: 1,
        powerLevel: '1800W'
      }
    ]
  },
  {
    id: '4',
    title: '照烧无水洋葱鸡腿排煲',
    subtitle: '鲜嫩多汁的去骨鸡腿肉，电饭煲/电磁炉一键焗出焦香，浓油赤酱拌饭神菜！',
    coverImage: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    cookTime: '15 分钟',
    minutes: 15,
    calories: '460 kcal',
    caloriesValue: 460,
    difficulty: '简单',
    tags: ['电饭煲一锅出', '电磁炉友好', '平底锅快炒', '一锅端', '酸甜', '嫩肉免高压'],
    potType: '平底锅/电饭煲内胆',
    inductionFriendly: true,
    riceCookerFriendly: true,
    inductionTips: '鸡皮朝下小火800W煎出自带鸡油，转1200W焖熟照烧汁，不加一滴油也能焦香酥脆！',
    riceCookerTips: '🍚 电饭煲封神懒人法: 洋葱丝铺满电饭煲底防粘，鸡腿皮朝下放上去，淋入调好的照烧汁，按【标准煮饭键】！完全不用管，时间一到自动焗出焦香金黄鸡腿排！',
    substitutionTips: '💡 鸡腿排可用鸡胸肉排代替；照烧汁用生抽2勺+老抽半勺+蚝油1勺+蜂蜜/白糖1勺+水4勺调配。',
    likes: 42,
    isLiked: false,
    isFavorite: true,
    author: '日料一人食',
    publishDate: '2026-08-04 · 20:00',
    ingredients: [
      { name: '去骨鸡全腿', amount: 2, unit: '个', baseAmount: 2, icon: '🍗', type: 'meat' },
      { name: '洋葱', amount: 0.5, unit: '个', baseAmount: 0.5, icon: '🧅', type: 'veg' },
      { name: '生抽+老抽', amount: 20, unit: 'ml', baseAmount: 20, icon: '🍾', type: 'pantry' },
      { name: '蜂蜜/白糖', amount: 15, unit: '克', baseAmount: 15, icon: '🍯', type: 'pantry' },
      { name: '熟白芝麻', amount: 3, unit: '克', baseAmount: 3, icon: '⚪', type: 'pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '鸡腿划刀调照烧汁',
        description: '去骨鸡腿肉背面划几刀方便入味；碗中调入生抽、老抽、蜂蜜、蚝油加4勺水拌匀。',
        duration: 3,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '干锅煎鸡皮出油 (800W小火)',
        description: '平底锅不放油，鸡皮朝下放入，800W慢煎4分钟逼出多余油脂至鸡皮金黄。',
        duration: 4,
        powerLevel: '800W'
      },
      {
        stepNumber: 3,
        title: '翻面加洋葱煎熟 (1000W)',
        description: '翻面煎另一面，锅边放入洋葱丝一起煎香炒软。',
        duration: 3,
        powerLevel: '1000W'
      },
      {
        stepNumber: 4,
        title: '倒入酱汁收汁 (1200W)',
        description: '倒入调好的照烧汁，盖盖焖煮4分钟，最后开1400W收至汤汁浓稠裹在肉上，切块装盘！',
        duration: 5,
        powerLevel: '1200W'
      }
    ],
    riceCookerSteps: [
      {
        stepNumber: 1,
        title: '洋葱铺底防粘',
        description: '洋葱切粗丝，厚厚地铺在电饭煲内胆底部，既能垫底防糊，又能提供甜美葱香汁水。',
        duration: 2,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '摆放鸡腿排并淋酱汁',
        description: '去骨鸡腿皮朝下码在洋葱上，将生抽、老抽、蚝油、蜂蜜调好的照烧汁均匀淋在鸡肉表面。',
        duration: 2,
        powerLevel: '备料'
      },
      {
        stepNumber: 3,
        title: '按下【煮饭键】焗制',
        description: '盖上盖子按下【标准煮饭键】（约20-25分钟），让电饭煲密闭蒸汽将鸡肉焗至滑嫩。',
        duration: 20,
        powerLevel: '电饭煲【标准煮饭键】'
      },
      {
        stepNumber: 4,
        title: '开盖切块装盘淋汁',
        description: '跳保温后开盖，鸡腿肉已经浸满琥珀色光泽，取出切条，淋上锅底浓汁撒芝麻即可！',
        duration: 2,
        powerLevel: '保温'
      }
    ]
  },
  {
    id: '5',
    title: '蒜蓉粉丝蒸大虾',
    subtitle: '吸满蒜香虾汁的龙口粉丝，清甜Q弹无油烟，电饭煲蒸格同煮米饭更省时！',
    coverImage: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    cookTime: '12 分钟',
    minutes: 12,
    calories: '280 kcal',
    caloriesValue: 280,
    difficulty: '简单',
    tags: ['电饭煲一锅出', '电磁炉友好', '无油烟蒸菜', '减脂餐', '10分钟快手', '海鲜'],
    potType: '电磁炉蒸锅/电饭煲自带蒸格',
    inductionFriendly: true,
    riceCookerFriendly: true,
    inductionTips: '电磁炉开2100W最高档位迅速将蒸锅水烧大开，上汽后放入盘子蒸6-8分钟即可，虾肉极脆嫩。',
    riceCookerTips: '🍚 电饭煲一饭一菜省电法: 电饭煲煮米饭时，把装好虾和粉丝的盘子直接放在上层蒸格上，饭熟了虾也正好鲜嫩出锅，一炉两得！',
    substitutionTips: '💡 鲜虾可用去壳冷冻虾仁、扇贝肉或巴沙鱼块代替；粉丝用温水浸泡10分钟即可。',
    likes: 15,
    isLiked: true,
    isFavorite: true,
    author: '蒸功夫',
    publishDate: '2026-08-05 · 18:20',
    ingredients: [
      { name: '鲜活大虾/虾仁', amount: 12, unit: '只', baseAmount: 12, icon: '🦐', type: 'meat' },
      { name: '龙口细粉丝', amount: 1, unit: '小捆', baseAmount: 1, icon: '🍜', type: 'pantry' },
      { name: '大蒜末', amount: 1, unit: '整头', baseAmount: 1, icon: '🧄', type: 'veg' },
      { name: '蒸鱼豉油/生抽', amount: 20, unit: 'ml', baseAmount: 20, icon: '🍾', type: 'pantry' },
      { name: '小葱花', amount: 10, unit: '克', baseAmount: 10, icon: '🧅', type: 'veg' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '粉丝铺底开背摆虾',
        description: '粉丝温水泡软剪短铺在深盘底；鲜虾剪须去虾线，开背压平铺在粉丝表面。',
        duration: 4,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '炒制金银蒜蓉酱 (800W)',
        description: '一半蒜末入平底锅800W炒至微黄，关火与生蒜末、生抽、少许白糖混合浇在虾背上。',
        duration: 3,
        powerLevel: '800W'
      },
      {
        stepNumber: 3,
        title: '大火上汽蒸制 (2100W高功率)',
        description: '蒸锅水烧开上大汽后，放入虾盘，大火蒸6-7分钟关火焖1分钟。',
        duration: 7,
        powerLevel: '2100W 最高档'
      },
      {
        stepNumber: 4,
        title: '出锅淋葱花热油',
        description: '出锅撒上葱花，淋上一小勺滚烫热油激发香气即可上桌！',
        duration: 1,
        powerLevel: '关火'
      }
    ],
    riceCookerSteps: [
      {
        stepNumber: 1,
        title: '粉丝虾摆入耐热浅盘',
        description: '泡软粉丝铺底，开背大虾码在表面，浇上生抽、蒜末和少许香油调好的蒜蓉汁。',
        duration: 4,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '放入电饭煲蒸格',
        description: '电饭煲下层煮饭或加2杯水，将虾盘放入配套的上层蒸格中。',
        duration: 1,
        powerLevel: '备料'
      },
      {
        stepNumber: 3,
        title: '随饭同蒸或按【蒸煮键】',
        description: '按下【煮饭键】或【蒸煮键】蒸10分钟，米饭熟透的同时虾肉也吸收蒜香成熟！',
        duration: 10,
        powerLevel: '电饭煲【蒸煮/煮饭键】'
      }
    ]
  },
  {
    id: '6',
    title: '豆角土豆腊肠焖饭/焖面',
    subtitle: '咸香入味，米饭/面条吸饱浓郁肉汁锅巴焦香，电饭煲一键神仙懒人饭！',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    cookTime: '20 分钟',
    minutes: 20,
    calories: '480 kcal',
    caloriesValue: 480,
    difficulty: '简单',
    tags: ['电饭煲一锅出', '电磁炉友好', '一锅端', '懒人主食', '家常菜'],
    potType: '深平底锅/电饭煲内胆',
    inductionFriendly: true,
    riceCookerFriendly: true,
    inductionTips: '盛出一半汤汁备用，铺上面条后沿锅边少量多次淋汤，开1000W中低火盖盖焖面，防止底部糊锅。',
    riceCookerTips: '🍚 电饭煲懒人焖饭做法: 淘好大米加平时煮饭略少的水，上面铺上炒香的豆角丁、土豆块和腊肠片，倒入生抽老抽蚝油汁，按【标准煮饭键】，煮好翻拌均匀即可！',
    substitutionTips: '💡 鲜切细面条、大米、方便面均可；腊肠可替换为五花肉丁、火腿肠或鸡肉丁。',
    likes: 52,
    isLiked: true,
    isFavorite: true,
    author: '面饭研究所',
    publishDate: '2026-08-03 · 12:15',
    ingredients: [
      { name: '大米或鲜切面', amount: 150, unit: '克', baseAmount: 150, icon: '🍚', type: 'pantry' },
      { name: '四季豆/豆角', amount: 150, unit: '克', baseAmount: 150, icon: '🌱', type: 'veg' },
      { name: '土豆', amount: 1, unit: '个', baseAmount: 1, icon: '🥔', type: 'veg' },
      { name: '广式腊肠/火腿', amount: 2, unit: '根', baseAmount: 2, icon: '🌭', type: 'meat' },
      { name: '生抽+老抽+蚝油', amount: 25, unit: 'ml', baseAmount: 25, icon: '🍾', type: 'pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '炒香豆角与配菜 (1400W)',
        description: '锅中热油，下葱蒜炒香，放入豆角段、土豆条和火腿片翻炒2分钟至豆角翠绿。',
        duration: 3,
        powerLevel: '1400W'
      },
      {
        stepNumber: 2,
        title: '加调料加水煮沸 (1600W)',
        description: '加入生抽、老抽、蚝油调味，倒入没过食材的开水（约350ml），盛出半碗汤汁备用。',
        duration: 2,
        powerLevel: '1600W'
      },
      {
        stepNumber: 3,
        title: '铺面条慢火焖透 (1000W)',
        description: '将生面条蓬松抖散平铺在菜上，盖上锅盖调至1000W中火焖6分钟。',
        duration: 6,
        powerLevel: '1000W'
      },
      {
        stepNumber: 4,
        title: '淋汤拌匀出锅',
        description: '揭盖沿锅边淋入盛出的半碗汤汁，用筷子快速翻拌均匀，让每根面条裹满浓汁！',
        duration: 2,
        powerLevel: '800W'
      }
    ],
    riceCookerSteps: [
      {
        stepNumber: 1,
        title: '大米淘洗入内胆',
        description: '内胆放入大米淘洗干净，加入比平时煮饭略少一点的水（因为蔬菜会出水）。',
        duration: 2,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '铺上豆角土豆腊肠',
        description: '豆角切小段、土豆切小丁、腊肠切斜片，整齐平铺在大米表面。',
        duration: 3,
        powerLevel: '备料'
      },
      {
        stepNumber: 3,
        title: '淋酱汁按【煮饭键】',
        description: '生抽2勺+老抽半勺+蚝油1勺+香油少许调汁淋在表面，按下【标准煮饭键】。',
        duration: 25,
        powerLevel: '电饭煲【标准煮饭键】'
      },
      {
        stepNumber: 4,
        title: '开盖撒葱花翻拌',
        description: '跳保温后开盖，满屋飘香！用饭勺从底往上充分翻拌均匀，底部还有诱人焦香锅巴！',
        duration: 2,
        powerLevel: '保温'
      }
    ]
  },
  {
    id: '7',
    title: '酸辣脆爽土豆丝',
    subtitle: '爽脆开胃，酸辣适口，电磁炉平底锅5分钟搞定的下饭神菜！',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    cookTime: '10 分钟',
    minutes: 10,
    calories: '180 kcal',
    caloriesValue: 180,
    difficulty: '简单',
    tags: ['电磁炉友好', '10分钟快手', '平底锅快炒', '酸辣', '减脂餐'],
    potType: '平底不粘锅 (纯炒菜)',
    inductionFriendly: true,
    riceCookerFriendly: false, // 纯炒菜，不适合电饭煲，不显示电饭煲选项
    inductionTips: '土豆丝必须清水洗去表面淀粉才爽脆！电磁炉开1600W大火快炒，出锅前沿锅边烹入香醋激发出酸香味。',
    substitutionTips: '💡 喜欢更辣可加剁椒或小米辣；没有香醋可用白醋或陈醋。',
    likes: 18,
    isLiked: false,
    isFavorite: false,
    author: 'Cookoo',
    publishDate: '2026-08-03 · 11:20',
    ingredients: [
      { name: '黄心土豆', amount: 2, unit: '个', baseAmount: 2, icon: '🥔', type: 'veg' },
      { name: '干辣椒段', amount: 4, unit: '个', baseAmount: 4, icon: '🌶️', type: 'veg' },
      { name: '大蒜片', amount: 3, unit: '瓣', baseAmount: 3, icon: '🧄', type: 'veg' },
      { name: '香醋/白醋', amount: 20, unit: 'ml', baseAmount: 20, icon: '🍶', type: 'pantry' },
      { name: '花椒粒', amount: 2, unit: '克', baseAmount: 2, icon: '🫘', type: 'pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '切细丝洗去淀粉',
        description: '土豆切均匀细丝，放入冷水中淘洗2遍洗净淀粉，沥干水分。',
        duration: 3,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '爆香干椒花椒 (1200W)',
        description: '平底锅倒入适量食用油，1200W下花椒、干辣椒段和蒜片炒出香味。',
        duration: 2,
        powerLevel: '1200W'
      },
      {
        stepNumber: 3,
        title: '大火快炒烹醋 (1600W)',
        description: '调至1600W倒入土豆丝快速翻炒1.5分钟，加入盐、沿锅边淋入香醋翻炒均匀出锅！',
        duration: 3,
        powerLevel: '1600W'
      }
    ]
  },
  {
    id: '8',
    title: '寿喜烧肥牛无水豆腐锅',
    subtitle: '甜香醇厚、日式一人食暖心小火锅，电饭煲/电磁炉加酱汁一键焖炖！',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    cookTime: '15 分钟',
    minutes: 15,
    calories: '430 kcal',
    caloriesValue: 430,
    difficulty: '简单',
    tags: ['电饭煲一锅出', '电磁炉友好', '一锅端', '10分钟快手', '嫩肉免高压', '日料'],
    potType: '深平底锅/浅汤锅/电饭煲内胆',
    inductionFriendly: true,
    riceCookerFriendly: true,
    inductionTips: '洋葱娃娃菜自带大量清甜水分，电磁炉开1000W慢焖6分钟自然出浓汤，肥牛蘸无菌蛋液极鲜嫩！',
    riceCookerTips: '🍚 电饭煲做法: 蔬菜豆腐全码进内胆，淋入寿喜烧汁，按下【煮饭键】焖8分钟，开盖放入肥牛焖2分钟即可断电享用！',
    substitutionTips: '💡 蔬菜可随意添加香菇、魔芋结、茼蒿菜；寿喜烧汁=生抽2勺+味醂/米酒2勺+白糖1勺。',
    likes: 38,
    isLiked: true,
    isFavorite: true,
    author: '一人食研究所',
    publishDate: '2026-08-01 · 19:40',
    ingredients: [
      { name: '肥牛片', amount: 200, unit: '克', baseAmount: 200, icon: '🥩', type: 'meat' },
      { name: '嫩豆腐/老豆腐', amount: 1, unit: '块', baseAmount: 1, icon: '🧈', type: 'veg' },
      { name: '娃娃菜/大白菜', amount: 1, unit: '颗', baseAmount: 1, icon: '🥬', type: 'veg' },
      { name: '金针菇/香菇', amount: 100, unit: '克', baseAmount: 100, icon: '🍄', type: 'veg' },
      { name: '寿喜烧汁/日式生抽', amount: 40, unit: 'ml', baseAmount: 40, icon: '🍾', type: 'pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '蔬菜码锅底',
        description: '娃娃菜切段铺在锅底，上面分类整齐码上切块豆腐、金针菇和洋葱丝。',
        duration: 3,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '淋入寿喜烧酱汁 (1200W)',
        description: '淋入调配好的寿喜烧酱汁与2勺清水，电磁炉开1200W盖盖焖煮5分钟出汁。',
        duration: 5,
        powerLevel: '1200W'
      },
      {
        stepNumber: 3,
        title: '铺肥牛卷烫熟 (1400W)',
        description: '揭盖铺上肥牛卷，汤汁沸腾烫1-2分钟至变色即可直接连锅开吃！',
        duration: 3,
        powerLevel: '1400W'
      }
    ],
    riceCookerSteps: [
      {
        stepNumber: 1,
        title: '食材全入内胆',
        description: '将娃娃菜、切块豆腐、金针菇和洋葱分格摆进电饭煲内胆。',
        duration: 3,
        powerLevel: '备料'
      },
      {
        stepNumber: 2,
        title: '淋汁按【快煮键】',
        description: '淋入寿喜烧汁与3勺水，按下【快煮/煮饭键】焖煮8分钟直至蔬菜软烂出甜汤。',
        duration: 8,
        powerLevel: '电饭煲【快煮键】'
      },
      {
        stepNumber: 3,
        title: '加入肥牛余温焖熟',
        description: '开盖铺上肥牛卷，盖盖利用煲内滚烫蒸汽继续焖2分钟至肥牛变粉白即可！',
        duration: 2,
        powerLevel: '保温'
      }
    ]
  },
  {
    id: '9',
    title: '番茄滑蛋盖浇饭',
    subtitle: '滑嫩流心鸡蛋裹满酸甜浓稠番茄汁，10分钟学生党/租房党封神快餐！',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    cookTime: '10 分钟',
    minutes: 10,
    calories: '320 kcal',
    caloriesValue: 320,
    difficulty: '简单',
    tags: ['电磁炉友好', '10分钟快手', '平底锅快炒', '懒人主食', '酸甜'],
    potType: '平底不沾锅 (纯炒菜)',
    inductionFriendly: true,
    riceCookerFriendly: false, // 纯滑炒推蛋，不适合电饭煲，不显示电饭煲选项
    inductionTips: '鸡蛋加2勺牛奶或温水打散更嫩！电磁炉开1400W热油倒入蛋液，用锅铲由外向内推至半凝固马上盛出。',
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
      { name: '白糖', amount: 5, unit: '克', baseAmount: 5, icon: '🍚', type: 'pantry' },
      { name: '熟米饭', amount: 1, unit: '碗', baseAmount: 1, icon: '🍚', type: 'pantry' }
    ],
    steps: [
      {
        stepNumber: 1,
        title: '滑炒流心蛋 (1400W快速推蛋)',
        description: '鸡蛋加少许盐打匀，平底锅热油1400W下蛋液，快速推铲至八分熟盛出备用。',
        duration: 2,
        powerLevel: '1400W'
      },
      {
        stepNumber: 2,
        title: '炒出酸甜番茄汁 (1200W)',
        description: '番茄切块下锅翻炒出汁，加入番茄酱、白糖、生抽和少许水淀粉煮至浓稠。',
        duration: 4,
        powerLevel: '1200W'
      },
      {
        stepNumber: 3,
        title: '混合蛋液浇在米饭上',
        description: '倒入滑蛋翻炒两下关火，将金黄滑蛋与浓汁浇在热米饭上，撒葱花开炫！',
        duration: 2,
        powerLevel: '关火'
      }
    ]
  },
  {
    id: '10',
    title: '韩式辛拉面部队火锅',
    subtitle: '芝士片融化在劲道拉面上，热气腾腾的深夜食堂幸福暖胃神器！',
    coverImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    cookTime: '12 分钟',
    minutes: 12,
    calories: '490 kcal',
    caloriesValue: 490,
    difficulty: '简单',
    tags: ['电饭煲一锅出', '电磁炉友好', '一锅端', '懒人主食', '10分钟快手', '夜宵'],
    potType: '深汤锅/平底锅/电饭煲内胆',
    inductionFriendly: true,
    riceCookerFriendly: true,
    inductionTips: '电磁炉2000W大火烧开水，下辣酱和食材煮开后转1400W下拉面煮3分钟，最后放芝士片关火焖化。',
    riceCookerTips: '🍚 电饭煲做法: 食材加水放入内胆，按【快煮/煮饭键】烧开煮面4分钟，放芝士片跳保温即可！',
    substitutionTips: '💡 可放任何冰箱存货：午餐肉、火腿肠、泡菜、年糕条、洋葱、芝士片。',
    likes: 45,
    isLiked: true,
    isFavorite: true,
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
      {
        stepNumber: 1,
        title: '大火烧水下底料 (2000W)',
        description: '锅内加500ml水，放入拉面蔬菜包、调料包和泡菜，2000W大火烧开。',
        duration: 3,
        powerLevel: '2000W'
      },
      {
        stepNumber: 2,
        title: '下配菜与面饼 (1600W)',
        description: '整齐摆入午餐肉、面饼，打入一个整鸡蛋，1600W中大火煮3.5分钟。',
        duration: 4,
        powerLevel: '1600W'
      },
      {
        stepNumber: 3,
        title: '盖芝士片融化出锅',
        description: '趁热在面饼上方盖上一片芝士片，关火焖30秒待芝士微融即可开吃！',
        duration: 1,
        powerLevel: '关火'
      }
    ],
    riceCookerSteps: [
      {
        stepNumber: 1,
        title: '加水与底料按【快煮键】',
        description: '内胆加水500ml，放入拉面调料包、辣白菜和午餐肉，按下【快煮/煮饭键】烧开。',
        duration: 5,
        powerLevel: '电饭煲【快煮键】'
      },
      {
        stepNumber: 2,
        title: '水开下面饼与鸡蛋',
        description: '水大滚后开盖放入拉面面饼，打入一个鸡蛋，盖盖煮3分钟。',
        duration: 3,
        powerLevel: '电饭煲【快煮键】'
      },
      {
        stepNumber: 3,
        title: '放芝士片跳保温',
        description: '表面铺上一片芝士片，手动按【取消/保温】，利用余温30秒将芝士焖至拉丝即开吃！',
        duration: 1,
        powerLevel: '保温'
      }
    ]
  }
];

export const POPULAR_TAGS = [
  '电饭煲一锅出', '电磁炉友好', '一锅端', '10分钟快手', '嫩肉免高压', '无油烟蒸菜', '平底锅快炒', '懒人主食', '减脂餐'
];

export const FRIDGE_CATEGORIES = [
  {
    name: '蔬菜类',
    icon: '🥦',
    items: ['番茄', '金针菇', '土豆', '青椒', '洋葱', '娃娃菜/大白菜', '四季豆/豆角', '绿豆芽', '大蒜', '小葱']
  },
  {
    name: '肉禽蛋类 (免高压快熟)',
    icon: '🥩',
    items: ['肥牛卷', '巴沙鱼柳/龙利鱼', '牛里脊/嫩牛肉', '去骨鸡全腿', '鲜活大虾/虾仁', '鸡蛋', '火腿肠/腊肠', '午餐肉']
  },
  {
    name: '调料豆品主食',
    icon: '🧂',
    items: ['响铃卷/豆皮', '嫩豆腐/老豆腐', '龙口细粉丝', '辛拉面/韩式拉面', '大米或鲜切面', '酸汤酱/黄灯笼辣酱', '生抽', '蚝油', '芝士片', '白糖']
  }
];
