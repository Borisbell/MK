const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');


const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    name: 'subzero',
    hp: 100,
    player: 1,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + 'Fight...')},  
    changeHP,
    elHP,
    renderHp,       
};


const player2 = {
    name: 'liukang',
    hp: 100,
    player: 2,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
    attack: function() {
        console.log(this.name + 'Fight...')},  
    changeHP,
    elHP,
    renderHp,      
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}


function createPlayer(playerObj) {
    const $player = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerObj.hp + '%';
    $name.innerText = playerObj.name;
    $img.src = playerObj.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;


}

function changeHP() {
    this.hp -= getRandom(20);
    if (this.hp <= 0) {
        this.hp = 0;
    }
    return this.hp;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHp() {
    this.elHP().style.width = this.hp + '%';
}

function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' Wins';
    } else {
        $winTitle.innerText = 'draw';
    }

    return $winTitle;
}

function getRandom(number) {
    return Math.ceil(Math.random() * number);
}

function reloadPage (btn) {
    btn.addEventListener('click', function () {
        window.location.reload();
    })
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    $arenas.appendChild($reloadWrap);

    const $reloadButton = createElement('button', 'button');
    $reloadWrap.appendChild($reloadButton);
    $reloadButton.innerText = 'Restart';
    
    
    reloadPage($reloadButton)
    return $reloadButton;

}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack(){
    const hit = ATTACK[getRandom(3)-1];
    const defence = ATTACK[getRandom(3)-1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};

    for(let item of $formFight) {
        if (item.checked && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence'){
            attack.value = getRandom(HIT[item.value]);
            attack.defence = item.value;
        }

        item.checked = false;
    }

    return attack;
}

function showResult(){
    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true;
        createReloadButton()
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWins());
        generateLogs('draw', player2, player1);
    }

}

function getTime(){
    const date = new Date();
    return `[${date.getHours()}:${date.getMinutes()}]`;
}

function generateLogs(type, player1, player2){
    let text;
    
    switch(type) {
        case 'start':
            text = logs['start'].replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break
        case 'end':
            text = logs['end'][getRandom(3)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            break
        case 'draw':
            text = logs['draw'];
            break
        case 'hit':
            text = `${getTime()}${logs['hit'][getRandom(17)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} -${playerAttack().value}[${player1.hp}/100]`;
            text = `${getTime()}${logs['hit'][getRandom(17)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name)} -${enemyAttack().value}[${player2.hp}/100]`;
            break
        case 'defence':
            text = getTime() + logs['defence'][getRandom(7)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
            break
    }

    console.log(text);
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin',el);
}

generateLogs('start', player2, player1);

$formFight.addEventListener('submit', function(e){
    e.preventDefault();

    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence != enemy.hit){
        player1.changeHP(enemy.value);
        player1.renderHp();
        player1.elHP();
        generateLogs('hit', player2, player1);
    }

    if (enemy.defence != player.hit){
        player2.changeHP(player.value);
        player2.renderHp();
        player2.elHP();
        generateLogs('hit', player1, player2);
    }

    if (player.defence === enemy.hit){
        generateLogs('defence', player2, player1);
    }

    showResult();
})