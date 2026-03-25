document.addEventListener("DOMContentLoaded", () => {
  const svetlosniOkvir = document.querySelector("[data-lightbox]");
  if (!svetlosniOkvir) return;

  const elementSlike = svetlosniOkvir.querySelector("[data-lb-img]");
  const elementOpisa = svetlosniOkvir.querySelector("[data-lb-cap]");
  const dugmadZatvori = svetlosniOkvir.querySelectorAll("[data-lb-close]");
  const dugmePrethodno = svetlosniOkvir.querySelector("[data-lb-prev]");
  const dugmeSledece = svetlosniOkvir.querySelector("[data-lb-next]");

  let stavke = [];
  let indeks = 0;

  function prikupiStavke() {
    stavke = Array.from(document.querySelectorAll(".galerija-stavka img")).map((slika) => ({
      src: slika.src,
      alt: slika.alt || "",
      opis:
        slika.closest("figure")?.querySelector("figcaption")?.textContent?.trim() || ""
    }));
  }

  function prikazi(i) {
    if (!stavke.length) return;
    indeks = (i + stavke.length) % stavke.length;

    const stavka = stavke[indeks];
    elementSlike.src = stavka.src;
    elementSlike.alt = stavka.alt;
    elementOpisa.textContent = stavka.opis || stavka.alt || "";
  }

  function otvoriNa(i) {
    prikupiStavke();
    if (!stavke.length) return;

    svetlosniOkvir.classList.add("is-open");
    svetlosniOkvir.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    prikazi(i);
  }

  function zatvori() {
    svetlosniOkvir.classList.remove("is-open");
    svetlosniOkvir.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    elementSlike.src = "";
    elementOpisa.textContent = "";
  }

  function sledeca() { prikazi(indeks + 1); }
  function prethodna() { prikazi(indeks - 1); }

  document.addEventListener("click", (dogadjaj) => {
    const slika = dogadjaj.target.closest(".galerija-stavka img");
    if (!slika) return;

    const sveSlike = Array.from(document.querySelectorAll(".galerija-stavka img"));
    const i = sveSlike.indexOf(slika);
    if (i !== -1) otvoriNa(i);
  });

  dugmadZatvori.forEach((dugme) => dugme.addEventListener("click", zatvori));
  dugmeSledece?.addEventListener("click", sledeca);
  dugmePrethodno?.addEventListener("click", prethodna);

  document.addEventListener("keydown", (dogadjaj) => {
    if (!svetlosniOkvir.classList.contains("is-open")) return;

    if (dogadjaj.key === "Escape") zatvori();
    if (dogadjaj.key === "ArrowRight") sledeca();
    if (dogadjaj.key === "ArrowLeft") prethodna();
  });
});