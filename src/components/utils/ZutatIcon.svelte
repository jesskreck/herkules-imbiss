<script lang="ts">
  export let name: string;

  //Variante 1 mit WebPs
  let imagePath: string;

  switch (name) {
    case "Bifteki":
      imagePath = "/src/lib/assets/webp/zutaten/bifteki.webp";
      break;
    case "Bratwurst":
      imagePath = "/src/lib/assets/webp/zutaten/bratwurst.webp";
      break;
    case "Currywurst":
      imagePath = "/src/lib/assets/webp/zutaten/currywurst.webp";
      break;
    case "Feta":
      imagePath = "/src/lib/assets/webp/zutaten/feta.webp";
      break;
    case "Grillkäse":
      imagePath = "/src/lib/assets/webp/zutaten/grillkaese.webp";
      break;
    case "Gyros":
      imagePath = "/src/lib/assets/webp/zutaten/gyros.webp";
      break;
    case "Hähnchen":
      imagePath = "/src/lib/assets/webp/zutaten/haehnchen.webp";
      break;
    case "Ketchup":
      imagePath = "/src/lib/assets/webp/zutaten/ketchup.webp";
      break;
    case "Kraut":
      imagePath = "/src/lib/assets/webp/zutaten/kraut.webp";
      break;
    case "Mayo":
      imagePath = "/src/lib/assets/webp/zutaten/mayo.webp";
      break;
    case "Pita":
      imagePath = "/src/lib/assets/webp/zutaten/pita.webp";
      break;
    case "Pommes":
      imagePath = "/src/lib/assets/webp/zutaten/pommes.webp";
      break;
    case "Salat":
      imagePath = "/src/lib/assets/webp/zutaten/salat.webp";
      break;
      case "Feta mit Salat":
      imagePath = "/src/lib/assets/webp/zutaten/salat.webp";
      break;
    case "Senf":
      imagePath = "/src/lib/assets/webp/zutaten/senf.webp";
      break;
    case "Steak":
      imagePath = "/src/lib/assets/webp/zutaten/steak.webp";
      break;
    case "Suflaki":
      imagePath = "/src/lib/assets/webp/zutaten/suflaki.webp";
      break;
    case "Tzaziki":
      imagePath = "/src/lib/assets/webp/zutaten/tzaziki.webp";
      break;
    case "Veggie":
    imagePath = "/src/lib/assets/webp/zutaten/veggie.webp";
    break;
    case "Zwiebeln":
      imagePath = "/src/lib/assets/webp/zutaten/zwiebel.webp";
      break;
  }

  // //Variante 2 mit SVGs
  // import BiftekiIsometric from "$lib/assets/svg/zutaten/bifteki_isometric.svelte";
  // import FetaIsometric from "$lib/assets/svg/zutaten/feta_isometric.svelte";
  // import GrillkaeseIsometric from "$lib/assets/svg/zutaten/grillkaese_isometric.svelte";
  // import GyrosIsometric from "$lib/assets/svg/zutaten/gyros_isometric.svelte";
  // import HaehnchenbrustIsometric from "$lib/assets/svg/zutaten/haehnchenbrust_isometric.svelte";
  // import KetchupIsometric from "$lib/assets/svg/zutaten/ketchup_isometric.svelte";
  // import KrautIsometric from "$lib/assets/svg/zutaten/kraut_isometric.svelte";
  // import MayoIsometric from "$lib/assets/svg/zutaten/mayo_isometric.svelte";
  // import PitaIsometric from "$lib/assets/svg/zutaten/pita_isometric.svelte";
  // import PommesIsometric from "$lib/assets/svg/zutaten/pommes_isometric.svelte";
  // import SaladIsometric from "$lib/assets/svg/zutaten/salad_isometric.svelte";
  // import SteakIsometric from "$lib/assets/svg/zutaten/steak_isometric.svelte";
  // import SuflakiIsometric from "$lib/assets/svg/zutaten/suflaki_isometric.svelte";
  // import TzazikiIsometric from "$lib/assets/svg/zutaten/tzaziki_isometric.svelte";
  // import ZwiebelIsometric from "$lib/assets/svg/zutaten/zwiebel_isometric.svelte";

  // const iconMap = {
  //   Bifteki: BiftekiIsometric,
  //   Feta: FetaIsometric,
  //   Grillkäse: GrillkaeseIsometric,
  //   Gyros: GyrosIsometric,
  //   Hähnchen: HaehnchenbrustIsometric,
  //   Ketchup: KetchupIsometric,
  //   Kraut: KrautIsometric,
  //   Mayo: MayoIsometric,
  //   Pita: PitaIsometric,
  //   Pommes: PommesIsometric,
  //   Salat: SaladIsometric,
  //   Steak: SteakIsometric,
  //   Suflaki: SuflakiIsometric,
  //   Tzaziki: TzazikiIsometric,
  //   Zwiebel: ZwiebelIsometric,
  // };

  // let icon = iconMap[name] || null;
</script>

{#if imagePath}
  <img src={imagePath} alt={name} />
{/if}

<!-- {#if icon}
  <svelte:component this={icon} />
{/if} -->
