
const [ $btn, $lightning, $lightningButton, $logs ] = [
    document.getElementById('btn-kick'), 
    document.querySelector('.lightning'), 
    document.querySelector('.lightning-button'),
    document.getElementById('logs'),
]

const character = {
    name: 'Pikachu',
    hp: {
        current: 100,
        total: 100,
    },
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,    
}

const enemy = {
    name: 'Charmander',
    hp: {
        current: 600,
        total: 600,
    },
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
}

$btn.addEventListener('click', function () {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
})

$lightningButton.addEventListener('click', function () {
    if ($lightningButton.classList.contains('disabled')) {
        return
    };
    $lightning.classList.add('strike');
    enemy.changeHP(random(50));
    setTimeout(function() {
        $lightning.classList.remove('strike')
    }, 400);
})

function init() {
    character.renderHP();
    enemy.renderHP();
    console.log('Start game!');
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}

function renderHPLife() {
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
}

function renderProgressbarHP() {
    this.elProgressbar.style.width = this.hp.current / this.hp.total * 100 + '%';
}

function changeHP(count) {
    this.hp.current -= count;

    const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy);
    addLog(log);
    if (this.hp.current <= 0) {
        this.hp.current = 0;
        addLog('Бедный ' + this.name + ' проиграл бой!');
        $btn.disabled = true;
        $lightningButton.classList.add('disabled');
    }

    this.renderHP();
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function addLog(message) {
    if (typeof message != 'string') {
        console.log('Log message should be a "string"!')
    } else {
        const logMessageItem = document.createElement('li');
        logMessageItem.classList.add('log-message');
        logMessageItem.textContent = message;
        $logs.appendChild(logMessageItem);
    }    
}

function generateLog(firstPerson, secondPerson) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику, оставив ${firstPerson.hp.current}/${firstPerson.hp.total}`,
    ];


    const logMessage = logs[random(logs.length) - 1];
    return logMessage;
}

window.onload = () => {
    init();
}