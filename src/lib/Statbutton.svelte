<script>
    import Hoverable from './Hoverable.svelte'
    export let text;
</script>

<Hoverable let:hovering={hovering}><button on:click class="{hovering ? "hover" : ""}">{text}</button></Hoverable>

<style>
    button {
        background-color: red;
        border: 2px solid darkred;
        border-radius: 8px;
        font-size: 20px;
    }

    .hover {
        opacity: 0.75;
        cursor: pointer;
    }
</style>