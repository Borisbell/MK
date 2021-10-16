const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Laser','Gun'],
    attack: function(){
        console.log(this.name + 'Fight!')
    }
}

const player2 = {
    player: 2,
    name: 'liukang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['sword','dagger'],
    attack: function(){
        console.log(this.name + 'Fight!')
    }
}

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if (className){
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj){
    const $player1 = createElement('div', 'player' + playerObj.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character' );

    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    const $life = createElement('div', 'life');
    $life.style.width = playerObj.hp +'%';

    const $name = createElement('div', 'name');
    $name.innerText = playerObj.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $img = createElement('img');
    $img.src = playerObj.img;

    $character.appendChild($img);

    return $player1;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function changeHP(player){
    const $playerLife = document.querySelector('.player' + player.player +' .life');
    const hit = Math.floor(Math.random() * 20) + 1;
    if ((player.hp - hit) < 0){
        player.hp = 0;
        $randomButton.disabled = true;
    }
    else {player.hp -= hit;}

    $playerLife.style.width = player.hp + '%';
}

function playerWin(name){
    const $winTitle = createElement('div', 'loseTitle')
    $winTitle.innerHTML = name + ' win';
    return $winTitle;
}

function whoWins(player1, player2){
    if(player1.hp <= 0){
        $arenas.appendChild(playerWin(player2.name));
    } else if(player2.hp <= 0){
        $arenas.appendChild(playerWin(player1.name));
    }
}

$randomButton.addEventListener('click', function(){
    changeHP(player1);
    changeHP(player2);
    whoWins(player1, player2);
});
