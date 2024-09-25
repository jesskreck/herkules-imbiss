<script lang="ts">
  import type { Bestellung, Speise } from '$lib/types';
    import { bestellungStore } from '../stores/Bestellung';
    import { get } from 'svelte/store';
  
    // Direkt den Wert der Bestellung aus dem Store holen
    let bestellung: Bestellung;

    bestellungStore.subscribe((b) => {
        bestellung = b;
        console.log(bestellung);
    })

    function getZutatenliste(speise: Speise) {
        let zutaten = [...speise.zutaten, ...(speise.sauce || [])]
        return zutaten.filter(zutat => zutat.menge === 1).map(zutat => zutat.name)
    }

  </script>
  
  <h2>Bestellübersicht</h2>
  
  <!-- Zeige die Liste der bestellten Speisen an -->
    {#each bestellung.speisen as speiseBestellt}
      
        <h3>#{speiseBestellt.speise.nr} {speiseBestellt.speise.name}</h3>
        <ul>
            {#each getZutatenliste(speiseBestellt.speise) as zutat}
            <li>{zutat}</li>
            {/each}
        </ul>
        <p>Menge: {speiseBestellt.menge}</p>
        <p>Gesamtpreis: {speiseBestellt.gesamtpreis.toFixed(2)}€</p>
        {#if speiseBestellt.notiz}
          <p>Notiz: {speiseBestellt.notiz}</p>
        {/if}
    
    {/each}
  
  <!-- Zeige den Gesamtpreis der gesamten Bestellung -->
  <p><strong>Gesamtpreis: {bestellung.gesamtpreis.toFixed(2)}€</strong></p>
  