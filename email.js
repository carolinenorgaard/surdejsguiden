// vi definere en funktion der hedder sendEmail, som vi gerne vil kunne kalde på et senere tidspunkt
// funktionen har ansvar for at sende en email via EmailJS, og disable knappen for at forhindre dobbeltklik, og vise en alert når emailen er sendt
// den sætter også feltet til email til en tom værdi når emailen er sendt

// Opretter en funktion med navnet sendEmail.
// Den bliver kaldt, når formularen indsendes, (typisk ved klik på en knap)
// Funktionen indeholder alt, hvad der skal ske, når en bruger prøver at tilmelde sig nyhedsbrevet - indkapsler hele processen for e-mail-afsendelse
function sendEmail() {
  // Finder HTML-elementet med id'et "sendEmail" (formentlig en knap).
  // Deaktiverer knappen ved at sætte disabled = true, så brugeren ikke kan klikke flere gange under afsendelse.
  // (fx hvis de klikker hurtigt eller dobbelt) - Det beskytter både mod dobbelt-afsendelser og utilsigtede fejl i EmailJS.
  document.getElementById("sendEmail").disabled = true;

  // Try to send the email
  // Kalder emailjs.send(), som er en funktion fra EmailJS
  // – en tjeneste der tillader at sende e-mails fra JavaScript uden backend.
  // Den har tre parametre:
  // 1. "service_ovb2eud" = ID på den EmailJS-service (hvilken e-mailudbyder du bruger – fx Gmail, Outlook, Mailgun).
  // 2. "template_73ixwys" = ID på den EmailJS-skabelon (template) - som indeholder fx. emne, layout, osv
  // 3. Objektet med de data, der skal sendes i e-mailen (fx modtagerens e-mailadresse, navn osv.).
  emailjs
    .send("service_ovb2eud", "template_73ixwys", {
      // email: Her henter vi den værdi, brugeren har skrevet i email-feltet (id="email") og sender den som email.
      // "Nye medlem" er en fast tekst, som bliver brugt i e-mailen som navnefelt.
      email: document.getElementById("email").value,
      name: "Nye medlem",
    })

    // Denne del udføres hvis e-mailen blev sendt korrekt.
    // then() er en "callback-funktion", som kører når EmailJS returnerer succes (statuskode 200 OK).
    .then((response) => {
      // Logger EmailJS' svar i udviklerkonsollen -  godt til fejlfinding.
      console.log("🚀 ~ sendEmail ~ response:", response);

      // Rydder inputfeltet for e-mail, så det er tomt efter afsendelse - signalerer at e-mailen er sendt.
      document.getElementById("email").value = "";

      // Viser en popup-besked til brugeren om, at e-mailen blev sendt
      alert("Email sent successfully!");
    })
    // Denne del håndterer fejl, altså hvis e-mailen ikke blev sendt korrekt
    // fx: at EmailJS er offline, at e-mailen ikke kunne leveres, at skabelonen er slettet, ingen internetforbindelse
    .catch((error) => {
      // Logger fejlen i udviklerkonsollen, så vi kan se hvad der gik galt
      console.log("🚀 ~ sendEmail ~ error:", error);
      alert("Failed to send email. Please try again later.");
    })

    // finally-blokken kører altid uanset om afsendelsen lykkedes eller fejlede - uanset om then() eller .catch() blev udført.
    // Det sikrer, at knappen altid bliver aktiveret igen, så brugeren kan prøve igen uden at skulle reloade siden.
    .finally(() => {
      // Genaktiverer send-knappen, så brugeren kan forsøge igen eller sende en ny e-mail.
      document.getElementById("sendEmail").disabled = false;
    });
}
// funktion: sender kontaktformularen
// Her defineres en funktion ved navn sendForm, som bruges til at sende data fra en kontaktformular via EmailJS.
function sendForm() {
  // Finder HTML-elementet med id="sendForm" — typisk en "Send" knap.
  // Sætter den til at være deaktiveret, så brugeren ikke kan klikke flere gange mens formularen sendes.
  document.getElementById("sendForm").disabled = true;

  // Kalder emailjs.send() — en funktion fra EmailJS, der sender e-mails uden behov for server-side kode.
  // Bruger en anden skabelon fra EmailJS – fx én der sender navn, telefon og besked.
  // De første to parametre:
  // "service_ovb2eud" = din EmailJS service ID.
  // "template_t8e69yo" = ID'et på den skabelon (template), du har lavet i EmailJS.
  emailjs
    .send("service_ovb2eud", "template_t8e69yo", {
      //Henter brugerens indtastninger fra formularfelterne.
      // Disse skal matche variabelnavnene i EmailJS-skabelonen, ellers bliver de ikke sendt med.
      // Du opretter et objekt med de data, der skal sendes til skabelonen
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("mail").value,
      message: document.getElementById("message").value,
    })

    // .then() udføres hvis e-mailen blev sendt korrekt.
    // response indeholder info om EmailJS’ svar (bliver kun brugt til logning her).
    .then((response) => {
      // Udviklerlog i browserens konsol. Bruges til fejlsøgning og debugging.
      console.log("🚀 ~ sendForm ~ response:", response);
      // Rydder alle inputfelter i formularen.
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("message").value = "";
      // Viser en besked til brugeren om, at e-mailen/beskeden blev sendt med succes.
      alert("Form sent successfully!");
    })
    // Hvis noget går galt (fx internetproblemer eller forkert EmailJS-opsætning), bliver .catch() udført.
    .catch((error) => {
      // Fejllog, så udvikleren kan se hvad der gik galt.
      console.log("🚀 ~ sendForm ~ error:", error);
      // Viser fejlmeddelelse til brugeren.
      alert("Failed to send form. Please try again later.");
    })
    // finally udføres uanset om .then() eller .catch() blev udført.
    .finally(() => {
      // Genaktiverer "Send" knappen, så brugeren kan sende igen.
      document.getElementById("sendForm").disabled = false;
    });
}

// Her aktivere vi emailjs med vores public key, når vi er sikre på at DOM'en/document. er loaded (DOM'en = HTML'en)
// Derudover sætter vi en event listener på vores form, så når den bliver submitted, så kalder vi sendEmail funktionen
// Vi bruger event.preventDefault() for at forhindre at siden reloader, og vi sender emailen via sendEmail funktionen

// Koden her venter til hele HTML'en er indlæst (DOM = Document Object Model).
// Når hele HTML’en er indlæst, kører denne funktion.
// Det sikrer, at knapper og formularer eksisterer i DOM’en, inden vi prøver at tilgå dem.
document.addEventListener("DOMContentLoaded", function () {
  // Initialiserer EmailJS med din offentlige nøgle - den identificerer dig som afsender.
  // emailjs.init() gør EmailJS klar til at sende e-mails i browseren.
  // Den anonyme funktion (() => {})() kaldes med det samme — også kaldet en IIFE
  (function () {
    emailjs.init({
      publicKey: "UGU04UcIKCf-ty6-C",
    });
  })();

  // Emailformular
  // Håndtering af form-indsendelse
  // Finder den formular der har id'et "emailForm" (hvis den findes).
  // Finder nyhedsbrevsformularen i DOM’en (hvis den findes).
  const form = document.getElementById("emailForm");

  // Hvis formularen findes:
  // Lytter vi på submit-event.
  if (form) {
    form.addEventListener("submit", function (event) {
      // event.preventDefault() forhindrer browseren i at reloade siden.
      event.preventDefault();
      // I stedet kalder vi sendEmail(), som sender data via JavaScript i baggrunden (asynkront).
      sendEmail();
    });
  }

  // Kontaktformular
  // Håndtering af form-indsendelse
  // Finder den formular der har id'et "contactForm" (hvis den findes).
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // event.preventDefault() forhindrer browseren i at reloade siden.
      event.preventDefault();
      // I stedet kalder vi funktionen sendForm() som kører, hvis den formular findes på siden. Som sender data via JavaScript i baggrunden (asynkront).
      sendForm();
    });
  }
});

// Altså det vi har gjort er at vi har lavet en funktion der hedder sendEmail, som sender en email via emailjs.

// Hele flowet i praksis:
// 1. Brugeren indtaster sin e-mail eller udfylder kontaktformular.
// 2. Trykker på "Send" ➝ knappen bliver deaktiveret.
// 3. JavaScript fanger submit og stopper browseren fra at reloade.
// 4. EmailJS får sendt data til din valgte skabelon.
// 5. Bruger får besked via alert().
// 6. Felterne bliver nulstillet, og knappen bliver aktiv igen.
