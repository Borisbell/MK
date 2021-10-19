const player1 = {
    name: 'subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Laser','Gun'],
    attack: function(){
        console.log(this.name + 'Fight!')
    },
    changeHP : changeHP,
    renderHP : renderHP,
    elHP: elHP,
}

const player2 = {
    name: 'liukang',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['sword','dagger'],
    attack: function(){
        console.log(this.name + 'Fight!')
    },
    changeHP : changeHP,
    renderHP : renderHP,
    elHP: elHP,
}

const $arenas = document.querySelector('.arenas');

function createPlayer(name, data){
    const $player1 = document.createElement('div');
    $player1.classList.add(name);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    $player1.appendChild($progressbar);
    $player1.appendChild($character);

    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.width = data.hp +'%';

    const $name = document.createElement('div');
    $name.classList.add('name');
    $name.innerHTML = data.name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $img = document.createElement('img');
    $img.src = data.img;

    $character.appendChild($img);

<<<<<<< Updated upstream
    $arenas.appendChild($player1);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
=======
    return $player1;
}

function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $reloadWrap.appendChild($button);

    $button.innerText = 'Restart';

    $button.addEventListener('click', function(){
        window.location.reload();
    })

    return $reloadWrap;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function changeHP(){
    this.hp -= getRandom(20);

    if(this.hp <= 0){
        this.hp = 0;
    }

    return this.hp;
}

function elHP(){
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP(){
    const element = this.elHP();
    element.style.width = this.changeHP() + '%';
}

function getRandom(num){
    return Math.floor(Math.random() * num) + 1;
}

function playerWin(name){
    const $winTitle = createElement('div', 'loseTitle')
    if (name){
        $winTitle.innerHTML = name + ' win';
    } else {
        $winTitle.innerHTML = 'draw';
    }
    
    return $winTitle;
}



$randomButton.addEventListener('click', function(){
    player1.changeHP();
    player1.elHP();
    player1.renderHP();

    player2.changeHP();
    player2.elHP();
    player2.renderHP();

    
    if (player1.hp === 0 || player2.hp === 0){
        $randomButton.disabled = true;
    }

    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.appendChild(playerWin(player2.name));
        $arenas.appendChild(createReloadButton());
    } else if (player2.hp === 0 && player2.hp < player1.hp){
        $arenas.appendChild(playerWin(player1.name));
        $arenas.appendChild(createReloadButton());
    } else if (player2.hp === 0 && player2.hp === 0){
        $arenas.appendChild(playerWin());
        $arenas.appendChild(createReloadButton());
    }
});
>>>>>>> Stashed changes
