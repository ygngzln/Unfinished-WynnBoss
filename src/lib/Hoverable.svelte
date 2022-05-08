<script>
	let hovering;

	function enter() {
		hovering = true;
	}

	function leave() {
		hovering = false;
	}
</script>

<div on:mouseenter={enter} on:mouseleave={leave} class="hov">
	<slot hovering={hovering}></slot>
</div>

<style>
    .hov {
        display:inline-block;
    }
</style>