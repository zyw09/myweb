// 图片预览功能
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
let uploadedImages = [];

imageInput.addEventListener('change', function () {
    const files = this.files;

    // 限制最多上传4张
    if (uploadedImages.length + files.length > 4) {
        showNotification('最多只能上传4张图片', 'error');
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // 检查文件类型
        if (!file.type.match('image.*')) {
            showNotification('请选择图片文件', 'error');
            continue;
        }

        // 检查文件大小 (最大2MB)
        if (file.size > 2 * 1024 * 1024) {
            showNotification('图片大小不能超过2MB', 'error');
            continue;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const img = document.createElement('div');
            img.className = 'preview-item';
            img.innerHTML = `
                <img src="${e.target.result}" alt="预览">
                <button class="remove-btn" onclick="removeImage(this)">×</button>
            `;
            imagePreview.appendChild(img);

            // 保存图片数据
            uploadedImages.push({
                element: img,
                file: file
            });
        };

        reader.readAsDataURL(file);
    }

    // 重置input，允许重复选择相同文件
    imageInput.value = '';
});

// 移除图片
function removeImage(btn) {
    const item = btn.parentElement;
    const index = Array.from(imagePreview.children).indexOf(item);

    if (index !== -1) {
        uploadedImages.splice(index, 1);
        item.remove();
    }
}

// 显示通知
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');

    text.textContent = message;

    // 设置通知样式
    if (type === 'error') {
        notification.style.background = 'rgba(220, 53, 69, 0.85)';
        notification.querySelector('i').className = 'fas fa-exclamation-circle';
    } else {
        notification.style.background = 'rgba(0, 0, 0, 0.7)';
        notification.querySelector('i').className = 'fas fa-check-circle';
    }

    notification.classList.add('show');

    // 3秒后隐藏
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 提交反馈
function submitFeedback() {
    const feedback = document.getElementById('feedback').value;

    // 验证反馈内容
    if (!feedback.trim()) {
        showNotification('反馈内容不能为空', 'error');
        return;
    }

    // 模拟提交成功
    showNotification('反馈提交成功！感谢您的宝贵意见');

    // 重置表单
    document.getElementById('feedbackForm').reset();
    imagePreview.innerHTML = '';
    uploadedImages = [];
}