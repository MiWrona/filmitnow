document.querySelector(".hamburger").addEventListener("click", () => {
  const hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("expanded");
  document.querySelector(".nav-links").classList.toggle("expanded");
});
