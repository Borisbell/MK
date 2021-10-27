import {random} from "./utils.js";

export const player1 = {
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
}

export const player2 = {
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
}

function changeHP() {
    this.hp -= random(20);
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