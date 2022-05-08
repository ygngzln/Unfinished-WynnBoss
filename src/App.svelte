<script>
  import Hoverable from './lib/Hoverable.svelte';
  import Stats from './lib/Stats.svelte';
  import {scale} from 'svelte/transition';
  import {circIn} from 'svelte/easing';
  import { Parallax, ParallaxLayer } from 'svelte-parallax';

  let fight = false;
  let conf = false;
  let boss = "";
  let scrollY;
  function select(id){
    conf = true;
    fight = true;
    boss = id;
  }
  
  function leave(){
    fight = false;
    conf = false;
    boss = "none"
  }

  function stats(){
    conf = true;
    fight = false;
    boss = "none"
  }

  function saveData(e){
    localStorage.setItem("Last", JSON.stringify(e.detail.userStats))
    setTimeout(function(){
      conf = false;
      scrollY = 0;
    },694)
  }

  function leaveNoSave(){
    setTimeout(function(){
      conf = false
      scrollY = 0
    }, 95)
  }
</script>

<svelte:window bind:scrollY={scrollY}/>

<div id="header">WynnBoss</div>

{#if !conf}
    <Hoverable let:hovering={hovering}>
      <button id="configure" class="{hovering ? 'hover' : ''}" on:click={stats} out:scale={{easing: circIn, duration: 400}} in:scale={{easing: circIn, duration: 400}}>- Change your stats -</button>
    </Hoverable>
      <table id="bosses" out:scale={{easing: circIn, duration: 400}} in:scale={{easing: circIn, duration: 400}}>
          <div class="imagediv" style="background-image: url(./src/assets/tol.png)">
              <tr class="bossOut">
                <Hoverable let:hovering={hovering}>
                  <th id="reincarnationBob" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("reincarnationBob")}>
                    Bob (Reincarnation)<br>
                    <table class="phase">
                      <tr><td>Phase 1 - 35,000 HP ❤️</td></tr>
                      <tr><td>Phase 2 - 45,000 HP ❤️</td></tr>
                      <tr><td>Phase 3 - 55,000 HP ❤️</td></tr>
                      <tr><td>Phase 4 - 65,000 HP ❤️</td></tr>
                    </table>
                  </th>
                </Hoverable>
                <Hoverable let:hovering={hovering}>
                  <th id="worldCorrupter" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("worldCorrupter")}>
                    Corrupter of Worlds<br>
                    <table class="phase">
                      <tr><td>Phase 1 - 150,000 HP ❤️</td></tr>
                    </table>
                  </th>
                </Hoverable>
              </tr>
          </div>
        <div class="imagediv" style="background-image: url(./src/assets/forgery.png)">
        <tr class="bossOut">
          <Hoverable let:hovering={hovering}>
            <th id="corruptTheorick" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("corruptTheorick")}>
              Corrupted Theorick <br>
              <table class="phase">
                <tr><td>Phase 1 - 128,000 HP ❤️</td></tr>
                <tr><td>Phase 2 - 100,000 HP ❤️</td></tr>
              </table>
            </th>
          </Hoverable>
          <Hoverable let:hovering={hovering}>
            <th id="corruptSlykaar" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("corruptSlykaar")}>
              Corrupted Slykaar
              <table class="phase">
                <tr><td>Phase 1 - 80,000 HP ❤️</td></tr>
                <tr><td>Phase 2 - 53,500 HP ❤️</td></tr>
                <tr><td>Phase 3 - 26,000 HP ❤️</td></tr>
                <tr><td>Phase 4 - 250,000 HP ❤️</td></tr>
              </table>
            </th>
          </Hoverable>
        </tr>
      </div>

        <div class="imagediv" style="background-image: url(./src/assets/li.png)">
        <tr class="bossOut">
          <Hoverable let:hovering={hovering}>
            <th id="orangeWybel" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("orangeWybel")}>
              Orange Wybel
              <table class="phase">
                <tr><td>Phase 1 - 135,000 HP ❤️</td></tr>
                <tr><td>Phase 2 - Run Phase 🏃</td></tr>
                <tr><td>Phase 3 - 135,000 HP ❤️</td></tr>
                <tr><td>Phase 4 - Run Phase 🏃</td></tr>
                <tr><td>Phase 5 - 270,000 HP ❤️</td></tr>
              </table>
            </th>
          </Hoverable>
        </tr>
        <tr class="bossOut">
          <Hoverable let:hovering={hovering}>
            <th id="orangeCybel" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("orangeCybel")}>
              Orange Cybel
              <table class="phase">
                <tr><td>Phase 1 - 150,000 HP ❤️</td></tr>
                <tr><td>Phase 2 - Run Phase 🏃</td></tr>
                <tr><td>Phase 3 - 150,000 HP ❤️</td></tr>
                <tr><td>Phase 4 - Run Phase 🏃</td></tr>
                <tr><td>Phase 5 - 300,000 HP ❤️</td></tr>
              </table>
            </th>
          </Hoverable>
          <Hoverable let:hovering={hovering}>
            <th id="dctrLegendary" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("doctorLegendary")}>
              Doctor Legendary
              <table class="phase">
                <tr><td>Phase 1 - 250,000 HP ❤️</td></tr>
                <tr><td>Phase 2 - 250,000 HP ❤️</td></tr>
                <tr><td>Phase 3 - 250,000 HP ❤️</td></tr>
              </table>
            </th>
          </Hoverable>
        </tr>
        </div>
        <div class="imagediv">
        <tr class="bossOut">
          <Hoverable let:hovering={hovering}>
            <th id="eye" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("theEye")}>
              The Eye
              <table class="phase">
                <tr><td>Phase 1 - 700,000 HP ❤️</td></tr>
                <tr><td>Phase 2 - 900,000 HP ❤️</td></tr>
                <tr><td>Phase 3 - 1,100,000 HP ❤️</td></tr>
                <tr><td>Phase 4 - 400,000 HP ❤️</td></tr>
              </table>
            </th>
          </Hoverable>
          <Hoverable let:hovering={hovering}>
            <th id="panicZealot" class="bossTab {hovering ? 'hover' : ''}" on:click={() => select("panicZealot")}>
              Panic Zealot
              <table class="phase">
                <tr><td>Health - 1,500,000 HP ❤️</td></tr>
              </table>
            </th>
          </Hoverable>
        </tr>
      </div>
      </table>
{:else if conf}
  <Stats fight={fight} boss="{boss}" on:saveData={saveData} on:leaveNoSave={leaveNoSave}/>
    {#if fight}
      <Hoverable let:hovering={hovering}>
        <button id="return" class="{hovering ? "hover" : ""}" on:click={leave}>Exit Fight</button>
      </Hoverable>
    {/if}
{/if}

<style>
  :global(body) {
    -ms-overflow-style: none;
    scrollbar-width: none;
    background-color: rgb(20,20,20);
  }

  :global(body)::-webkit-scrollbar-thumb {
    box-shadow: inset 0 10px 20px darkgoldenrod;
    border-radius: 4px;
  }

  :global(body)::-webkit-scrollbar-thumb:hover {
    box-shadow: inset 0 0 20px goldenrod;
  }

  :global(body)::-webkit-scrollbar-track{
    box-shadow: inset 0 0 5px gray;
    border-radius: 4px;
  }

  :global(body)::-webkit-scrollbar {
    width: 12px;
    border-radius: 4px;
  }

  #header {
    top: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    font-size: 80px;
    background: -webkit-linear-gradient(saddlebrown 30%, gold 50%, yellow 30%, lime 80%);
    font-family: 'Righteous', cursive;
    -webkit-background-clip: text;
    background-clip: text;
    margin-top: -20px;
    -webkit-text-fill-color: transparent;
  }

  #configure {
    top: 21px;
    position: absolute;
    left: 28.75%;
    transform: translateX(-50%);
    font-size: 20px;
    background-color: gray;
    border: 5px inset darkgray;
  }

  .bossTab {
    border: 4px solid darkgray;
    border-radius: 8px;
    padding: 0 4px;
    color: lightsteelblue;
    font-size: 25px;
    margin: 8px;
    display: block;
    position: relative;
    height: 45vh;
    width: 30vw;
    opacity: 1;
    overflow-y: auto;
    text-align: center;
    background-color: rgb(20,20,20);
  }

  .bossTab::-webkit-scrollbar {
    width: 4px;
    border-radius: 4px;
  }

  .bossTab::-webkit-scrollbar-thumb {
    background: darkred;
    border-radius: 4px;
  }

  .bossOut {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
  }

  #bosses {
    top: 140px;
    width: 95%;
    height: 60%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .phase {
    width: 100%;
    border-top: 4px solid skyblue;
    background-color: rgb(20,20,20);
  }

  .hover {
    opacity: 0.7;
    cursor: pointer;
  }

  #return {
    position: absolute;
    top: 17.5%;
    font-size: 24px;
    left: 91.25%;
    transform: translateX(-50%);
  }

  .imagediv {
    width: 1000px;
    display: block;
    margin: 0 auto;
  }
</style>