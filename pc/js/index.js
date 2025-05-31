//<div class="admin-hint">管理员账号: Yi / 123456789</div>
// 初始化用户数据
const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

// 添加默认管理员账户（如果不存在）
const adminUser = {
    username: "Yi",
    phone: "13800000000",
    email: "admin@example.com",
    password: "123456789",
    isAdmin: true
};

// 检查管理员账户是否已存在
const adminExists = registeredUsers.some(user => user.username === "Yi");
if (!adminExists) {
    registeredUsers.push(adminUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
}

// 模拟用户数据
const users = registeredUsers.concat([
    { username: "user1", phone: "13800138001", password: "password1" },
    { username: "user2", phone: "user@example.com", password: "password2" }
]);

// 密码显示/隐藏功能
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const icon = this.querySelector('i');

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
});

// 当输入管理员账号时改变按钮样式
document.getElementById('phone').addEventListener('input', function () {
    const loginBtn = document.getElementById('loginBtn');
    if (this.value.toLowerCase() === 'yi') {
        loginBtn.textContent = '管理员登录';
        loginBtn.classList.add('admin-btn');
    } else {
        loginBtn.textContent = '登录';
        loginBtn.classList.remove('admin-btn');
    }
});

function showAgreement(type) {
    const popup = document.getElementById('agreementPopup');
    popup.textContent = `正在加载${type}...`;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}

function showForgotPasswordMessage() {
    const popup = document.getElementById('agreementPopup');
    popup.textContent = '功能开发中，敬请期待';
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}

function showRegisterMessage() {
    const popup = document.getElementById('agreementPopup');
    popup.textContent = '注册功能开发中，请联系管理员';
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 1500);
}

function socialLogin(platform) {
    const popup = document.getElementById('agreementPopup');
    popup.textContent = `正在通过${platform}登录...`;
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
        document.getElementById('message').textContent = `${platform}登录功能暂未开放`;
        document.getElementById('message').style.color = '#e74c3c';
    }, 1500);
}

function login() {
    const username = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const agree = document.getElementById('agree').checked;
    const message = document.getElementById('message');

    if (!username || !password) {
        message.textContent = '请输入用户名/手机号/邮箱和密码';
        message.style.color = '#e74c3c';
        return;
    }

    if (!agree) {
        message.textContent = '请阅读并同意相关协议';
        message.style.color = '#e74c3c';
        return;
    }

    // 模拟网络请求
    setTimeout(() => {
        const user = users.find(u =>
            (u.username === username || u.phone === username || u.email === username) &&
            (u.password === password)
        );

        if (user) {
            // 保存当前登录用户信息
            localStorage.setItem('currentUser', JSON.stringify(user));

            message.textContent = '登录成功，正在跳转...';
            message.style.color = '#2ecc71';

            // 特殊处理管理员账户
            if (username.toLowerCase() === "yi" && password === "123456789") {
                setTimeout(() => {
                    location.href = './html/user.html';
                }, 1000);
            } else {
                setTimeout(() => {
                    //alert(`登录成功！欢迎${user.username || user.phone}`);
                    location.href = './html/home_page.html';
                }, 1000);
            }
        } else {
            message.textContent = '账号或密码错误';
            message.style.color = '#e74c3c';
        }
    }, 800);
}

// 添加回车键登录功能
document.getElementById('password').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        login();
    }
});

// 初始化页面时检查是否有管理员账户提示
window.addEventListener('DOMContentLoaded', function () {
    const phoneField = document.getElementById('phone');
    if (phoneField.value.toLowerCase() === 'yi') {
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.textContent = '管理员登录';
        loginBtn.classList.add('admin-btn');
    }
});