// 获取DOM元素
const backBtn = document.getElementById('backBtn');
const logoutBtn = document.getElementById('logoutBtn');
const customModal = document.getElementById('customModal');
const cancelBtn = document.getElementById('cancelBtn');
const confirmBtn = document.getElementById('confirmBtn');
const appLogo = document.getElementById('appLogo');

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 返回按钮点击事件
backBtn.addEventListener('click', function () {
    // 模拟返回操作
    console.log('返回上一页');
    document.body.classList.add('animate-out');
    setTimeout(() => {
        alert('在实际应用中，这里会返回上一页');
    }, 300);
});

// 列表项点击效果
document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', function () {
        this.style.backgroundColor = 'rgba(254, 230, 32, 0.1)';
        setTimeout(() => {
            this.style.backgroundColor = '';
        }, 200);

        // 在实际应用中这里会有导航到对应页面的逻辑
        const itemName = this.querySelector('span').textContent;
        console.log(`点击了: ${itemName}`);
    });
});

// 注销按钮点击事件 - 显示自定义确认框
logoutBtn.addEventListener('click', function () {
    this.style.backgroundColor = 'rgba(255, 77, 79, 0.1)';
    setTimeout(() => {
        this.style.backgroundColor = '';
    }, 200);

    // 显示自定义确认框
    customModal.classList.add('active');
});

// 取消按钮事件
cancelBtn.addEventListener('click', function () {
    customModal.classList.remove('active');
});

// 确定按钮事件
confirmBtn.addEventListener('click', function () {
    customModal.classList.remove('active');
    console.log('执行注销操作...');
    // 在实际应用中这里会执行注销逻辑
    setTimeout(() => {
        alert('账户已成功注销');
    }, 300);
});

// 点击模态框背景关闭
customModal.addEventListener('click', function (e) {
    if (e.target === customModal) {
        customModal.classList.remove('active');
    }
});

// 检查logo是否加载失败
appLogo.onerror = function () {
    document.getElementById('logoFallback').style.display = 'flex';
    console.log('Logo加载失败，显示备用图标');
};