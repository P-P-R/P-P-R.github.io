let lastScrollTop = 0;
const runner = document.getElementById("scroll-runner");

// Kontrollerar att roboten faktiskt finns på sidan innan skriptet körs
if (runner) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    // Känner av om skärmen är stor (dator) eller liten (mobil)
    const isMobile = window.innerWidth <= 900;

    // Anpassar springbanan
    if (isMobile) {
      runner.style.left = `calc(${scrollPercent * 90}%)`;
    } else {
      runner.style.left = `calc(320px + ${scrollPercent * 70}%)`;
    }

    // Vänder roboten
    let direction = 1;
    if (scrollTop < lastScrollTop) {
      direction = -1;
    }

    runner.style.setProperty("--dir", direction);
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// --- Hantera den galna robot-animationen vid sidbyte ---
const pageLinks = document.querySelectorAll(
  'a[href="projects.html"], a[href="index.html"]',
);

pageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Pausa det vanliga sidbytet
    e.preventDefault();
    const targetUrl = link.href;

    if (runner) {
      // Avbryt den mjuka skroll-övergången
      runner.style.transition = "none";
      // Starta den snurrande "warp-speed"-animationen
      runner.classList.add("warp-speed");
    }

    // Vänta exakt 1 sekund (1000 millisekunder) och byt sedan sida
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1000);
  });
});
