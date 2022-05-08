<script>
    import {createEventDispatcher} from 'svelte';
    import {fade} from 'svelte/transition';
    import {slide} from 'svelte/transition';
    import {quadIn} from 'svelte/easing';
    import {bounceOut} from 'svelte/easing';
    import Hoverable from './Hoverable.svelte'
    const dispatch = createEventDispatcher();
    let classes = [
        {
            name: "Assassin",
            showing: false,
            builds: [
                {
                    name: "Flameshot Hilt Tierstack",
                    stats: {
                        hp: 100,
                        dex: 200,
                        agi: 69420
                    }
                },
                {
                    name: "Anvil Crawler Heavy Melee"
                },
                {
                    name: "Black Spellspam"
                },
                {
                    name: "Inferno Tierstack"
                },
                {
                    name: "Bygones Tierstack"
                },
            ]
        },
        {
            name: "Warrior",
            showing: false,
            builds: [
                {
                    name: "Collapse Tierstack"
                },
                {
                    name: "Guardian Tank"
                },
                {
                    name: "Tidebinder Spellspam"
                },
                {
                    name: "Infidel Spellspam"
                },
                {
                    name: "Apocalypse Spellspam"
                }
            ]
        },
        {
            name: "Mage",
            showing: false,
            builds: [
                {
                    name: "King of Hearts Healer Tank (Dualwield Nepta Floodbringer)"
                },
                {
                    name: "Morph + The Nothing Spellspam"
                },
                {
                    name: "The Nothing Spellspam"
                },
                {
                    name: "Nepta Floodbringer Spellspam"
                },
                {
                    name: "Peaceful Rest Spellspam"
                },
                {
                    name: "Singularity Tierstack"
                }
            ]
        },
        {
            name: "Archer",
            showing: false,
            builds: [
                {
                    name: "Orange Lily Spellspam"
                },
                {
                    name: "Divzer Spellspam"
                },
                {
                    name: "Freedom Spellspam"
                }
            ]
        },
        {
            name: "Shaman",
            showing: false,
            builds: [
                {
                    name: "Cryoseim Spellspam"
                },
                {
                    name: "Hadal Spellspam"
                },
                {
                    name: "Toxoplasmosis Poison"
                },
                {
                    name: "Aftershock Tierstack"
                }
            ]
        }
    ]

    function choose(stats){
        dispatch("load", stats)
    }
    
    function back(){
        dispatch("back")
    }
</script>


<div id="selectors" out:fade={{easing: bounceOut, duration: 400}} in:fade={{easing: bounceOut, duration: 400}}>
{#each classes as obj}
    <Hoverable let:hovering={hovering}><button class="buildbtn {hovering ? "hover" : ""}" on:click={function(){obj.showing = !obj.showing}}>{obj.name}</button></Hoverable>
    {#if obj.showing}
        {#each obj.builds as build}
            <Hoverable let:hovering={hovering}><div out:slide={{easing: quadIn, duration: 350}} in:slide={{easing: quadIn, duration: 350}} class="build {hovering ? "hover" : ""}" on:click={() => choose(build.stats)}>{build.name}</div></Hoverable>
        {/each}
    {/if}
{/each}
</div>
<div id="backDiv"><Hoverable let:hovering={hovering}><button id="back" class="{hovering ? "hover" : ""}" on:click={back}>Back</button></Hoverable></div>

<style>
    #selectors {
        margin-top: 125px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .buildbtn {
        font-size: 18px;
        background-color: limegreen;
        border: 4px double green;
        margin: 5px 0;
        -webkit-touch-callout: none; 
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .build {
        margin: 4px 0;
        padding: 5px;
        background-color: silver;
        border: 1px solid black;
        border-radius: 8px;
        color: black;
        font-family: 'Water Brush', cursive;
        font-weight: bold;
    }

    .hover {
        opacity: 0.8;
        cursor: pointer;
    }

    #back {
        display: block;
        background-color: red;
        border: 2px solid darkred;
        font-size: 20px;
    }

    #backDiv {
        display: block;
        margin: 50px auto 0 auto;
        text-align: center;
    }
</style>