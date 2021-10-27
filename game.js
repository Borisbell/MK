import {player1, player2 } from "./player.js";
import {getTime, random, createElement} from "./utils.js";
import {logs} from "./logs.js";

export class Game {
    
    start = () => {
    const $arenas = document.querySelector('.arenas')
    const $randomButton = document.querySelector('.button');
    const $formFight = document.querySelector('.control');
    const $chat = document.querySelector('.chat');
    const HIT = {
        head: 30,
        body: 25,
        foot: 20,
    }
    function createPlayer ({player, hp, name, img}) {
        const $player = createElement('div', `player${player}`);
        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');
    
        $life.style.width = `${hp}%`;
        $name.innerText = name;
        $img.src = img;
    
        $progressbar.appendChild($name);
        $progressbar.appendChild($life);
    
        $character.appendChild($img);
    
        $player.appendChild($progressbar);
        $player.appendChild($character);
    
        return $player;
    }

    const ATTACK = ['head', 'body', 'foot'];

    function playerWins(name) {
        const $winTitle = createElement('div', 'loseTitle');
        if (name) {
            $winTitle.innerText = name + ' Wins';
        } else {
            $winTitle.innerText = 'draw';
        }
    
        return $winTitle;
    }

    function reloadPage(btn) {
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

    function generateLogs (type, player1, player2){
        let text;
        const {start, end, hit, defence, draw} = logs;
        
        switch(type) {
            case 'start':
                text = start.replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
                break
            case 'end':
                text = end[random(3)].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
                break
            case 'draw':
                text = draw;
                break
            case 'hit':
                text = `${getTime()} ${hit[random(17)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} -${playerAttack().value}[${player1.hp}/100]`;
                text = `${getTime()} ${hit[random(17)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name)} -${enemyAttack().value}[${player2.hp}/100]`;
                break
            case 'defence':
                text = getTime() + defence[random(7)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
                break
        }
        const el = `<p>${text}</p>`;
        $chat.insertAdjacentHTML('afterbegin',el);
    }

    function enemyAttack() {
        const hit = ATTACK[random(3)-1];
        const defence = ATTACK[random(3)-1];
    
        return {
            value: random(HIT[hit]),
            hit,
            defence,
        }
    }

    function playerAttack() {
        const attack = {};
    
        for(let item of $formFight) {
            if (item.checked && item.name === 'hit'){
                attack.value = random(HIT[item.value]);
                attack.hit = item.value;
            }
    
            if (item.checked && item.name === 'defence'){
                attack.value = random(HIT[item.value]);
                attack.defence = item.value;
            }
    
            item.checked = false;
        }
    
        return attack;
    }

    function showResult() {
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

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));

    generateLogs('start', player2, player1);

    $formFight.addEventListener('submit', function(e){
        e.preventDefault();
    
        const enemy = enemyAttack();
        const player = playerAttack();
    
        if (player.defence != enemy.hit){
            player1.changeHP(enemy.value);
            player1.renderHp();
            generateLogs('hit', player2, player1);
        }
    
        if (enemy.defence != player.hit){
            player2.changeHP(player.value);
            player2.renderHp();
            generateLogs('hit', player1, player2);
        }
    
        if (player.defence === enemy.hit){
            generateLogs('defence', player2, player1);
        }
    
        showResult();
    })
    }
}


