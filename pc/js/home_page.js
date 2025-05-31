// 设置当前日期
const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
document.getElementById('currentDate').textContent = now.toLocaleDateString('zh-CN', options);

// 获取DOM元素
const caloriesCard = document.getElementById('caloriesCard');
const inputPanel = document.getElementById('inputPanel');
const editPanel = document.getElementById('editPanel');
const overlay = document.getElementById('overlay');
const closePanel = document.getElementById('closePanel');
const closeEditPanel = document.getElementById('closeEditPanel');
const saveButton = document.getElementById('saveData');
const saveEditButton = document.getElementById('saveEditData');
const caloriesValue = document.getElementById('caloriesValue');
const changeValue = document.getElementById('changeValue');
const caloriesInput = document.getElementById('caloriesInput');
const changeInput = document.getElementById('changeInput');
const sleepCard = document.getElementById('sleepCard');
const heartCard = document.getElementById('heartCard');
const stepsCard = document.getElementById('stepsCard');
const stepsValue = document.getElementById('stepsValue');
const stepsInput = document.getElementById('stepsInput');
const stepsDecrease = document.getElementById('stepsDecrease');
const stepsIncrease = document.getElementById('stepsIncrease');
const moderateCard = document.getElementById('moderateCard');
const moderateValue = document.getElementById('moderateValue');
const moderateInput = document.getElementById('moderateInput');
const moderateDecrease = document.getElementById('moderateDecrease');
const moderateIncrease = document.getElementById('moderateIncrease');
const moderateStatus = document.getElementById('moderateStatus');
const standCard = document.getElementById('standCard');
const standValue = document.getElementById('standValue');
const standInput = document.getElementById('standInput');
const standDecrease = document.getElementById('standDecrease');
const standIncrease = document.getElementById('standIncrease');
const standChange = document.getElementById('standChange');

// 获取新添加的健康指标面板元素
const bloodPressurePanel = document.getElementById('bloodPressurePanel');
const bloodOxygenPanel = document.getElementById('bloodOxygenPanel');
const weightPanel = document.getElementById('weightPanel');
const bmiPanel = document.getElementById('bmiPanel');
const closeBloodPressure = document.getElementById('closeBloodPressure');
const closeBloodOxygen = document.getElementById('closeBloodOxygen');
const closeWeight = document.getElementById('closeWeight');
const closeBmi = document.getElementById('closeBmi');
const saveBloodPressure = document.getElementById('saveBloodPressure');
const saveBloodOxygen = document.getElementById('saveBloodOxygen');
const saveWeight = document.getElementById('saveWeight');
const saveBmi = document.getElementById('saveBmi');
const cancelBloodPressure = document.getElementById('cancelBloodPressure');
const cancelBloodOxygen = document.getElementById('cancelBloodOxygen');
const cancelWeight = document.getElementById('cancelWeight');
const cancelBmi = document.getElementById('cancelBmi');
const bloodPressureCard = document.getElementById('bloodPressureCard');
const bloodOxygenCard = document.getElementById('bloodOxygenCard');
const weightCard = document.getElementById('weightCard');
const bmiCard = document.getElementById('bmiCard');
const bloodPressureValue = document.getElementById('bloodPressureValue');
const bloodOxygenValue = document.getElementById('bloodOxygenValue');
const weightValue = document.getElementById('weightValue');
const bmiValueElement = document.getElementById('bmiValue');
const heightInput = document.getElementById('heightInput');
const bmiWeightInput = document.getElementById('bmiWeightInput');
const bmiOutput = document.getElementById('bmiValue');

// 新增用户信息编辑面板元素
const userNamePanel = document.getElementById('userNamePanel');
const avatarPanel = document.getElementById('avatarPanel');
const closeUserName = document.getElementById('closeUserName');
const closeAvatar = document.getElementById('closeAvatar');
const saveUserName = document.getElementById('saveUserName');
const saveAvatar = document.getElementById('saveAvatar');
const userNameInput = document.getElementById('userNameInput');
const avatarUpload = document.getElementById('avatarUpload');
const avatarUploadBtn = document.getElementById('avatarUploadBtn');
const avatarPreview = document.getElementById('avatarPreview');
const userNameElement = document.querySelector('.user-name');
const userAvatarElement = document.querySelector('.user-avatar');

// 创建睡眠编辑面板
const sleepEditPanel = document.createElement('div');
sleepEditPanel.id = 'sleepEditPanel';
sleepEditPanel.className = 'input-panel';
sleepEditPanel.innerHTML = `
     <div class="panel-header">
         <div class="panel-title">编辑睡眠数据</div>
         <button class="close-panel">&times;</button>
     </div>
     <div class="input-group">
         <label class="input-label">睡眠时长 (小时:分钟)</label>
         <input type="text" class="input-field" id="sleepDurationInput" placeholder="如: 7:22">
     </div>
     <div class="input-group">
         <label class="input-label">睡眠质量</label>
         <select class="input-field" id="sleepQualityInput">
             <option value="优">优</option>
             <option value="良">良</option>
             <option value="一般" selected>一般</option>
             <option value="差">差</option>
         </select>
     </div>
     <div class="input-group">
         <label class="input-label">睡眠时间段</label>
         <input type="text" class="input-field" id="sleepTimeRangeInput" placeholder="如: 22:45-06:07">
     </div>
     <button class="panel-button" id="saveSleepData">保存数据</button>
 `;
document.body.appendChild(sleepEditPanel);

// 创建心率编辑面板
const heartEditPanel = document.createElement('div');
heartEditPanel.id = 'heartEditPanel';
heartEditPanel.className = 'input-panel';
heartEditPanel.innerHTML = `
     <div class="panel-header">
         <div class="panel-title">编辑心率数据</div>
         <button class="close-panel">&times;</button>
     </div>
     <div class="input-group">
         <label class="input-label">当前心率 (次/分)</label>
         <input type="number" class="input-field" id="heartRateInput" placeholder="输入心率值">
     </div>
     <div class="input-group">
         <label class="input-label">静息心率 (次/分)</label>
         <input type="number" class="input-field" id="restingRateInput" placeholder="输入静息心率">
     </div>
     <div class="input-group">
         <label class="input-label">最高心率 (次/分)</label>
         <input type="number" class="input-field" id="maxRateInput" placeholder="输入最高心率">
     </div>
     <button class="panel-button" id="saveHeartData">保存数据</button>
 `;
document.body.appendChild(heartEditPanel);

// 显示睡眠编辑面板
sleepCard.addEventListener('click', () => {
    sleepEditPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前值
    document.getElementById('sleepDurationInput').value =
        document.querySelector('#sleepCard .metric-value').textContent;

    const qualityElement = document.querySelector('#sleepCard .quality-indicator span:last-child');
    document.getElementById('sleepQualityInput').value = qualityElement.textContent;

    const timeSpans = document.querySelectorAll('#sleepCard .time-range span');
    document.getElementById('sleepTimeRangeInput').value =
        `${timeSpans[0].textContent}-${timeSpans[2].textContent}`;
});

// 显示心率编辑面板
heartCard.addEventListener('click', () => {
    heartEditPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前值
    document.getElementById('heartRateInput').value =
        document.querySelector('.heart-rate-value').textContent;

    document.getElementById('restingRateInput').value =
        document.getElementById('restingHeartRate').textContent;

    document.getElementById('maxRateInput').value =
        document.getElementById('maxHeartRate').textContent;
});

// 关闭所有面板的通用函数
function closeAllPanels() {
    inputPanel.classList.remove('active');
    editPanel.classList.remove('active');
    sleepEditPanel.classList.remove('active');
    heartEditPanel.classList.remove('active');
    bloodPressurePanel.classList.remove('active');
    bloodOxygenPanel.classList.remove('active');
    weightPanel.classList.remove('active');
    bmiPanel.classList.remove('active');
    userNamePanel.classList.remove('active');
    avatarPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 睡眠数据保存
document.getElementById('saveSleepData').addEventListener('click', () => {
    const duration = document.getElementById('sleepDurationInput').value;
    const quality = document.getElementById('sleepQualityInput').value;
    const timeRange = document.getElementById('sleepTimeRangeInput').value;

    if (!duration || !quality || !timeRange) {
        alert('请填写完整的睡眠数据');
        return;
    }

    // 更新睡眠时长
    document.querySelector('#sleepCard .metric-value').textContent = duration;

    // 更新睡眠质量
    const qualityElement = document.querySelector('#sleepCard .quality-indicator span:last-child');
    qualityElement.textContent = quality;

    // 更新睡眠质量标签颜色
    qualityElement.className = '';
    if (quality === '优') {
        qualityElement.classList.add('quality-good');
    } else if (quality === '差') {
        qualityElement.classList.add('quality-warning');
    } else {
        qualityElement.classList.add('quality-average');
    }

    // 更新睡眠时间段
    const times = timeRange.split('-');
    if (times.length === 2) {
        const timeSpans = document.querySelectorAll('#sleepCard .time-range span');
        timeSpans[0].textContent = times[0];
        timeSpans[2].textContent = times[1];
    }

    // 关闭面板
    closeAllPanels();
    showSuccessFeedback(sleepCard);
});

// 心率数据保存
document.getElementById('saveHeartData').addEventListener('click', () => {
    const heartRate = document.getElementById('heartRateInput').value;
    const restingRate = document.getElementById('restingRateInput').value;
    const maxRate = document.getElementById('maxRateInput').value;

    if (!heartRate || !restingRate || !maxRate) {
        alert('请填写完整的心率数据');
        return;
    }

    // 更新显示
    document.querySelector('.heart-rate-value').textContent = heartRate;
    document.getElementById('restingHeartRate').textContent = restingRate;
    document.getElementById('maxHeartRate').textContent = maxRate;

    // 关闭面板
    closeAllPanels();
    showSuccessFeedback(heartCard);
});

// 显示成功反馈的通用函数
function showSuccessFeedback(card) {
    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        card.classList.add('pulse');
        setTimeout(() => card.classList.remove('pulse'), 1000);
    }, 800);
}

// 为睡眠和心率面板添加关闭按钮事件
document.querySelectorAll('#sleepEditPanel .close-panel, #heartEditPanel .close-panel').forEach(btn => {
    btn.addEventListener('click', closeAllPanels);
});

// 显示卡路里输入面板
caloriesCard.addEventListener('click', () => {
    inputPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前值
    caloriesInput.value = caloriesValue.textContent;
    changeInput.value = changeValue.textContent.replace(/[+%]/g, '');
});

// 显示编辑面板
[stepsCard, moderateCard, standCard].forEach(card => {
    card.addEventListener('click', () => {
        editPanel.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// 关闭输入面板
function closeInputPanel() {
    inputPanel.classList.remove('active');
    editPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

closePanel.addEventListener('click', closeInputPanel);
closeEditPanel.addEventListener('click', closeInputPanel);
overlay.addEventListener('click', closeInputPanel);

// 保存卡路里数据
saveButton.addEventListener('click', () => {
    const calories = caloriesInput.value;
    const change = changeInput.value;

    if (!calories || !change) {
        alert('请输入完整的卡路里数据和变化百分比');
        return;
    }

    // 更新显示
    caloriesValue.textContent = calories;
    changeValue.textContent = change.startsWith('-') ? `${change}%` : `+${change}%`;

    // 关闭面板
    closeInputPanel();
    showSuccessFeedback(caloriesCard);
});

// 步数控制
stepsDecrease.addEventListener('click', () => {
    let value = parseInt(stepsInput.value) || 0;
    stepsInput.value = Math.max(0, value - 500);
});

stepsIncrease.addEventListener('click', () => {
    let value = parseInt(stepsInput.value) || 0;
    stepsInput.value = value + 500;
});

// 中高强度控制
moderateDecrease.addEventListener('click', () => {
    let value = parseInt(moderateInput.value) || 0;
    moderateInput.value = Math.max(0, value - 5);
});

moderateIncrease.addEventListener('click', () => {
    let value = parseInt(moderateInput.value) || 0;
    moderateInput.value = value + 5;
});

// 站立活动控制
standDecrease.addEventListener('click', () => {
    let value = parseInt(standInput.value) || 0;
    standInput.value = Math.max(0, value - 1);
});

standIncrease.addEventListener('click', () => {
    let value = parseInt(standInput.value) || 0;
    standInput.value = value + 1;
});

// 保存所有编辑数据
saveEditButton.addEventListener('click', () => {
    // 更新步数
    const newSteps = stepsInput.value;
    if (newSteps) {
        stepsValue.textContent = newSteps;

        // 计算百分比变化
        const targetSteps = 10000;
        const percentage = Math.round((parseInt(newSteps) / targetSteps) * 100);
        document.getElementById('stepsChange').textContent = `${percentage}%`;
    }

    // 更新中高强度
    const newModerate = moderateInput.value;
    if (newModerate) {
        moderateValue.textContent = newModerate;

        // 更新达成状态
        const targetModerate = 30;
        if (parseInt(newModerate) >= targetModerate) {
            moderateStatus.textContent = "已达成";
            moderateStatus.previousElementSibling.className = "fas fa-check-circle trend-down";
            moderateStatus.previousElementSibling.style.color = "#2ecc71";
        } else {
            moderateStatus.textContent = "未达成";
            moderateStatus.previousElementSibling.className = "fas fa-times-circle trend-down";
            moderateStatus.previousElementSibling.style.color = "#e74c3c";
        }
    }

    // 更新站立活动
    const newStand = standInput.value;
    if (newStand) {
        standValue.textContent = newStand;

        // 计算变化次数
        const prevStand = 12; // 假设前一天是12次
        const diff = parseInt(newStand) - prevStand;
        standChange.textContent = diff >= 0 ? `+${diff}次` : `${diff}次`;
    }

    // 关闭面板
    closeInputPanel();

    // 显示成功提示
    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';

        // 添加视觉反馈
        [stepsCard, moderateCard, standCard].forEach(card => {
            card.classList.add('pulse');
            setTimeout(() => card.classList.remove('pulse'), 1000);
        });
    }, 800);
});

// 添加心电图动画
function animateHeartRate() {
    const path = document.querySelector('.heart-rate-line path');
    const length = path.getTotalLength();

    // 清除之前的动画
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;

    // 动画设置
    path.getBoundingClientRect();
    path.style.transition = path.style.WebkitTransition = 'none';
    path.style.strokeDashoffset = '0';
    path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 8s linear';

    // 循环动画
    setTimeout(() => {
        path.style.strokeDashoffset = length;
        setTimeout(animateHeartRate, 100);
    }, 8000);
}

// 初始数据加载
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        // 启动心电图动画
        setTimeout(animateHeartRate, 500);
    }, 1500);
});

// 添加底部导航交互
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');

        // 模拟导航切换时的加载
        document.getElementById('loader').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 800);
    });
});

// 健康指标面板交互

// 血压面板
bloodPressureCard.addEventListener('click', () => {
    bloodPressurePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前值
    const [systolic, diastolic] = bloodPressureValue.textContent.split('/');
    document.getElementById('systolicInput').value = systolic;
    document.getElementById('diastolicInput').value = diastolic;
});

// 血氧面板
bloodOxygenCard.addEventListener('click', () => {
    bloodOxygenPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前值
    document.getElementById('oxygenInput').value = bloodOxygenValue.textContent.replace('%', '');
});

// 体重面板
weightCard.addEventListener('click', () => {
    weightPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前值
    document.getElementById('weightInput').value = weightValue.textContent;
});

// BMI面板
bmiCard.addEventListener('click', () => {
    bmiPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前值
    document.getElementById('bmiWeightInput').value = weightValue.textContent;
    calculateBMI();
});

// 关闭按钮事件
closeBloodPressure.addEventListener('click', closeAllPanels);
closeBloodOxygen.addEventListener('click', closeAllPanels);
closeWeight.addEventListener('click', closeAllPanels);
closeBmi.addEventListener('click', closeAllPanels);

// 取消按钮事件
cancelBloodPressure.addEventListener('click', closeAllPanels);
cancelBloodOxygen.addEventListener('click', closeAllPanels);
cancelWeight.addEventListener('click', closeAllPanels);
cancelBmi.addEventListener('click', closeAllPanels);

// 保存按钮事件
saveBloodPressure.addEventListener('click', () => {
    const systolic = document.getElementById('systolicInput').value;
    const diastolic = document.getElementById('diastolicInput').value;

    if (!systolic || !diastolic) {
        alert('请填写完整的血压数据');
        return;
    }

    // 更新显示
    bloodPressureValue.textContent = `${systolic}/${diastolic}`;

    // 根据血压值设置颜色
    const systolicNum = parseInt(systolic);
    if (systolicNum < 120) {
        bloodPressureValue.className = "status-value status-good";
    } else if (systolicNum >= 120 && systolicNum <= 139) {
        bloodPressureValue.className = "status-value";
    } else {
        bloodPressureValue.className = "status-value";
        bloodPressureValue.style.color = "#e55039";
    }

    // 关闭面板
    closeAllPanels();
    showSuccessFeedback(bloodPressureCard);
});

saveBloodOxygen.addEventListener('click', () => {
    const oxygen = document.getElementById('oxygenInput').value;

    if (!oxygen) {
        alert('请填写血氧数据');
        return;
    }

    // 更新显示
    bloodOxygenValue.textContent = `${oxygen}%`;

    // 根据血氧值设置颜色
    const oxygenNum = parseInt(oxygen);
    if (oxygenNum >= 95) {
        bloodOxygenValue.className = "status-value status-good";
    } else if (oxygenNum >= 90 && oxygenNum < 95) {
        bloodOxygenValue.className = "status-value";
    } else {
        bloodOxygenValue.className = "status-value";
        bloodOxygenValue.style.color = "#e55039";
    }

    // 关闭面板
    closeAllPanels();
    showSuccessFeedback(bloodOxygenCard);
});

saveWeight.addEventListener('click', () => {
    const weight = document.getElementById('weightInput').value;

    if (!weight) {
        alert('请填写体重数据');
        return;
    }

    // 更新显示
    weightValue.textContent = weight;

    // 关闭面板
    closeAllPanels();
    showSuccessFeedback(weightCard);
});

saveBmi.addEventListener('click', () => {
    const bmi = document.getElementById('bmiValue').value;

    if (!bmi) {
        alert('请计算BMI值');
        return;
    }

    // 更新显示
    bmiValueElement.textContent = bmi;

    // 根据BMI值设置颜色
    const bmiNum = parseFloat(bmi);
    if (bmiNum >= 18.5 && bmiNum <= 24.9) {
        bmiValueElement.className = "status-value status-good";
    } else {
        bmiValueElement.className = "status-value";
        bmiValueElement.style.color = "#e55039";
    }

    // 关闭面板
    closeAllPanels();
    showSuccessFeedback(bmiCard);
});

// BMI计算函数
function calculateBMI() {
    const height = parseFloat(heightInput.value) / 100; // 转换为米
    const weight = parseFloat(bmiWeightInput.value);

    if (height && weight) {
        const bmi = (weight / (height * height)).toFixed(1);
        bmiOutput.value = bmi;
    }
}

// 监听身高和体重变化
heightInput.addEventListener('input', calculateBMI);
bmiWeightInput.addEventListener('input', calculateBMI);

// 新增用户信息编辑功能

// 显示用户名编辑面板
userNameElement.addEventListener('click', () => {
    userNamePanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 填充当前用户名
    userNameInput.value = userNameElement.textContent;
});

// 显示头像编辑面板
userAvatarElement.addEventListener('click', () => {
    avatarPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 如果有头像，显示在预览中
    if (userAvatarElement.style.backgroundImage) {
        avatarPreview.style.backgroundImage = userAvatarElement.style.backgroundImage;
        avatarPreview.innerHTML = '';
    } else {
        avatarPreview.style.backgroundImage = '';
        avatarPreview.innerHTML = '<i class="fas fa-user"></i>';
    }
});

// 关闭用户信息面板
closeUserName.addEventListener('click', closeAllPanels);
closeAvatar.addEventListener('click', closeAllPanels);

// 保存用户名
saveUserName.addEventListener('click', () => {
    const newName = userNameInput.value.trim();
    if (newName) {
        userNameElement.textContent = newName;
        closeAllPanels();
        showSuccessFeedback(userNameElement);
    } else {
        alert('请输入用户名');
    }
});

// 头像上传功能
avatarUploadBtn.addEventListener('click', () => {
    avatarUpload.click();
});

avatarUpload.addEventListener('change', function (e) {
    if (this.files && this.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // 显示预览
            avatarPreview.style.backgroundImage = `url(${e.target.result})`;
            avatarPreview.innerHTML = '';
        }

        reader.readAsDataURL(this.files[0]);
    }
});

// 保存头像
saveAvatar.addEventListener('click', () => {
    if (avatarPreview.style.backgroundImage) {
        // 设置头像
        userAvatarElement.style.backgroundImage = avatarPreview.style.backgroundImage;
        userAvatarElement.innerHTML = '';

        // 保存到本地存储
        localStorage.setItem('userAvatar', avatarPreview.style.backgroundImage);

        closeAllPanels();
        showSuccessFeedback(userAvatarElement);
    } else {
        alert('请上传头像图片');
    }
});

// 检查本地存储中是否有保存的头像
window.addEventListener('load', () => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        userAvatarElement.style.backgroundImage = savedAvatar;
        userAvatarElement.innerHTML = '';
    }
});