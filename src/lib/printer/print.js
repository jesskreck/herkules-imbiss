// @ts-nocheck
const escpos = require("escpos");
escpos.USB = require("escpos-usb");

const device = new escpoos.USB();
const options = { encoding: "CP347" };
const printer = new escpos.Printer(device, options);

const printReceipt = () => {
  device.open(function () {
    printer
      .font("A")
      .style("normal")
      .align("ct")
      .size(1, 1)
      .text("Bestellübersicht")
      .text("==============================");

    // Drucken der einzelnen Bestellungen
    speisen.forEach((speise) => {
      printer
        .text(`${speise.speise.nr} - ${speise.speise.name}`)
        .text(`Menge: ${speise.menge}`)
        .text(`Preis: ${speise.gesamtpreis.toFixed(2)} €`);
      
      // Zutaten auflisten
      if (speise.speise.zutaten.length > 0) {
        printer.text("Zutaten:");
        speise.speise.zutaten.forEach((zutat) => {
          if (zutat.menge === 1) {
            printer.text(`- ${zutat.name}`);
          }
        });
      }

      printer.text("------------------------------");
    });

    // Liefergebühr drucken, wenn "Lieferung" ausgewählt
    if (bestelloption === "Lieferung" && liefergebuehr > 0) {
      printer.text(`Liefergebühr: ${liefergebuehr.toFixed(2)} €`);
    }

    // Gesamtpreis
    printer
      .text("==============================")
      .text(`Gesamtpreis: ${gesamtpreis.toFixed(2)} €`)
      .cut()
      .close();
  });

} 

// const printReceipt = (speisen, gesamtpreis, liefergebuehr, bestelloption) => {
//   // Öffne die Verbindung zum Drucker
//   device.open(function () {
//     printer
//       .font("A")
//       .style("normal")
//       .align("ct")
//       .size(1, 1)
//       .text("Bestellübersicht")
//       .text("==============================");

//     // Drucken der einzelnen Bestellungen
//     speisen.forEach((speise) => {
//       printer
//         .text(`${speise.speise.nr} - ${speise.speise.name}`)
//         .text(`Menge: ${speise.menge}`)
//         .text(`Preis: ${speise.gesamtpreis.toFixed(2)} €`);
      
//       // Zutaten auflisten
//       if (speise.speise.zutaten.length > 0) {
//         printer.text("Zutaten:");
//         speise.speise.zutaten.forEach((zutat) => {
//           if (zutat.menge === 1) {
//             printer.text(`- ${zutat.name}`);
//           }
//         });
//       }

//       printer.text("------------------------------");
//     });

//     // Liefergebühr drucken, wenn "Lieferung" ausgewählt
//     if (bestelloption === "Lieferung" && liefergebuehr > 0) {
//       printer.text(`Liefergebühr: ${liefergebuehr.toFixed(2)} €`);
//     }

//     // Gesamtpreis
//     printer
//       .text("==============================")
//       .text(`Gesamtpreis: ${gesamtpreis.toFixed(2)} €`)
//       .cut()
//       .close();
//   });
// };

// Exportiere die Funktion zum Drucken
module.exports = { printReceipt };
