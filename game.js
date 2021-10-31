import { Player } from "./player.js";
import { getTime, random, createElement } from "./utils.js";
import { logs } from "./logs.js";

export class Game {
    getPlayers = async() => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return body;
    }

    getEnemyPlayer = async() => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
        return body;
    }

    start = async () => {
        const players = await this.getPlayers();
        const enemy = await this.getEnemyPlayer();

        const p1 = JSON.parse(localStorage.getItem('player1'));
        const p2 = enemy;
        const player1 = new Player({
            ...p1,
            player: 1,
        });

        const player2 = new Player({
            ...p2,
            player: 2,
        });

        const $arenas = document.querySelector('.arenas')
        const $randomButton = document.querySelector('.button');
        const $formFight = document.querySelector('.control');
        const $chat = document.querySelector('.chat');

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

        function generateLogs (type, player1, player2, enemy, player){
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
                    text = `${getTime()} ${hit[random(17)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name)} -${player.value}[${player1.hp}/100]`;
                    text = `${getTime()} ${hit[random(17)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name)} -${enemy.value}[${player2.hp}/100]`;
                    break
                case 'defence':
                    text = getTime() + defence[random(7)].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
                    break
            }
            const el = `<p>${text}</p>`;
            $chat.insertAdjacentHTML('afterbegin',el);
        }

        function playerAttack() {
            const attack = {};
        
            for(let item of $formFight) {
                if (item.checked && item.name === 'hit'){
                    attack.hit = item.value;
                }
        
                if (item.checked && item.name === 'defence'){
                    attack.defence = item.value;
                }
        
                item.checked = false;
            }
        
            return attack;
            console.log('attack object= ' + attack);
        }

    const attackObj = playerAttack() ;

    let response = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify({
            attackObj
        })
    });

    let result = await response.json();

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
        
        console.log(result);

        const enemy = result.player2;
        const player = result.player1;
    
        if (player.defence != enemy.hit){
            player1.changeHP(enemy.value);
            player1.renderHp();
            generateLogs('hit', player1, player2, enemy, player);
        }
    
        if (enemy.defence != player.hit){
            player2.changeHP(player.value);
            player2.renderHp();
            generateLogs('hit', player, enemy);
        }
    
        if (player.defence === enemy.hit){
            generateLogs('defence', player1, player2, enemy, player);
        }
        console.log('p1 hp= ' + player1.hp, 'p2 hp= ' + player2.hp)

        showResult();
    })
    }
}


