// poem
var words = [
    "佳人绝世独立",
    "惊鸿身姿婀娜",
    "明月映美娇容",
    "彩云伴伊归途",
    "归去同隐欢娱",
    "画船卧听雨情",
    "愿化江水长伴",
    "盼与君早相逢",
    "一日不见心焦",
    "相思情浓若狂",
    "夏日情思难忘",
    "桌前偷望倩影",
    "暗许芳心于伊",
    "佳人点亮心空",
    "柳絮飘似情绵",
    "南风可解情愁",
    "青山妒伊美貌",
    "花丛懒顾情专",
    "修道缘君情坚",
    "三笑倾慕成痴",
    "初见情定此生",
    "余光皆为卿留",
    "情痴无关风月",
    "因君心向此世",
    "春蚕情丝无尽",
    "蜡炬泪为情燃",
    "今夜良辰有梦",
    "逢此佳人倾心",
    "愿如星月同辉",
    "夜夜情暖光柔",
    "情起不知何由",
    "情深一往无悔",
    "骰子红豆寄情",
    "相思入骨难消",
    "春月照离人愁",
    "落花伴君幽思",
    "若逢知音情长",
    "愿唱阳春表意",
    "半纸情重千斤",
    "离愁万斛能担",
    "夜月幽梦情牵",
    "和光同尘韵雅",
    "杳霭流玉映美",
    "月落星沉念伊",
    "霞姿月韵天成",
    "喜上眉梢缘君",
    "醉卧星梦情迷",
    "落花独立思君",
    "微雨双燕情翩",
    "掬水映月情柔",
    "弄花衣香情醉",
    "夜梦少年情事",
    "唯梦君影难眠",
    "垆边月貌倾国",
    "皓腕似雪欺霜",
    "众里嫣然情动",
    "尘世颜色难及",
    "仿若仙山初见",
    "瑶台月下逢仙",
    "沉鱼落雁羞花",
    "闭月愁颤情牵",
    "春风解恨因君",
    "亭北倚阑盼归"
];
function randomNum(min, max) {
    var num = (Math.random() * (max - min + 1) + min).toFixed(2);
    return num;
}
function init() {
    let container = document.querySelector('.container');
    let f = document.createDocumentFragment();
    words.forEach(w => {
        let word_box = document.createElement('div');
        let word = document.createElement('div');
        word.innerText = w;
        word.classList.add('word');
        word.style.color = '#BAABDA';
        word.style.fontFamily = '楷体';
        word.style.fontSize = '20px'
        word_box.classList.add('word-box');
        word_box.style.setProperty("--margin-top", randomNum(-40, 20) + 'vh');
        word_box.style.setProperty("--margin-left", randomNum(6, 35) + 'vw');
        word_box.style.setProperty("--animation-duration", randomNum(8, 20) + 's');
        word_box.style.setProperty("--animation-delay", randomNum(-20, 0) + 's');

        word_box.appendChild(word);
        f.appendChild(word_box);


    })
    container.appendChild(f);
}
window.addEventListener('load', init);
let textone = document.querySelector('.textone').querySelector('h1');
let texttwo = document.querySelector('.texttwo').querySelector('h1');
let textthree = document.querySelector('.textthree').querySelector('h1');

setTimeout(function () {
    textone.innerHTML = '整片星空将为你一人闪烁';
    textone.style.color = '#E8F9FD';
    textone.style.fontFamily = '楷体'
    texttwo.style.color = '#E8F9FD';
    texttwo.style.fontFamily = '楷体'
    textthree.style.color = '#E8F9FD';
    textthree.style.fontFamily = '楷体'
    texttwo.innerHTML = '';
}, 28000)
setTimeout(function () {
    textone.innerHTML = '愿你的生活常温暖，日子总是温柔又闪光';
    texttwo.innerHTML = '所有的美好都能如期而至';
    textthree.innerHTML = '所有的幸运都与你紧紧相拥';
}, 38500)



