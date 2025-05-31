// 设置当前日期
const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
document.getElementById('currentDate').textContent = now.toLocaleDateString('zh-CN', options);

// 卡片点击效果
document.querySelectorAll('.activity-card, .indicator-card, .group-card, .plan-card, .recommendation-card, .course-card').forEach(card => {
    card.addEventListener('click', function () {
        this.classList.add('pulse');
        setTimeout(() => this.classList.remove('pulse'), 1000);

        // 显示提示
        const title = this.querySelector('.activity-title, .group-name, .plan-name, .recommendation-name, .course-title')?.textContent || '项目';
        showNotification(`正在更新内容敬请期待...`);
    });
});

// 底部导航交互
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // 显示提示
        const name = this.querySelector('span').textContent;

        // 模拟导航切换时的加载
        document.getElementById('loader').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 800);
    });
});

// 初始数据加载
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1500);
});

// 舞动按钮效果
document.querySelector('.dance-button').addEventListener('click', function () {
    this.classList.add('pulse');
    setTimeout(() => this.classList.remove('pulse'), 1000);

    // 显示提示
    showNotification("正在更新内容敬请期待...");

    // 显示加载动画
    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1200);
});

// 查看全部功能
document.querySelectorAll('.view-all').forEach(item => {
    item.addEventListener('click', function () {
        const section = this.closest('.activity-header, .plans-header, .recommendations-header, .courses-header');
        const title = section.querySelector('.activity-title, .plans-title, .recommendations-title, .courses-title').textContent;

        // 显示提示
        showNotification(`正在更新内容敬请期待...`);

        // 显示加载动画
        document.getElementById('loader').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 800);
    });
});

// 课程详情展开/收起功能
document.querySelectorAll('.toggle-details').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const courseCard = this.closest('.course-card');
        courseCard.classList.toggle('expanded');

        if (courseCard.classList.contains('expanded')) {
            this.querySelector('span').textContent = '收起课程';
        } else {
            this.querySelector('span').textContent = '展开全部课程';
        }
    });
});

// 课程分类筛选
document.querySelectorAll('.filter-item').forEach(filter => {
    filter.addEventListener('click', function () {
        document.querySelectorAll('.filter-item').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// 课程参与按钮
document.querySelectorAll('.course-action').forEach(button => {
    button.addEventListener('click', function () {
        const courseTitle = this.closest('.course-card').querySelector('.course-title').textContent;
        alert(`开始训练: ${courseTitle}`);
    });
});

// 设置当前日期
document.querySelector('.date-display').textContent = now.toLocaleDateString('zh-CN', options);

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

function setDynamicBackgrounds() {


    // 设置推荐卡片背景
    const recCards = document.querySelectorAll('.recommendation-card');
    recCards.forEach((card, index) => {
        card.style.backgroundImage = `url('../photo/bj/${9 + index}.png')`;
    });

    // 设置课程图片背景
    const courseImages = document.querySelectorAll('.course-image');
    courseImages.forEach((img, index) => {
        img.style.backgroundImage = `url('../photo/bj/${11 + index}.png')`;
    });
}

// 在页面加载完成后执行
window.addEventListener('load', () => {
    setDynamicBackgrounds();

    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1500);
});