<script lang="ts">
  import biftekiImage from '$lib/assets/webp/zutaten/bifteki.webp';
  import bratwurstImage from '$lib/assets/webp/zutaten/bratwurst.webp';
  import currywurstImage from '$lib/assets/webp/zutaten/currywurst.webp';
  import fetaImage from '$lib/assets/webp/zutaten/feta.webp';
  import grillkaeseImage from '$lib/assets/webp/zutaten/grillkaese.webp';
  import gyrosImage from '$lib/assets/webp/zutaten/gyros.webp';
  import haehnchenImage from '$lib/assets/webp/zutaten/haehnchen.webp';
  import ketchupImage from '$lib/assets/webp/zutaten/ketchup.webp';
  import krautImage from '$lib/assets/webp/zutaten/kraut.webp';
  import mayoImage from '$lib/assets/webp/zutaten/mayo.webp';
  import pitaImage from '$lib/assets/webp/zutaten/pita.webp';
  import pommesImage from '$lib/assets/webp/zutaten/pommes.webp';
  import salatImage from '$lib/assets/webp/zutaten/salat.webp';
  import senfImage from '$lib/assets/webp/zutaten/senf.webp';
  import steakImage from '$lib/assets/webp/zutaten/steak.webp';
  import suflakiImage from '$lib/assets/webp/zutaten/suflaki.webp';
  import tzazikiImage from '$lib/assets/webp/zutaten/tzaziki.webp';
  import veggieImage from '$lib/assets/webp/zutaten/veggie.webp';
  import zwiebelImage from '$lib/assets/webp/zutaten/zwiebel.webp';

  export let name: string;

  let imagePath: string;

  switch (name) {
    case "Bifteki":
      imagePath = biftekiImage;
      break;
    case "Bratwurst":
      imagePath = bratwurstImage;
      break;
    case "Currywurst":
      imagePath = currywurstImage;
      break;
    case "Feta":
      imagePath = fetaImage;
      break;
    case "Peperoni":
      imagePath = fetaImage;
      break;
    case "Oliven":
      imagePath = fetaImage;
      break;
    case "Feta mit Salat":
      imagePath = fetaImage;
      break;
    case "Grillkäse":
      imagePath = grillkaeseImage;
      break;
    case "Gyros":
      imagePath = gyrosImage;
      break;
    case "Hähnchen":
      imagePath = haehnchenImage;
      break;
    case "Ketchup":
      imagePath = ketchupImage;
      break;
    case "Kraut":
      imagePath = krautImage;
      break;
    case "Mayo":
      imagePath = mayoImage;
      break;
    case "Pita":
      imagePath = pitaImage;
      break;
    case "Pommes":
      imagePath = pommesImage;
      break;
    case "Salat":
      imagePath = salatImage;
      break;
    case "Senf":
      imagePath = senfImage;
      break;
    case "Steak":
      imagePath = steakImage;
      break;
    case "Suflaki":
      imagePath = suflakiImage;
      break;
    case "Tzaziki":
      imagePath = tzazikiImage;
      break;
    case "Veggie":
      imagePath = veggieImage;
      break;
    case "Zwiebeln":
      imagePath = zwiebelImage;
      break;
    default:
      imagePath = ''; // Default fallback
      break;
  }
</script>

{#if imagePath}
  <img src={imagePath} alt={name} />
{/if}
