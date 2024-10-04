<script lang="ts">
  import { setAbholzeit } from "../../stores/Bestellung";


    let date = new Date();
    date.setSeconds(0,0);
    let remainder = date.getMinutes() % 5;
    if (remainder !== 0) {
        date.setMinutes(date.getMinutes() + (5 - remainder))
    }

    let time = formatTime(date);

    function formatTime(date: Date): string {
        return date.toTimeString().slice(0, 5);
    }
    
    function increment() {
        date.setMinutes(date.getMinutes() + 10);
        time = formatTime(date);
        setAbholzeit(time);
    }

    function decrement() {
        let minutes = date.getMinutes();
		if (minutes >= 5 || date.getHours() > 0) {
            date.setMinutes(date.getMinutes() -5);
            time = formatTime(date)
            setAbholzeit(time);
        }
	}

</script>


<div class="counter bigger">
    <button  on:click={decrement}> – </button>
    <div class="counter-time">{time}</div>
    <button on:click={increment}> + </button>
</div>