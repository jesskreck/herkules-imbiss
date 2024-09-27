<script lang="ts">

    export let count: number = 1;
    export let bigger: boolean = false;
    
    function increment() {
        count += 1;
    }

    function decrement() {
		if (count > 0) {
            count -= 1;
        }
	}

</script>


<div class="counter" class:bigger={bigger}>
    <button  on:click={decrement}> – </button>
    <div class="counter-number">{count}</div>
    <button on:click={increment}> + </button>
</div>