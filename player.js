import {random} from "./utils.js";

class Player {
    constructor(props){

    this.name = props.name;
    this.hp = props.hp;
    this.player = props.player;
    this.img = props.img;
    this.weapon = props.weapon;

    }
    attack = () => console.log(this.name + 'Fight...');
    changeHP = () => {
        this.hp -= random(20);
        if (this.hp <= 0) {
            this.hp = 0;
        }
        return this.hp;
    };
    elHP = () => document.querySelector(`.player${this.player} .life`);
    renderHp = () => this.elHP().style.width = this.hp + '%'; 
}

export const player1 = new Player ({
    name: 'subzero',
    hp: 100,
    player: 1,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
});

export const player2 = new Player ({
    name: 'liukang',
    hp: 100,
    player: 2,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['weapon1', 'weapon2', 'weapon3'],
});
