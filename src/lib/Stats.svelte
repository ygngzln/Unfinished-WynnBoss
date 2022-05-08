<script>
    import {fade} from 'svelte/transition';
    import {quartIn} from 'svelte/easing';
    import Bosses from './Bosses.svelte';
    import Hoverable from './Hoverable.svelte'
    import { createEventDispatcher } from 'svelte'
    import Statbtn from './Statbutton.svelte'
    import Examples from './Examples.svelte'

    let localShow = false;
    let examples = false;
    let warning = false;

    const dispatch = createEventDispatcher();
    class statClass {
        constructor() {
            this.playingClass = "Assassin"
            this.style = "melee" 
            this.hp = 100 
            this.hpr = 0 
            this.str = 0 
            this.dex = 0 
            this.intel = 0 
            this.def = 0 
            this.agi = 0 
            this.speed = "Super Fast" 
            this.poison = 0 
            this.ndmg = "0-0" 
            this.edmg = "0-0" 
            this.tdmg = "0-0" 
            this.wdmg = "0-0" 
            this.fdmg = "0-0" 
            this.admg = "0-0" 
            this.exp = 0 
            this.stealing = 0 
            this.mr = 0 
            this.ms = 0 
            this.ls = 0 
            this.melraw = 0 
            this.melper = 0 
            this.speraw = 0 
            this.speper = 0 
            this.eper = 0 
            this.tper = 0 
            this.wper = 0 
            this.fper = 0 
            this.aper = 0 
            this.edef = 0 
            this.tdef = 0 
            this.wdef = 0 
            this.fdef = 0 
            this.adef = 0 
            this.cost1 = 0 
            this.cost2 = 0 
            this.cost3 = 0 
            this.cost4 = 0 
            this.cherry = false 
            this.entropy = false 
            this.explosive = false 
            this.rally = false 
            this.fission = false 
            this.flashfreeze = false 
            this.fureff = false 
            this.peaeff = false 
            this.geo = false 
            this.hawk = false 
            this.greed = false 
            this.madness = false 
            this.plague = false 
            this.roving = false 
            this.sorcery = false 
            this.trans = false 
        }
    };

    let userStats;
    let clicked = false;

    if(localStorage.getItem('Last')){
        localShow = true;
        userStats = JSON.parse(localStorage.getItem('Last'))
    }else{
        localShow = false;
        userStats = new statClass()
    }

    function clear(){
        userStats.playingClass = "Assassin";
        userStats.style = "melee";
        userStats.hp = 100;
        userStats.hpr = 0;
        userStats.str = 0;
        userStats.dex = 0;
        userStats.intel = 0;
        userStats.def = 0;
        userStats.agi = 0;
        userStats.speed = "Super Fast";
        userStats.poison = 0;
        userStats.ndmg = "0-0";
        userStats.edmg = "0-0";
        userStats.tdmg = "0-0";
        userStats.wdmg = "0-0";
        userStats.fdmg = "0-0";
        userStats.admg = "0-0";
        userStats.exp = 0;
        userStats.stealing = 0;
        userStats.mr = 0;
        userStats.ms = 0;
        userStats.ls = 0;
        userStats.melraw = 0;
        userStats.melper = 0;
        userStats.speraw = 0;
        userStats.speper = 0;
        userStats.eper = 0;
        userStats.tper = 0;
        userStats.wper = 0;
        userStats.fper = 0;
        userStats.aper = 0;
        userStats.edef = 0;
        userStats.tdef = 0;
        userStats.wdef = 0;
        userStats.fdef = 0;
        userStats.adef = 0;
        userStats.cost1 = 0;
        userStats.cost2 = 0;
        userStats.cost3 = 0;
        userStats.cost4 = 0;
        userStats.cherry = false;
        userStats.entropy = false;
        userStats.explosive = false;
        userStats.rally = false;
        userStats.fission = false;
        userStats.flashfreeze = false;
        userStats.fureff = false;
        userStats.peaeff = false;
        userStats.geo = false;
        userStats.hawk = false;
        userStats.greed = false;
        userStats.madness = false;
        userStats.plague = false;
        userStats.roving = false;
        userStats.sorcery = false;
        userStats.trans = false;
    }

    function save(){
        for(let obj in userStats){
            if(userStats[obj] == null || userStats[obj] === undefined){
                if(obj === "speed"){
                    userStats[obj] = "Normal"
                }else if(obj.slice(1,obj.length) === "dmg"){
                    userStats[obj] = "0-0"
                }else if(obj === "wpowd"){
                    userStats[obj] = "None"
                }else{
                    userStats[obj] = 0;
                }
            }else if(obj === "speed"){
                if(["super slow", "very slow", "slow", "normal", "fast", "very fast", "super fast"].some( (v, i, a) => v === userStats[obj].toLowerCase())){
                    userStats[obj] = "Normal"
                }
            }else if(obj === "wpowd"){
                for(let i=0;i<userStats[obj].length;i++){
                    if(!["e", "t", "w", "f", "a", "1", "2", "3", "4", "5", "6"].some( (v) => v === userStats[obj].toLowerCase())){
                        userStats[obj] = "None"
                        break;
                    }
                }
            }
        }
        clicked = true;
        dispatch('saveData', {userStats})
    }

    function undo(){
        localShow = false;
        clear()
    }

    function back(){
        let parsed = JSON.parse(localStorage.getItem("Last"))
        for(let x in userStats){
            if(userStats[x] != parsed[x]){
                warning = true
                break;
            }
        }
        if(!warning){
            dispatch("leaveNoSave")
        }
    }

    function ok(){
        dispatch("leaveNoSave")
    }

    function cancel(){
        warning = false;
    }

    function exload(){
        examples = true;
    }

    function load(e){
        clear()
        for(let x in e.detail){
            userStats[x] = e.detail[x]
        }
        examples = false;
    }

    export let fight;
    export let boss;
</script>

{#if examples}
    <Examples on:load={load} on:back={function(e){ examples=false }}/>
{:else}
{#if warning}
    <div id="areyousure">Are you sure you want to leave? You have unsaved changes. <br><Statbtn text="Cancel" on:click={cancel}/> <Statbtn text="Ok" on:click={ok} /></div>
{/if}
<main out:fade={{easing: quartIn, duration: 400}} in:fade={{easing: quartIn, duration: 400}} class="{warning ? "blur" : ""}">
    {#if !fight}
    <header>Use Wynnbuilder to find the stats of your build. <a href="https://wynnbuilder.github.io" target="_blank">https://wynnbuilder.github.io</a></header>
        <div id="outer">
            {#if localShow}
                <div id="local">Loaded Last Build</div>
            {/if}
            <div id="buttons">
                <Statbtn on:click={back} text="Back" />
                <Statbtn on:click={clear} text="Clear Stats" />
                {#if localShow}
                    <Statbtn on:click={undo} text="Undo Local Load" />
                {/if}
                <Statbtn on:click={exload} text="Load Examples" />
            </div>
            <div id="one" class="cont">
                <h1>General Build Info</h1>
                <label>Class: <input bind:value={userStats.playingClass} placeholder="Class" list="classList" name="classes" id="class"/></label>
                <datalist id="classList">
                    <option value="Assassin">
                    <option value="Warrior">
                    <option value="Mage">
                    <option value="Archer">
                    <option value="Shaman">
                </datalist>
                Playstyle: <input bind:value={userStats.style} type="text" class="textbox" placeholder="Playstyle (e.g melee, spell)" autocomplete="off">
                {#if userStats.style.toLowerCase() === "melee"}
                    Melee Damage Raw: <input bind:value={userStats.melraw} type="number" class="textbox" placeholder="Melee Damage Raw (e.g 30, -20)" autocomplete="off">
                    Melee Damage Percent: <input bind:value={userStats.melper} type="number" class="textbox" placeholder="Melee Damage % (e.g 30, -20)" autocomplete="off">
                {:else if userStats.style.toLowerCase() === "spell"}
                    Spell Damage Raw: <input bind:value={userStats.speraw} type="number" class="textbox" placeholder="Spell Damage Raw (e.g 30, -20)" autocomplete="off">
                    Spell Damage Percent: <input bind:value={userStats.speper} type="number" class="textbox" placeholder="Spell Damage % (e.g 30, -20)" autocomplete="off">
                {/if}
            </div>

            <div id="two" class="cont">
                <h1>Health</h1>
                Health: <input bind:value={userStats.hp} type="number" class="textbox" placeholder="Health (e.g 11000, 17000)" autocomplete="off">
                Health Regen: <input bind:value={userStats.hpr} type="number" class="textbox" placeholder="Health Regen (e.g 200)" autocomplete="off">
                Life Steal: <input bind:value={userStats.ls} type="number" class="textbox" placeholder="Life Steal (e.g 300, -200)" autocomplete="off">
                <h1>Skill Points</h1>
                Strength: <input bind:value={userStats.str} type="number" class="textbox" placeholder="Strength (e.g 30)" autocomplete="off">
                Dexterity: <input bind:value={userStats.dex} type="number" class="textbox" placeholder="Dexterity (e.g 30)" autocomplete="off">
                Intelligence: <input bind:value={userStats.intel} type="number" class="textbox" placeholder="Intelligence (e.g 30)" autocomplete="off">
                Defense: <input bind:value={userStats.def} type="number" class="textbox" placeholder="Defense (e.g 30)" autocomplete="off">
                Agility: <input bind:value={userStats.agi} type="number" class="textbox" placeholder="Agility (e.g 30)" autocomplete="off">
            </div>

            <div id="three" class="cont">
                <h1>Damage</h1>
                Attack Speed: <input bind:value={userStats.speed} type="text" class="textbox" placeholder="e.g Very Fast, Super Fast" autocomplete="off"> 
                Poison / 3s <input bind:value={userStats.poison} type="number" class="textbox" placeholder="Poison (e.g 0, 300)" autocomplete="off"> <br />
                Weapon Powders <input bind:value={userStats.wpowd} type="text" class="textbox" placeholder="e.g t6w5f4 f4f3" autocomplete="off"> <br />
                Weapon Normal Melee Damage: <input bind:value={userStats.ndmg} type="text" class="textbox" placeholder="Weapon Normal Damage (e.g 0-50)" autocomplete="off">
                Weapon Earth Damage: <input bind:value={userStats.edmg} type="text" class="textbox" placeholder="Weapon Earth Damage (e.g 10-300)" autocomplete="off">
                Weapon Thunder Damage: <input bind:value={userStats.tdmg} type="text" class="textbox" placeholder="Weapon Thunder Damage (e.g 1100-4000)" autocomplete="off">
                Weapon Water Damage: <input bind:value={userStats.wdmg} type="text" class="textbox" placeholder="Weapon Water Damage (e.g 300-620)" autocomplete="off">
                Weapon Fire Damage: <input bind:value={userStats.fdmg} type="text" class="textbox" placeholder="Weapon Fire Damage (e.g 420-690)" autocomplete="off">
                Weapon Air Damage: <input bind:value={userStats.admg} type="text" class="textbox" placeholder="Weapon Air Damage (e.g 30-200)" autocomplete="off"> <br />
                Weapon Earth Damage Percent: <input bind:value={userStats.eper} type="number" class="textbox" placeholder="Earth Damage % (e.g 30, -20)" autocomplete="off">
                Weapon Thunder Damage Percent: <input bind:value={userStats.tper} type="number" class="textbox" placeholder="Thunder Damage % (e.g 30, -20)" autocomplete="off">
                Weapon Water Damage Percent: <input bind:value={userStats.wper} type="number" class="textbox" placeholder="Water Damage % (e.g 30, -20)" autocomplete="off"> 
                Weapon Fire Damage Percent: <input bind:value={userStats.fper} type="number" class="textbox" placeholder="Fire Damage % (e.g 30, -20)" autocomplete="off">
                Weapon Air Damage Percent: <input bind:value={userStats.aper} type="number" class="textbox" placeholder="Air Damage % (e.g 30, -20)" autocomplete="off"> 
            </div>
            
            <div id="four" class="cont">
                <h1>Defense</h1>
                Weapon Earth Defense Percent: <input bind:value={userStats.edef} type="number" class="textbox" placeholder="Earth Defense % (e.g 30, -20)" autocomplete="off">
                Weapon Thunder Defense Percent: <input bind:value={userStats.tdef} type="number" class="textbox" placeholder="Thunder Defense % (e.g 30, -20)" autocomplete="off">
                Weapon Water Defense Percent: <input bind:value={userStats.wdef} type="number" class="textbox" placeholder="Water Defense % (e.g 30, -20)" autocomplete="off"> 
                Weapon Fire Defense Percent: <input bind:value={userStats.fdef} type="number" class="textbox" placeholder="Fire Defense % (e.g 30, -20)" autocomplete="off">
                Weapon Air Defense Percent: <input bind:value={userStats.adef} type="number" class="textbox" placeholder="Air Defense % (e.g 30, -20)" autocomplete="off">
            </div>
            <div id="five" class="cont">
                <h1>Spells</h1>
                Mana Regen: <input bind:value={userStats.mr} type="number" class="textbox" placeholder="Mana Regen (e.g 3, -2)" autocomplete="off">
                Mana Steal: <input bind:value={userStats.ms} type="number" class="textbox" placeholder="Mana Steal (e.g 3, -2)" autocomplete="off">
                Mana Cost of Spell 1: <input bind:value={userStats.cost1} type="number" class="textbox" placeholder="1st Spell Cost (e.g 3, 7)" autocomplete="off">
                Mana Cost of Spell 2: <input bind:value={userStats.cost2} type="number" class="textbox" placeholder="2nd Spell Cost (e.g 3, 7)" autocomplete="off"> 
                Mana Cost of Spell 3:<input bind:value={userStats.cost3} type="number" class="textbox" placeholder="3rd Spell Cost (e.g 3, 7)" autocomplete="off"> 
                Mana Cost of Spell 4: <input bind:value={userStats.cost4} type="number" class="textbox" placeholder="4th Spell Cost (e.g 3, 7)" autocomplete="off">
            </div>
            <div id="six">
                <h1>Major Ids:</h1>
                {#if userStats.playingClass === "Assassin"}
                    <input bind:checked={userStats.cherry} type="checkbox" name="Cherry Bombs">
                    <label for="Cherry Bombs">Cherry Bombs</label><br/>
                    <input bind:checked={userStats.roving} type="checkbox" name="Roving Assassin">
                    <label for="Roving">Roving Assassin</label><br/>
                    <input bind:checked={userStats.trans} type="checkbox" name="Transcendence">
                    <label for="Transcendence">Transcendence</label><br/>
                {:else if userStats.playingClass === "Warrior"}
                    <input bind:checked={userStats.rally} type="checkbox" name="Rally">
                    <label for="Rally">Rally</label><br/>
                {:else if userStats.playingClass === "Mage"}
                    <input bind:checked={userStats.flashfreeze} type="checkbox" name="Flashfreeze">
                    <label for="Cherry Flashfreeze">Flashfreeze</label><br/>
                    <input bind:checked={userStats.entropy} type="checkbox" name="Entropy">
                    <label for="Entropy">Entropy</label><br/>
                {:else if userStats.playingClass === "Archer"}
                    <input bind:checked={userStats.hawk} type="checkbox" name="Hawkeye">
                    <label for="Hawkeye">Hawkeye</label><br/>
                {:else if userStats.playingClass === "Shaman"}
                    <input bind:checked={userStats.fureff} type="checkbox" name="Furious Effigy">
                    <label for="Furious Effigy">Furious Effigy</label><br/>
                    <input bind:checked={userStats.peaeff} type="checkbox" name="Peaceful Effigy">
                    <label for="Peaceful Effigy">Peaceful Effigy</label><br/>
                    <input bind:checked={userStats.geo} type="checkbox" name="Geocentrism">
                    <label for="Geocentrism">Geocentrism</label><br/>
                {/if}

                <input bind:checked={userStats.explosive} type="checkbox" name="Explosive Impact">
                <label for="Explosive Impact">Explosive Impact</label><br/>
                {#if userStats.explosive}
                    <input bind:checked={userStats.fission} type="checkbox" name="Fission">
                    <label for="Fission">Fission</label><br/>
                    Explosion: <input bind:value={userStats.exp} type="number" class="textbox" placeholder="Explosion % (e.g 30, -20)" autocomplete="off"><br />
                {/if}

                <input bind:checked={userStats.greed} type="checkbox" name="Greed">
                <label for="Greed">Greed</label><br/>
                {#if userStats.greed}
                    Stealing: <input bind:value={userStats.stealing} type="number" class="textbox" placeholder="Stealing % (e.g 30, -20)" autocomplete="off"><br />
                {/if}

                <input bind:checked={userStats.madness} type="checkbox" name="Madness">
                <label for="Madness">Madness</label><br/>

                <input bind:checked={userStats.plague} type="checkbox" name="Plague">
                <label for="Plague">Plague</label><br/>

                <input bind:checked={userStats.sorcery} type="checkbox" name="Sorcery">
                <label for="Sorcery">Sorcery</label><br/>
                
                
            </div>
            <Hoverable let:hovering={hovering}>
                <button on:click={save} class="{hovering ? "hover" : ""} {clicked ? "click" : "save"}" >Save</button>
            </Hoverable>
        </div>
    {:else if fight}
        <Bosses bossName="{boss}" stats={userStats}/>
    {/if}
</main>
{/if}

<style>
    header {
        color: black;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 110px;
        background-color: lime;
        padding: 2px 4px;
        border-radius: 8px;
    }

    #areyousure {
        position: fixed;
        background-color: silver;
        border: 4px solid white;
        border-radius: 20px;
        font-size: 50px;
        text-align: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 4;
        padding: 100px;
        font-family: 'Tapestry', cursive;
        font-weight: bold;
    }

    #outer {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 157.5px;
        width: 98%;
        color: gainsboro;
        padding-bottom: 20px;
        padding-left: 10px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column;
    }

    #local {
        margin: 0 6px 5px 6px;
        color: lightgreen;
        background-color: green;
        padding: 0 10px;
        border-radius: 8px;
        font-size: 20px;
    }

    .cont {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        text-align: center;
    }

    #three input, #four input, #five input {
        display: block;
        margin: 0 auto;
    }

    input {
        margin-top: 4px;
    }

    .textbox {
        background-color: lightgray;
        font-family: 'VT323', monospace;
    }

    .textbox::placeholder {
        color: black;
    }

    .textbox:focus {
        outline: 1px solid dimgray;
    }

    input[type='checkbox'] {
        color: black;
        background-color: silver;
        width: 20px;
        height: 20px;
        vertical-align: middle;
        font-family: 'VT323', monospace;
    }

    #class {
        background-color: gold;
        border: 2px solid darkgoldenrod;
    }

    .textbox {
        margin-right: 5px;
    }

    .save {
        margin-top: 10px;
        font-size: 18px;
        background-color: lime;
        border: 4px solid limegreen;
    }

    .hover {
        opacity: 0.75;
        cursor: pointer;
    }

    .click {
        background-color: green;
        border: 4px solid darkgreen;
        margin-top: 10px;
        font-size: 18px;
        opacity: 0.85;
    }

    #buttons {
        margin-top: 5px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 37.5%;
    }

    .blur {
        filter: blur(5px);
        -webkit-filter: blur(5px);
    }
</style>