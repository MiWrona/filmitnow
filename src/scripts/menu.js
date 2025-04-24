document.querySelector(".hamburger").addEventListener("click", () => {
  const hamburger = document.querySelector(".hamburger");
  hamburger.classList.toggle("expanded");
  document.querySelector(".nav-secondary-col").classList.toggle("rwd-backdrop-filter-blur");
  document.querySelector(".nav-links").classList.toggle("expanded");
});



  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const triggerPoint = window.innerHeight * 0.5; // 50vh

    if (scrollY > triggerPoint) {
      header.classList.add("backdrop-filter-blur");
    } else {
      header.classList.remove("backdrop-filter-blur");
    }
  });
