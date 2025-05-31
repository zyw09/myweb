// 设置当前日期
const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
document.getElementById('currentDate').textContent = now.toLocaleDateString('zh-CN', options);

// 食谱数据（包含图片URL）
const recipes = [
    {
        id: 1,
        name: "凉拌鸡丝蔬菜拼盘",
        calories: 120,
        prepTime: 15,
        carbs: 10,
        protein: 15,
        fat: 12,
        image: "../photo/foods/1.png"
    },
    {
        id: 2,
        name: "牛排减脂餐",
        calories: 150,
        prepTime: 20,
        carbs: 8,
        protein: 12,
        fat: 7,
        image: "../photo/foods/2.png"
    },
    {
        id: 3,
        name: "鸡丝牛油果蔬菜沙拉",
        calories: 130,
        prepTime: 25,
        carbs: 5,
        protein: 10,
        fat: 22,
        image: "../photo/foods/3.png"
    },
    {
        id: 4,
        name: "牛油果玉米吐司沙拉",
        calories: 180,
        prepTime: 20,
        carbs: 5,
        protein: 20,
        fat: 4,
        image: "../photo/foods/4.png"
    },
    {
        id: 5,
        name: "烤鱼蔬菜沙拉",
        calories: 130,
        prepTime: 30,
        carbs: 5,
        protein: 15,
        fat: 6,
        image: "../photo/foods/5.png"
    },
    {
        id: 6,
        name: "低卡拌饭",
        calories: 130,
        prepTime: 20,
        carbs: 20,
        protein: 8,
        fat: 10,
        image: "../photo/foods/6.png"
    },
    {
        id: 7,
        name: "杂蔬毛豆拌饭",
        calories: 100,
        prepTime: 20,
        carbs: 15,
        protein: 5,
        fat: 10,
        image: "../photo/foods/7.png"
    },
    {
        id: 8,
        name: "所有食谱均为100克",
        calories: 0,
        prepTime: 0,
        carbs: 0,
        protein: 0,
        fat: 0,
        image: "../photo/foods/8.png"
    }
];

// 食物记录
let foodItems = [
    { id: 1, name: "鸡胸肉 (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { id: 2, name: "糙米饭 (150g)", calories: 166, protein: 3.5, carbs: 35, fat: 1.2 },
    { id: 3, name: "西兰花 (100g)", calories: 35, protein: 2.8, carbs: 7, fat: 0.4 }
];

// 计算总热量
function calculateTotalCalories() {
    return foodItems.reduce((total, item) => total + item.calories, 0);
}

// 更新总热量显示
function updateTotalCalories() {
    const total = calculateTotalCalories();
    document.getElementById('totalCalories').textContent = total;
    document.getElementById('caloriesDisplay').textContent = total.toLocaleString();
    document.getElementById('calorieProgress').style.width = `${Math.min(100, (total / 1800) * 100)}%`;
}

// 渲染食谱
function renderRecipes() {
    const container = document.getElementById('recipesContainer');
    container.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeEl = document.createElement('div');
        recipeEl.className = 'recipe-card';
        recipeEl.setAttribute('data-id', recipe.id);
        recipeEl.innerHTML = `
            <div class="recipe-image" style="background-image: url('${recipe.image}')">
                <div class="recipe-calories">${recipe.calories} 大卡</div>
            </div>
            <div class="recipe-info">
                <div class="recipe-title">${recipe.name}</div>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.prepTime}分钟</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories}卡</span>
                </div>
            </div>
        `;
        container.appendChild(recipeEl);
    });
}

// 渲染食物记录
function renderFoodItems() {
    const container = document.getElementById('foodItemsContainer');
    container.innerHTML = '';

    if (foodItems.length === 0) {
        container.innerHTML = '<div class="no-items" style="text-align: center; padding: 20px; color: var(--text-gray);">暂无食物记录</div>';
        return;
    }

    foodItems.forEach(item => {
        const foodEl = document.createElement('div');
        foodEl.className = 'food-item';
        foodEl.innerHTML = `
            <div class="food-details">
                <div class="food-name">${item.name}</div>
                <div class="food-meta">
                    <span class="food-calories">${item.calories} 大卡</span>
                    <span>蛋白质: ${item.protein}g</span>
                    <span>碳水: ${item.carbs}g</span>
                </div>
            </div>
            <button class="food-delete" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(foodEl);
    });

    // 添加删除事件
    document.querySelectorAll('.food-delete').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            foodItems = foodItems.filter(item => item.id !== id);
            renderFoodItems();
            updateTotalCalories();
            showNotification('食物记录已删除');
        });
    });
}

// 添加食物
document.getElementById('addFoodBtn').addEventListener('click', function () {
    const name = document.getElementById('foodName').value.trim();
    const amount = parseInt(document.getElementById('foodAmount').value);
    const calories = parseInt(document.getElementById('foodCalories').value);

    if (!name || isNaN(amount) || isNaN(calories)) {
        showNotification('请填写完整的食物信息');
        return;
    }

    const newFood = {
        id: Date.now(),
        name: `${name} (${amount}g)`,
        calories: calories,
        protein: Math.round(calories * 0.25 / 4),
        carbs: Math.round(calories * 0.5 / 4),
        fat: Math.round(calories * 0.25 / 9)
    };

    foodItems.push(newFood);
    renderFoodItems();
    updateTotalCalories();

    // 清空表单
    document.getElementById('foodName').value = '';
    document.getElementById('foodAmount').value = '';
    document.getElementById('foodCalories').value = '';

    showNotification(`${name} 已添加到记录`);
});

// 添加食谱到食物记录
function addRecipeToFoodList(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;

    const newFood = {
        id: Date.now(),
        name: `${recipe.name} (1份)`,
        calories: recipe.calories,
        protein: recipe.protein,
        carbs: recipe.carbs,
        fat: recipe.fat
    };

    foodItems.push(newFood);
    renderFoodItems();
    updateTotalCalories();
    showNotification(`${recipe.name} 已添加到食物记录`);
}

// 显示提示函数
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.style.display = 'block';

    // 淡入
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);

    // 1秒后淡出
    setTimeout(() => {
        notification.style.opacity = '0';

        // 淡出后隐藏
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 1000);
}

// 用户名编辑功能
document.querySelector('.user-name').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('usernameEditPanel').style.display = 'flex';

    // 填充当前用户名
    const currentName = this.textContent;
    document.getElementById('usernameInput').value = currentName;
});

// 头像编辑功能
document.querySelector('.user-avatar').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('avatarEditPanel').style.display = 'flex';

    // 设置预览
    const avatar = document.querySelector('.user-avatar');
    const preview = document.getElementById('avatarPreview');

    if (avatar.style.backgroundImage) {
        preview.style.backgroundImage = avatar.style.backgroundImage;
    } else {
        preview.style.backgroundImage = '';
        preview.innerHTML = '<i class="fas fa-user"></i>';
    }
});

// 关闭编辑面板
document.querySelectorAll('.edit-close, .edit-cancel').forEach(btn => {
    btn.addEventListener('click', function () {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('usernameEditPanel').style.display = 'none';
        document.getElementById('avatarEditPanel').style.display = 'none';
    });
});

// 确认用户名修改
document.getElementById('confirmUsername').addEventListener('click', function () {
    const newName = document.getElementById('usernameInput').value.trim();
    if (newName) {
        document.querySelector('.user-name').textContent = newName;
        showNotification('用户名已更新');
        closeEditPanels();
    }
});

// 上传头像功能
document.getElementById('avatarUpload').addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (event) {
            // 更新预览
            const preview = document.getElementById('avatarPreview');
            preview.style.backgroundImage = `url(${event.target.result})`;
            preview.innerHTML = '';

            // 更新实际头像
            const avatar = document.querySelector('.user-avatar');
            avatar.style.backgroundImage = `url(${event.target.result})`;
            avatar.querySelector('i').style.display = 'none';

            showNotification('头像已更新');
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});

// 确认头像修改
document.getElementById('confirmAvatar').addEventListener('click', function () {
    closeEditPanels();
});

// 关闭所有编辑面板
function closeEditPanels() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('usernameEditPanel').style.display = 'none';
    document.getElementById('avatarEditPanel').style.display = 'none';
}

// 点击遮罩层关闭
document.getElementById('overlay').addEventListener('click', closeEditPanels);

// 查看所有食谱
document.getElementById('viewRecipes').addEventListener('click', function () {
    showNotification('正在加载更多减肥食谱...');

    // 模拟加载
    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        showNotification('功能正在开发，请稍等');
    }, 1000);
});

// 初始化
window.addEventListener('load', () => {
    renderRecipes();
    renderFoodItems();
    updateTotalCalories();

    // 为食谱卡片添加点击事件
    document.getElementById('recipesContainer').addEventListener('click', function (e) {
        const recipeCard = e.target.closest('.recipe-card');
        if (recipeCard) {
            const recipeId = parseInt(recipeCard.getAttribute('data-id'));
            addRecipeToFoodList(recipeId);
        }
    });

    // 模拟加载
    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1200);
});