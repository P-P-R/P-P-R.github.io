let lastScrollTop = 0;
const runner = document.getElementById("scroll-runner");

if (runner) {
  // 1. Skapa en funktion som räknar ut positionen
  function updateRunnerPosition() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    const isMobile = window.innerWidth <= 900;

    // Sätter rätt startposition direkt
    // Anpassar springbanan så roboten aldrig slår i ytterkanterna på små skärmar
    if (isMobile) {
      runner.style.left = `calc(75px + ${scrollPercent * 60}%)`;
    } else {
      runner.style.left = `calc(320px + ${scrollPercent * 70}%)`;
    }

    let direction = 1;
    if (scrollTop < lastScrollTop) {
      direction = -1;
    }

    runner.style.setProperty("--dir", direction);
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  // 2. Kör funktionen direkt när sidan laddas så den inte fastnar i menyn
  updateRunnerPosition();

  // 3. Kör funktionen varje gång användaren skrollar eller ändrar fönsterstorlek
  // 3. Kör funktionen varje gång användaren skrollar eller ändrar fönsterstorlek
  window.addEventListener("scroll", updateRunnerPosition);
  window.addEventListener("resize", updateRunnerPosition);

  // --- Retro Pratbubbla (Typewriter-effekt) ---
  const bubble = document.createElement("span");
  bubble.className = "speech-bubble";
  runner.appendChild(bubble);

  const message =
    "I am not an AI bot, but dont forget to check out my repositories!";
  let isTyping = false;

  runner.addEventListener("click", () => {
    if (isTyping) return;

    isTyping = true;
    bubble.classList.add("show");
    bubble.textContent = "";

    let i = 0;
    const typeWriter = setInterval(() => {
      bubble.textContent += message.charAt(i);
      i++;
      if (i === message.length) {
        clearInterval(typeWriter);
        setTimeout(() => {
          bubble.classList.remove("show");
          isTyping = false;
        }, 2000);
      }
    }, 80);
  });
}

// --- Lyser upp rätt länk i navbaren när man skrollar (Scrollspy) ---
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

// Bestämmer "träffytan" på skärmen
const observerOptions = {
  root: null,
  rootMargin: "-20% 0px -60% 0px",
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Ta bort active-klassen från alla länkar först
      navLinks.forEach((link) => link.classList.remove("active"));

      // Hitta länken som matchar sektionens ID och tänd den
      const activeId = entry.target.getAttribute("id");
      const activeLink = document.querySelector(
        `nav ul li a[href="#${activeId}"]`,
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}, observerOptions);

// Be observern hålla koll på alla sektioner
sections.forEach((section) => observer.observe(section));

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
      // Lägg till klassen som flyttar och animerar roboten
      runner.classList.add("warp-speed");
    }

    // Vänta 1.2 sekunder (1200 millisekunder) och byt sedan sida
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 1200);
  });
});
