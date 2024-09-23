<script lang="ts">
  import { onMount } from "svelte";
  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Grillplatten } from "$lib/data/grillplatten";

  // Datumanzeige
  let time = new Date();
  let timeformat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  $: date = time.toLocaleDateString("de-DE", timeformat);
  $: hours = time.getHours().toString().padStart(2, "0");
  $: minutes = time.getMinutes().toString().padStart(2, "0");
  $: seconds = time.getSeconds().toString().padStart(2, "0");

  onMount(() => {
    const interval = setInterval(() => {
      time = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  // State
  let kategorien = [
    "Klassiker",
    "Pitas",
    "Gyrosteller",
    "Grillplatten",
    "Überbacken",
    "Salate",
    "Getränke",
  ];
</script>

<h1>Menu</h1>

<p>{date}</p>

<p>{hours}:{minutes}:{seconds} Uhr</p>

<div class="container-kategorien">
  {#each kategorien as kategorie}
    <div class="btn-kategorie">{kategorie}</div>
  {/each}
</div>

<div class="header-kategorie">Klassiker</div>
<div class="container-speisen">
    {#each Klassiker as speise}
    <div class="card-speise">
      <div class="card-speise-top">
          <p class="card-speise-number">#{speise.nr}</p>
          <p>{speise.preis.toFixed(2)}€</p>
      </div>
      <h3>{speise.name}</h3>
    </div>
  {/each}
</div>

<div class="header-kategorie">Pitas</div>
<div class="container-speisen">
  {#each Pitas as speise}
    <div class="card-speise">
      <div class="card-speise-top">
          <p class="card-speise-number">#{speise.nr}</p>
          <p>{speise.preis.toFixed(2)}€</p>
      </div>
      <h3>{speise.name}</h3>
    </div>
  {/each}
</div>

<div class="header-kategorie">Grillplatten</div>
<div class="container-speisen">
  {#each Grillplatten as speise}
    <div class="card-speise">
      <div class="card-speise-top">
          <p class="card-speise-number">#{speise.nr}</p>
          <p>{speise.preis.toFixed(2)}€</p>
      </div>
      <h3>{speise.name}</h3>
    </div>
  {/each}
</div>

<style>

  .container-kategorien {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .header-kategorie {
    padding: 4rem 0 1rem;
    color: var(--grey);
    font-size: larger;
    font-weight: 500;
  }

  .container-speisen {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    margin: 0 1rem;
  }

  .card-speise {
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.25);
    border-radius: 9px;
    padding: 0.75rem;
  }

  .card-speise-top {
    display: flex;
    justify-content: space-between;
  }

  .card-speise-number {
    line-height: 100%;
    font-size: 2.5rem;
    color: var(--primary);
    font-weight: 600; 
  }

  .card-speise h3 {
    font-weight: 600;
    padding-top: .5rem;
  }
</style>
