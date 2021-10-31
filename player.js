import {random} from "./utils.js";

export class Player {
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
