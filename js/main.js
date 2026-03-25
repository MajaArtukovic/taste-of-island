const prekidac = document.querySelector(".navigacija__prekidac");
const meni = document.querySelector(".navigacija__meni");

if (prekidac && meni) {
  prekidac.addEventListener("click", () => {
    const otvoreno = meni.classList.toggle("is-open");
    prekidac.setAttribute("aria-expanded", String(otvoreno));
  });
}

const elementiOtkrivanja = document.querySelectorAll(".otkrivanje");

const posmatrac = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.15 });

elementiOtkrivanja.forEach(el => posmatrac.observe(el));

const elementGodina = document.getElementById("year");
if (elementGodina) {
  elementGodina.textContent = String(new Date().getFullYear());
}