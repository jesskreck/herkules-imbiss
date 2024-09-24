<script lang="ts">

    let count = 1;

    function decrement() {
		if (count > 0) {
            count -= 1;
        }
	}

    function increment() {
        count += 1;
	}

</script>


<div class="counter">
    <button on:click={decrement}> – </button>
    <div>{count}</div>
    <button on:click={increment}> + </button>
</div>