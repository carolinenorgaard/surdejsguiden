// Formålet med hele koden:
// Koden styrer burger-menuen på din hjemmeside
// burgerMenu.js sørger for at mobilmenuen (burger-menuen) på din hjemmeside kan åbnes og lukkes,
// når brugeren klikker på burger-ikonet (de tre streger).
// Det er nyttigt på mobil og tablet, hvor pladsen er begrænset, og menuen derfor normalt er skjult.

//Hvordan virker den teknisk?
// Koden styrer synligheden af navigationsmenuen, så den kun vises, når brugeren ønsker det – og ellers holdes skjult.
// Koden gør følgende:
// 1. Venter på at hele HTML-siden er færdig med at loade.
// 2. Finder to vigtige elementer i HTML’en:
// - menuButton: selve burger-ikonet brugeren klikker på.
// - menuLinks: navigationen der skal vises/skjules.
// 3. Lytter efter klik på burger-knappen.
// 4. Når der klikkes:
// - Den tilføjer eller fjerner Tailwind-klassen hidden på navigationen.
// - Klassen hidden styrer om menuen er usynlig (skjult) eller synlig (vises).

// Denne linje fortæller JavaScript, at vi skal vente med at køre vores kode,
// indtil hele HTML'en (DOM'en) er blevet indlæst af browseren.
// - DOMContentLoaded: betyder at vi først vil køre vores kode, når hele DOM’en (Document Object Model) er klar.
// Uden dette kunne koden fejle, fordi elementer som:
// - menuLinks
// - og menuButton måske ikke er indlæst endnu.
// document: er HTML'en
// addEventListener: er en indbygget funktion i javascript, der tager to parameter som adskilles af et komma
// 1. parameter er hvad der lyttes efter, i dette tilfælde "DOMContentLoaded"
// 2. parameter er den funktion der kaldes når første parameter er sand/korrekt "function"

//Denne linje starter din JavaScript-kode først, når hele HTML-dokumentet er klar. Det forhindrer fejl, hvis du prøver at bruge elementer, der endnu ikke er blevet indlæst.
// document: Repræsenterer hele HTML-siden (DOM'en).
// addEventListener(): en indbygget funktion i javascript, bruges til at "lytte" efter en brugerhandling, fx: "DOMContentLoaded", "click"  osv.
// "DOMContentLoaded": event-type (en tekstværdi) – angiver hvornår JavaScript-koden skal køres.
// function (): anonym funktion – det stykke kode der bliver kørt, når eventen opstår.
document.addEventListener("DOMContentLoaded", function () {
  // const: Her opretter vi en variabel, som peger på HTML-elementet med id="menuLinks".
  // id="menuLinks": Dette element er din navigation (dvs. selve <nav> eller <ul> med links).
  // - I din HTML er det det område, der bliver vist/skjult, når brugeren klikker på burger-menuen.
  // - getElementById("menuLinks") søger i HTML’en efter elementet med id menuLinks.
  // - Elementet repræsenterer navigationen, som du vil vise og skjule.
  const menuLinks = document.getElementById("menuLinks");
  //Her opretter vi en variabel, som peger på knappen med id="menuButton".
  // Det er burger-menu-ikonet – de tre vandrette streger brugeren klikker på.
  // - menuButton er det klikbare ikon, typisk en <button> med en <i class="fa-bars"> fra Font Awesome.
  // - Når brugeren klikker på denne knap, ønsker vi at åbne/lukke menuen.
  const menuButton = document.getElementById("menuButton");

  // Her tilføjer vi en event-listener til knappen, som lytter efter et klik.
  // Når brugeren klikker, køres funktionen i de næste { ... } linjer.
  // - addEventListener("click", ...) betyder: "Når brugeren klikker på menuButton, så udfør denne funktion."
  // - Det gør koden interaktiv – uden dette sker der intet, når man klikker på knappen.
  menuButton.addEventListener("click", function () {
    // Når brugeren klikker, toggler vi (skifter mellem) klassen "hidden" på menuLinks.
    // - classList.toggle("hidden") fjerner klassen hvis den findes, og tilføjer den hvis den ikke findes.
    // Klassen "hidden" kommer fra Tailwind CSS og betyder "display: none;" – altså elementet skjules.
    // Det er det, der skaber den åbne/luk-effekt.
    menuLinks.classList.toggle("hidden");
  });
});

// Forklaring på hvad der sker:
// - Hvis menuLinks har klassen hidden, fjernes den → menuen vises.
// - Hvis menuLinks ikke har klassen hidden, tilføjes den → menuen skjules.
// i Klassen hidden i Tailwind CSS betyder:
// .hidden {
// display: none;
// }
// - Elementet vises ikke og optager ingen plads i layoutet.
// - Hvorfor toggle?
// - Det er en enkel og effektiv måde at skifte tilstand på (vis/skjul).
// - Brugeren klikker én gang = menu vises.
// - Klikker igen = menu skjules.
