// vi definere en funktion der hedder sendEmail, som vi gerne vil kunne kalde på et senere tidspunkt
// funktionen har ansvar for at sende en email via EmailJS, og disable knappen for at forhindre dobbeltklik, og vise en alert når emailen er sendt
// og re-enable knappen når emailen er sendt eller fejler
// den sætter også feltet til email til en tom værdi når emailen er sendt
function sendEmail() {
  // disable the button
  document.getElementById("sendEmail").disabled = true;

  // Try to send the email
  emailjs
    .send("service_5yh9czr", "template_73ixwys", {
      email: document.getElementById("email").value,
      name: "Nye medlem",
    })
    // if the email is sent successfully
    .then((response) => {
      console.log("🚀 ~ sendEmail ~ response:", response);
      // Clear the form fields after sending the email
      document.getElementById("email").value = "";
      alert("Email sent successfully!");
    })
    // if the email is not sent successfully
    .catch((error) => {
      console.log("🚀 ~ sendEmail ~ error:", error);
      alert("Failed to send email. Please try again later.");
    })
    // always re-enable the button
    .finally(() => {
      // Always re-enable the button no matter what
      document.getElementById("sendEmail").disabled = false;
    });
}

function sendForm() {
  // disable the button
  document.getElementById("sendForm").disabled = true;

  // Try to send the form data
  emailjs
    .send("service_5yh9czr", "template_t8e69yo", {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("mail").value,
      message: document.getElementById("message").value,
    })
    // if the form is sent successfully
    .then((response) => {
      console.log("🚀 ~ sendForm ~ response:", response);
      // Clear the form fields after sending the the forrm
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("message").value = "";
      // Show a success alert
      alert("Form sent successfully!");
    })
    // if the form is not sent successfully
    .catch((error) => {
      console.log("🚀 ~ sendForm ~ error:", error);
      alert("Failed to send form. Please try again later.");
    })
    // always re-enable the button
    .finally(() => {
      // Always re-enable the button no matter what
      document.getElementById("sendForm").disabled = false;
    });
}

// Her aktivere vi emailjs med vores public key, når vi er sikre på at DOM'en/document. er loaded (DOM'en = HTML'en)
// Derudover sætter vi en event listener på vores form, så når den bliver submitted, så kalder vi sendEmail funktionen
// Vi bruger event.preventDefault() for at forhindre at siden reloader, og vi sender emailen via sendEmail funktionen

// Wait for the DOM to be loaded (HTML)
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the emailjs service
  (function () {
    emailjs.init({
      publicKey: "UGU04UcIKCf-ty6-C",
    });
  })();

  const form = document.getElementById("emailForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      // stop default behavior (add url parameters)
      event.preventDefault();
      // Send the email
      sendEmail();
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      // stop default behavior (add url parameters)
      event.preventDefault();
      // Send the email
      sendForm();
    });
  }
});

// Altså det vi har gjort er at vi har lavet en funktion der hedder sendEmail, som sender en email via emailjs
