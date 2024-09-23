<script lang="ts">
  import { onMount } from "svelte";
  import { Klassiker } from "$lib/data/klassiker";
  import { Pitas } from "$lib/data/pitas";
  import { Grillplatten } from "$lib/data/grillplatten";

  import logo from "$lib/assets/webp/herkules_icon_bunt.webp";
  import Kitchen from "$lib/assets/svg/nav/kitchen.svelte";
  import KitchenActive from "$lib/assets/svg/nav/kitchen_active.svelte";
  import Menu from "$lib/assets/svg/nav/menu.svelte";
  import MenuActive from "$lib/assets/svg/nav/menu_active.svelte";
  import Orders from "$lib/assets/svg/nav/orders.svelte";
  import OrdersActive from "$lib/assets/svg/nav/orders_active.svelte";

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

  // Navbar
  enum navElement {
    Menu,
    Orders,
    Kitchen,
  }
  let navActive: navElement = navElement.Menu;

  function handleNav(navClicked: navElement) {
    navActive = navClicked;
  }

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

  let kategorieSelected = "";

  function jumpToKategorie(kategorie: string) {
    kategorieSelected = kategorie;

    const element = document.getElementById(kategorie);
    if (element) {
      element.scrollIntoView();
    }
  }
</script>

<div class="main">
  <div class="nav">
    <img alt="Herkules Grill Logo" src={logo} />
    <div class="container-nav-buttons">
      <a
        href="menu"
        class="nav-button"
        on:click={() => handleNav(navElement.Menu)}
      >
        {#if navActive === navElement.Menu}
          <div class="selected">
            <MenuActive />
          </div>
        {:else}
          <Menu />
        {/if}
      </a>
      <a
        href="menu"
        class="nav-button"
        on:click={() => handleNav(navElement.Orders)}
      >
        {#if navActive === navElement.Orders}
          <div class="selected">
            <OrdersActive />
          </div>
        {:else}
          <Orders />
        {/if}
      </a>
      <a
        href="menu"
        class="nav-button"
        on:click={() => handleNav(navElement.Kitchen)}
      >
        {#if navActive === navElement.Kitchen}
          <div class="selected">
            <KitchenActive />
          </div>
        {:else}
          <Kitchen />
        {/if}
      </a>
    </div>
  </div>

  <div class="menu">
    <div class="menu-header">
      <p>{date}</p>
      <p>{hours}:{minutes}:{seconds} Uhr</p>
      <div class="container-kategorien">
        {#each kategorien as kategorie}
          <button
            class:selected={kategorieSelected === kategorie}
            class="btn-kategorie"
            on:click={() => jumpToKategorie(kategorie)}
          >
            {kategorie}
          </button>
        {/each}
      </div>
    </div>

    <div class="menu-sections">
      <section id={kategorien[0]}>
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
      </section>
      <section id={kategorien[1]}>
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
      </section>
      <section id={kategorien[2]}>
        <div class="header-kategorie">Gyrosteller</div>
        <div class="container-speisen">
          <div class="card-speise">Gyrosteller</div>
        </div>
      </section>
      <section id={kategorien[3]}>
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
      </section>
      <section id={kategorien[4]}>
        <div class="header-kategorie">Überbacken</div>
      </section>
        </div>
    </div>

  <div class="sum">Bye</div>
</div>

<style>
</style>
