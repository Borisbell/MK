const player1 = {
    name: 'subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Laser','Gun'],
    attack: function(){
        console.log(this.name + 'Fight!')
    }
}

const player2 = {
    name: 'liukang',
    hp: 50,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['sword','dagger'],
    attack: function(){
        console.log(this.name + 'Fight!')
    }
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

    $arenas.appendChild($player1);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
