// 显示Toast提示
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 设置底部导航激活状态
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// 设置按钮事件 - 使用Toast提示
document.querySelectorAll('.join-button, .equipment-button').forEach(button => {
    button.addEventListener('click', function () {
        showToast('功能即将开放，敬请期待！');
    });
});

// 设置勋章查看全部事件
document.querySelector('.view-all').addEventListener('click', function () {
    showToast('功能即将开放，敬请期待！');
});

// 设置项点击事件
document.querySelectorAll('.setting-item').forEach(item => {
    item.addEventListener('click', function () {
        // 添加点击效果
        this.style.backgroundColor = 'rgba(254, 230, 32, 0.2)';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 300);

        // 显示Toast提示
        const settingName = this.querySelector('.setting-name span').textContent;
        showToast(`打开${settingName}设置`);

    });
});

// 用户信息编辑功能
const profileHeader = document.getElementById('profileHeader');
const editPanel = document.getElementById('editPanel');
const overlay = document.getElementById('overlay');
const cancelBtn = document.getElementById('cancelBtn');
const saveBtn = document.getElementById('saveBtn');
const avatarUpload = document.getElementById('avatarUpload');
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const nameInput = document.getElementById('nameInput');
const genderSelect = document.getElementById('genderSelect');
const heightInput = document.getElementById('heightInput');
const ageInput = document.getElementById('ageInput');
const userName = document.getElementById('userName');
const userMeta = document.getElementById('userMeta');
const avatarIcon = document.getElementById('avatarIcon');

// 打开编辑面板
profileHeader.addEventListener('click', function () {
    // 填充当前数据
    nameInput.value = userName.textContent;

    const metaParts = userMeta.textContent.split(' | ');
    genderSelect.value = metaParts[0];
    heightInput.value = parseInt(metaParts[1]);
    ageInput.value = parseInt(metaParts[2]);

    // 显示编辑面板
    editPanel.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.add('modal-open');
});

// 关闭编辑面板
function closeEditPanel() {
    editPanel.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.remove('modal-open');
}

cancelBtn.addEventListener('click', closeEditPanel);
overlay.addEventListener('click', closeEditPanel);

// 保存用户信息
saveBtn.addEventListener('click', function () {
    // 更新页面显示
    userName.textContent = nameInput.value;
    userMeta.textContent = `${genderSelect.value} | ${heightInput.value}厘米 | ${ageInput.value}岁`;

    // 关闭面板
    closeEditPanel();

    // 显示保存成功提示
    showToast('个人信息已更新');
});

// 头像上传功能
avatarUpload.addEventListener('click', function () {
    avatarInput.click();
});

avatarInput.addEventListener('change', function (e) {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();

        reader.onload = function (event) {
            // 显示上传的图片
            avatarPreview.src = event.target.result;
            avatarPreview.style.display = 'block';
            avatarIcon.style.display = 'none';

            // 更新主页面头像
            document.querySelector('.user-avatar').style.backgroundImage = `url(${event.target.result})`;
        };

        reader.readAsDataURL(e.target.files[0]);
    }
});

// 页面加载时初始化头像
document.addEventListener('DOMContentLoaded', function () {
    // 设置默认头像
    const defaultAvatar = '../photo/kb.png';
    avatarPreview.src = defaultAvatar;
    document.querySelector('.user-avatar').style.backgroundImage = `url(${defaultAvatar})`;
});