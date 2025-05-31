// 元素引用
const vipBtn = document.getElementById('vipBtn');
const svipBtn = document.getElementById('svipBtn');
const monthPrice = document.getElementById('monthPrice');
const quarterPrice = document.getElementById('quarterPrice');
const yearPrice = document.getElementById('yearPrice');
const memberTypes = document.querySelectorAll('.member-type');

const customAlert = document.getElementById('customAlert');
const alertContent = document.getElementById('alertContent');
const closeAlert = document.getElementById('closeAlert');

const editModal = document.getElementById('editModal');
const closeModal = document.getElementById('closeModal');
const saveBtn = document.getElementById('saveChanges');

const benefitsModal = document.getElementById('benefitsModal');
const closeBenefitsModal = document.getElementById('closeBenefitsModal');
const saveBenefits = document.getElementById('saveBenefits');

// 价格数据
const prices = {
    vip: {
        month: 9.9,
        quarter: 27,
        year: 108
    },
    svip: {
        month: 19.9,
        quarter: 57,
        year: 228
    }
};

// 会员名称
const memberNames = {
    vip: "VIP",
    svip: "SVIP"
};

// 初始状态
let currentType = 'vip';

// 切换会员类型
function setMembershipType(type) {
    currentType = type;

    // 更新价格
    monthPrice.textContent = prices[type].month;
    quarterPrice.textContent = prices[type].quarter;
    yearPrice.textContent = prices[type].year;

    // 更新会员类型名称
    memberTypes.forEach(el => {
        el.textContent = memberNames[type];
    });

    // 更新按钮状态
    if (type === 'vip') {
        vipBtn.classList.add('active');
        svipBtn.classList.remove('active');
    } else {
        svipBtn.classList.add('active');
        vipBtn.classList.remove('active');
    }
}

// 显示自定义提示框
function showAlert(message) {
    alertContent.innerHTML = message;
    customAlert.style.display = 'block';

    // 3秒后自动关闭
    setTimeout(() => {
        customAlert.style.display = 'none';
    }, 3000);
}

// 关闭提示框
closeAlert.addEventListener('click', () => {
    customAlert.style.display = 'none';
});

// 打开编辑模态框
document.getElementById('mainTitle').addEventListener('click', () => {
    // 填充当前值
    document.getElementById('editTitle').value = document.getElementById('mainTitle').textContent;
    document.getElementById('editSubtitle').value = document.getElementById('subTitle').textContent;
    document.getElementById('editVipName').value = memberNames.vip;
    document.getElementById('editSvipName').value = memberNames.svip;
    document.getElementById('editCardType1').value = document.getElementById('cardType1').textContent;
    document.getElementById('editVipPrice1').value = prices.vip.month;
    document.getElementById('editSvipPrice1').value = prices.svip.month;
    document.getElementById('editPeriod1').value = document.getElementById('period1').textContent;
    document.getElementById('editCardType2').value = document.getElementById('cardType2').textContent;
    document.getElementById('editVipPrice2').value = prices.vip.quarter;
    document.getElementById('editSvipPrice2').value = prices.svip.quarter;
    document.getElementById('editPeriod2').value = document.getElementById('period2').textContent;
    document.getElementById('editCardType3').value = document.getElementById('cardType3').textContent;
    document.getElementById('editVipPrice3').value = prices.vip.year;
    document.getElementById('editSvipPrice3').value = prices.svip.year;
    document.getElementById('editPeriod3').value = document.getElementById('period3').textContent;
    document.getElementById('editPopularTag').value = document.getElementById('popularTag').textContent;

    // 获取所有服务项目
    const featuresItems = document.querySelectorAll('#features1 li, #features2 li, #features3 li');
    let featuresText = '';
    featuresItems.forEach(item => {
        featuresText += item.textContent.trim() + '\n';
    });
    document.getElementById('editFeatures').value = featuresText;

    // 显示模态框
    editModal.classList.add('active');
});

// 打开权益介绍编辑模态框
document.getElementById('benefitsTitle').addEventListener('click', () => {
    document.getElementById('editBenefitsTitle').value = document.getElementById('benefitsTitle').textContent;

    // 获取权益介绍内容
    const benefitsContent = document.getElementById('benefitsContent').innerHTML;
    document.getElementById('editBenefitsContent').value = benefitsContent
        .replace(/<span class="highlight">/g, '')
        .replace(/<\/span>/g, '')
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<br>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();

    benefitsModal.classList.add('active');
});

// 关闭编辑模态框
closeModal.addEventListener('click', () => {
    editModal.classList.remove('active');
});

// 关闭权益介绍模态框
closeBenefitsModal.addEventListener('click', () => {
    benefitsModal.classList.remove('active');
});

// 保存更改
saveBtn.addEventListener('click', () => {
    // 更新内容
    document.getElementById('mainTitle').textContent = document.getElementById('editTitle').value;
    document.getElementById('subTitle').textContent = document.getElementById('editSubtitle').value;

    // 更新会员名称
    memberNames.vip = document.getElementById('editVipName').value;
    memberNames.svip = document.getElementById('editSvipName').value;

    document.getElementById('cardType1').textContent = document.getElementById('editCardType1').value;
    prices.vip.month = parseFloat(document.getElementById('editVipPrice1').value);
    prices.svip.month = parseFloat(document.getElementById('editSvipPrice1').value);
    document.getElementById('period1').textContent = document.getElementById('editPeriod1').value;

    document.getElementById('cardType2').textContent = document.getElementById('editCardType2').value;
    prices.vip.quarter = parseFloat(document.getElementById('editVipPrice2').value);
    prices.svip.quarter = parseFloat(document.getElementById('editSvipPrice2').value);
    document.getElementById('period2').textContent = document.getElementById('editPeriod2').value;

    document.getElementById('cardType3').textContent = document.getElementById('editCardType3').value;
    prices.vip.year = parseFloat(document.getElementById('editVipPrice3').value);
    prices.svip.year = parseFloat(document.getElementById('editSvipPrice3').value);
    document.getElementById('period3').textContent = document.getElementById('editPeriod3').value;

    document.getElementById('popularTag').textContent = document.getElementById('editPopularTag').value;

    // 更新价格显示
    setMembershipType(currentType);

    // 更新服务项目
    const featuresText = document.getElementById('editFeatures').value;
    const featuresArray = featuresText.split('\n').filter(item => item.trim() !== '');

    // 清空现有服务项目
    document.querySelectorAll('.features li').forEach(li => li.remove());

    // 添加新的服务项目
    const features1 = document.getElementById('features1');
    const features2 = document.getElementById('features2');
    const features3 = document.getElementById('features3');

    featuresArray.forEach((feature, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle"></i> ${feature}`;

        if (index < 3) {
            features1.appendChild(li);
        } else if (index < 7) {
            features2.appendChild(li);
        } else {
            features3.appendChild(li);
        }
    });

    // 关闭模态框
    editModal.classList.remove('active');

    // 显示提示
    showAlert('会员信息已成功更新！');
});

// 保存权益介绍更改
saveBenefits.addEventListener('click', () => {
    document.getElementById('benefitsTitle').textContent = document.getElementById('editBenefitsTitle').value;

    // 简单处理高亮文本
    let content = document.getElementById('editBenefitsContent').value;
    content = content
        .replace(/千节会员课/g, '<span class="highlight">千节会员课</span>')
        .replace(/专属私教课程/g, '<span class="highlight">专属私教课程</span>')
        .replace(/个性化训练计划/g, '<span class="highlight">个性化训练计划</span>')
        .replace(/营养师定制食谱/g, '<span class="highlight">营养师定制食谱</span>')
        .replace(/线下活动优先参与权/g, '<span class="highlight">线下活动优先参与权</span>')
        .replace(/健身装备礼包/g, '<span class="highlight">健身装备礼包</span>');

    document.getElementById('benefitsContent').innerHTML = content;

    benefitsModal.classList.remove('active');
    showAlert('会员权益介绍已成功更新！');
});

// 初始化页面
setMembershipType('vip');

// 事件监听
vipBtn.addEventListener('click', () => setMembershipType('vip'));
svipBtn.addEventListener('click', () => setMembershipType('svip'));

// 按钮点击效果
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const card = this.closest('.card');
        const cardType = card.querySelector('.card-type').textContent;
        const memberType = card.querySelector('.member-type').textContent;

        // 显示自定义提示
        showAlert(`您已成功开通${memberType}${cardType}！`);

        // 按钮动画效果
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 处理中...';
        this.disabled = true;

        // 模拟请求
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> 开通成功！';
            this.style.background = '#4CAF50';
            this.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';

            // 恢复按钮状态
            setTimeout(() => {
                this.innerHTML = '立即开通';
                this.disabled = false;
                this.style.background = 'rgb(254, 230, 32)';
                this.style.boxShadow = '0 4px 15px rgba(254, 230, 32, 0.3)';
            }, 2000);
        }, 1500);
    });
});

// 点击模态框外部关闭
window.addEventListener('click', (e) => {
    if (e.target === editModal) {
        editModal.classList.remove('active');
    }
    if (e.target === benefitsModal) {
        benefitsModal.classList.remove('active');
    }
});