<script>
    export let text;
    let phase = false;
    let heading = false;
    if(text.split(" ")[0] === "Phase"){
        phase = true;
    }else if(text.split(" ").at(-1) === "seconds."){
        heading = true;
    }
</script>

<div class="action {phase ? "phase" : ""} {heading ? "heading" : ""}">{text}</div>

<style>
    .action {
        width: 100%;
        position: relative;
        background-color: darkgray;
        font-family: 'VT323', monospace;
    }

    .phase {
        background-color: dimgray;
        font-size: 28px;
        color: darkgray;
    }

    .heading {
        font-size: 30px;
        background-color: darkred;
        color: lightpink;
    }
</style>