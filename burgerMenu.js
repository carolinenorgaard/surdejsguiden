document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.getElementById("menuLinks");
  const menuButton = document.getElementById("menuButton");

  menuButton.addEventListener("click", function () {
    menuLinks.classList.toggle("hidden");
  });
});
