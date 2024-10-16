<!-- Layout erst wieder aktivieren wenn Navigationsleiste links benötigt wird -->
<script lang="ts">
  import "../app.scss";
  import { page } from '$app/stores';

  import logo from "$lib/assets/webp/herkules_icon_bunt.webp";
  import Kitchen from "$lib/assets/svg/nav/kitchen.svelte";
  import KitchenActive from "$lib/assets/svg/nav/kitchen_active.svelte";
  import Menu from "$lib/assets/svg/nav/menu.svelte";
  import MenuActive from "$lib/assets/svg/nav/menu_active.svelte";
  import Orders from "$lib/assets/svg/nav/orders.svelte";
  import OrdersActive from "$lib/assets/svg/nav/orders_active.svelte";

  const navItems = [
    {
      path: '/menu',
      icon: Menu,
      iconActive: MenuActive,
    },
    {
      path: '/bestellungen',
      icon: Orders,
      iconActive: OrdersActive,
    },
    {
      path: '/kueche',
      icon: Kitchen,
      iconActive: KitchenActive,
    },
  ];
</script>

<div class="main">
  <div class="nav">
    <img alt="Herkules Grill Logo" src={logo} />
    <div class="container-nav-buttons">
      {#each navItems as item}
        <a href={item.path} class="nav-button">
          {#if $page.url.pathname === item.path}
            <div class="selected">
              <svelte:component this={item.iconActive} />
            </div>
          {:else}
            <svelte:component this={item.icon} />
          {/if}
        </a>
      {/each}
    </div>
  </div>
  <slot></slot>
</div>
