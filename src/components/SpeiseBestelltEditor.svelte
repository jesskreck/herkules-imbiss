<script lang="ts">
    import type { Speise, SpeiseBestellt, Zutat } from "$lib/types";
    import Counter from "./Counter.svelte";
    import ZutatButton from "./ZutatButton.svelte";
    import { bestellungStore } from "../stores/Bestellung";
    import ButtonToggler from "./ButtonToggler.svelte";
    import { closeModal } from "../stores/Modal";
  
    export let speise: SpeiseBestellt;
  

  </script>
  
<h1>{speise}</h1>