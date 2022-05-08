<script>
import {fade} from 'svelte/transition';
import {quintIn} from 'svelte/easing';
import Action from './Action.svelte';
import Hoverable from './Hoverable.svelte';
import {calculate, dataSetup, speed, poisonCalc, steals, fail, powderTime} from './Math'
export let bossName;
export let stats;

let attackList = [];
let health, setup, playerHealth, eleDefs, dmgDealt, dmgLeft, hitCount, secondsTimer, powderActive, powderTimer, powderTick, poisonTick, manaTick, poisonDamage, poisonOn, mana, willFail, time, vanished, vanishTick, totem, warScream, bash

function go(name, passHp){
    setup = dataSetup(stats)
    if(setup == 0){
        attackList.push("You cannot fight with no damage")
        attackList = attackList
        return;
    }
    attackList = [];
    attackList = attackList;
    powderTimer = powderTime();
    powderActive = false;
    powderTick = powderTimer;
    health;
    willFail;
    playerHealth = stats.hp;
    eleDefs;
    dmgDealt;
    dmgLeft = 0;
    hitCount = 0;
    secondsTimer = 0;
    poisonTick = 3;
    manaTick = 5;
    poisonDamage = 0;
    poisonOn = false;
    mana = 20;
    time = 1/speed(stats.speed)
    vanished = false;
    vanishTick = 5;
    totem = false;
    bash = false;
    warScream = false;
    poisonDamage = poisonCalc(stats.poison)
    health = passHp
    eleDefs = [{

    },
    {

    },
    {

    }];
    attackList.push(`${name} boss fight: The battle will begin in 3 seconds.`);
    setTimeout(function(){
        for(let i=0;i<health.length;i++){
            if(health[i] === "run"){
                dmgLeft = 0;
                attackList.push(`Phase ${i+1}: Run Phase`)
                attackList.push("Ran over run phase. 🏃")
                secondsTimer += 80
                attackList = attackList;
                i++;
            }
            attackList.push(`Phase ${i+1}: ${health[i]} HP ❤️`)
            attackList = attackList;
            if(dmgLeft){
                health[i] -= dmgLeft
                if(health[i] < 0){
                    dmgLeft = Math.abs(health[i])
                    health[i] = 0
                }
                attackList.push(`Leftover ${dmgLeft} damage from last phase. Boss has ${health[i]} HP. 🗡️`)
                dmgLeft = 0;
            }
            secondsTimer++;
            while(health[i] > 0){
                willFail = fail()
                switch(willFail[0]){
                    case "Miss":
                        attackList.push(`You missed your attack!`)
                        playerHealth -= willFail[1]
                        break;
                    case "2":
                        attackList.push(`Accidentally used your movement spell.`)
                        mana -= willFail[2]
                        break;
                    case "3":
                        attackList.push(`Accidentally used your 3rd spell.`)
                        mana -= willFail[2]
                        break;
                    default:
                        dmgDealt = calculate()
                        health[i] -= dmgDealt
                        hitCount++
                        if(health[i] < 0){
                            dmgLeft = Math.abs(health[i])
                            health[i] = 0
                        }
                        attackList.push(`You hit the boss, dealing ${dmgDealt} damage. It has ${health[i]} HP left. ⚔️`)
                        if(steals() == 1){
                            //Heal
                        }else if(steals() == 2){
                            //
                        }else if(steals() == 3){

                        }
                        spellCheck()
                        powder()
                        if(powderActive){
                            usePowder()
                        }
                        if(vanished){

                        }
                        if(!poisonOn){
                            poisonOn = true;
                        }
                }
                attackList = attackList;
                if(manaTick <= 0){
                    manaRegen()
                    manaTick = 5
                }
                mana += Math.round(time)
                manaTick -= time;
                if(!(poisonDamage <= 0) && poisonOn){
                    poison(i)
                }
                secondsTimer += time;
            }
        }
        attackList.push(`The boss was defeated in ${hitCount} hits. This took ${Math.ceil(secondsTimer)} seconds.`)
        started = false;
    }, 2999);
}

function poison(i){
    if(poisonTick <= 0){
        poisonOn = false;
        poisonTick = 3
    }else{
        health[i] -= poisonDamage
        if(health[i] <= 0){
            poisonOn = false;
        }else{
            attackList.push(`Poison damage did ${poisonDamage} damage. Boss has ${health[i]} health left. ☠️`)
            attackList = attackList;
            poisonTick -= time
        }
    }
}

function manaRegen(){
    mana += stats.mr
    if(mana > 20){
        mana = 20
    }
}

function vanish(){
    if(vanishTick <= 0){
        vanished = false
    }else{
        vanishTick--
        mana--
    }
}

function powder(){
    if(!powderActive){
        if(powderTick <= 0){
            powderTick = powderTimer
            powderActive = true;
        }else{
            powderTick -= time
        }
    }
}

function usePowder(){

}

function spellCheck(){
    switch (stats.playingClass) {
        case "Assassin":
            if(mana+2 > stats.cost2 && !vanished){
                vanished = true;
            }
            break;
        case "Warrior":
            break;
        case "Mage":
            break;
        case "Archer":
            break;
        case "Shaman":
            break;
    }
}

let started = false;

function start(){
    if(started){ return; }
    started = true;
    switch (bossName) {
        case "reincarnationBob":
            go("Bob's Reincarnation", [35000, 45000, 55000, 65000])
            break;
        case 'worldCorrupter':
            go("Corrupter of Worlds", [150000])
            break;
        case 'corruptTheorick':
            go("Corrupted Theorick", [128000, 10000])
            break;
        case 'corruptSlykaar':
            go("Corrupted Slykaar", [80000, 53500, 26000, 250000])
            break;
        case 'orangeWybel':
            go("The Orange Wybel", [150000, "run", 150000, "run", 300000])
            break;
        case 'theEye':
            go("The Orange Wybel", [700000, 900000, 1100000, 400000])
            break;
        case 'panicZealot':
            go("Panic Zealot", [1500000])
            break;
    }
}

start();

</script>

<main in:fade={{duration: 400, easing: quintIn}}>
<Hoverable let:hovering={hovering}>
    <button id="redo" on:click={start}>Redo Fight</button>
</Hoverable>
<div id="fightouter" >
    <div class="fight">
        {#each attackList as text}
            <Action text="{text}"/>
        {/each}
    </div>
</div>
</main>

<style>
    #fightouter {
        position: absolute;
        border: 4px solid gainsboro;
        top: 22%;
        width: 90%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        height: 70%;
        overflow-y: auto;
    }

    #fightouter::-webkit-scrollbar-thumb {
        box-shadow: inset 0 10px 20px darkgoldenrod;
        border-radius: 4px;
    }

    #fightouter::-webkit-scrollbar-thumb:hover {
        box-shadow: inset 0 0 20px goldenrod;
    }

    #fightouter::-webkit-scrollbar-track{
        box-shadow: inset 0 0 5px gray;
        border-radius: 4px;
    }

    #fightouter::-webkit-scrollbar {
        width: 8px;
        border-radius: 4px;
    }

    .fight {
        width: 100%;
    }
</style>