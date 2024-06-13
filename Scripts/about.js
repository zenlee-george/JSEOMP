// Navbar
function togglemenu() {
  document.querySelectorAll(".nav-container").forEach((item) => {
    item.classList.toggle("show-menu");
  });
  document.querySelectorAll(".nav").forEach((item) => {
    item.classList.toggle("show-menu");
  });
  document.querySelector(".navbutton").classList.toggle("show-menu");
}

document.querySelector(".navbutton").addEventListener("mouseover", () => {
  document.querySelector(".bar-top").classList.add("move");
  document.querySelector(".bar-middle").classList.add("move");
  document.querySelector(".bar-bottom").classList.add("move");
});

document.querySelector(".navbutton").addEventListener("mouseout", () => {
  document.querySelector(".bar-top").classList.remove("move");
  document.querySelector(".bar-middle").classList.remove("move");
  document.querySelector(".bar-bottom").classList.remove("move");
});