document.addEventListener("DOMContentLoaded", () => {
  const slajder = document.querySelector("[data-slider]");
  if (!slajder) return;

  const slajdovi = Array.from(slajder.querySelectorAll(".slajd"));
  if (slajdovi.length <= 1) return;

  const dugmePrethodno = slajder.querySelector(".slajder__dugme--prethodno");
  const dugmeSledece = slajder.querySelector(".slajder__dugme--sledece");

  let trenutni = slajdovi.findIndex(s => s.classList.contains("is-active"));
  if (trenutni === -1) trenutni = 0;

  let intervalId = null;

  function azuriraj() {
    slajdovi.forEach((s, i) =>
      s.classList.toggle("is-active", i === trenutni)
    );
  }

  function idiNa(i) {
    trenutni = (i + slajdovi.length) % slajdovi.length;
    azuriraj();
    ponovoPokreniAutomatsko();
  }

  function sledeci() {
    trenutni = (trenutni + 1) % slajdovi.length;
    azuriraj();
  }

  function prethodni() {
    trenutni = (trenutni - 1 + slajdovi.length) % slajdovi.length;
    azuriraj();
    ponovoPokreniAutomatsko();
  }

  function pokreniAutomatsko() {
    if (intervalId) return;
    intervalId = setInterval(sledeci, 6500);
  }

  function zaustaviAutomatsko() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function ponovoPokreniAutomatsko() {
    zaustaviAutomatsko();
    pokreniAutomatsko();
  }

  dugmePrethodno?.addEventListener("click", prethodni);
  dugmeSledece?.addEventListener("click", (e) => {
    e.preventDefault();
    idiNa(trenutni + 1);
  });

  azuriraj();
  pokreniAutomatsko();
});