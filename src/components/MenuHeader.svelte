<script lang="ts">
  export let kategorieSelected = "";
  
  import { onMount } from "svelte";
  
  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Grillplatten } from "$lib/data/grillplatten";
  import { Gyrosteller } from "$lib/data/gyrosteller";
  import { Ueberbacken } from "$lib/data/ueberbacken";
  import { Salate } from "$lib/data/salate";

  import logo from "$lib/assets/webp/herkules_icon_bunt.webp";

  // States
  let kategorien = [
    { name: "Klassiker", speisen: Klassiker },
    { name: "Pitas", speisen: Pitas },
    { name: "Gyrosteller", speisen: Gyrosteller },
    { name: "Grillplatten", speisen: Grillplatten },
    { name: "Überbacken", speisen: Ueberbacken },
    { name: "Salate", speisen: Salate },
    // { name: "Getränke", speisen: },
  ];

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

  // Functions
  function jumpToKategorie(kategorie: string) {
    kategorieSelected = kategorie;

    const element = document.getElementById(kategorie);
    if (element) {
      element.scrollIntoView();
    }
  }
</script>

<div class="menu_header-logo">
  <img alt="Herkules Grill Logo" src={logo} />
</div>
<p class="menu_header-time">{hours}:{minutes}:{seconds} Uhr</p>
<p class="menu_header-date">{date}</p>
<div class="menu_header-jumpToCategory">
  {#each kategorien as kategorie}
    <button
      class:selected={kategorieSelected === kategorie.name}
      class="btn-kategorie"
      on:click={() => jumpToKategorie(kategorie.name)}
    >
      {kategorie.name}
    </button>
  {/each}
</div>
