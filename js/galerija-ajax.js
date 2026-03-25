document.addEventListener("DOMContentLoaded", function () {
  const mreza =
    document.getElementById("mrezaGalerije") ||
    document.getElementById("galleryGrid");

  const poruka =
    document.getElementById("porukaGalerije") ||
    document.getElementById("galleryMsg");

  const dugmiciFiltera = Array.from(
    document.querySelectorAll(".filteri-galerije [data-filter], .gal-filters [data-filter]")
  );

  const rezervniPodaci = [
    { src: "assets/img/polje-lavande.jpg", alt: "Polje lavande", tag: "lavanda" },
    { src: "assets/img/fortica.jpeg", alt: "Fortica tvrđava", tag: "tura" },
    { src: "assets/img/suhozidi.jpg", alt: "Suhozidi", tag: "tura" },
    { src: "assets/img/med-tegle.jpg", alt: "Med", tag: "proizvodi" },
    { src: "assets/img/konoba.jpg", alt: "Konoba", tag: "porodica" },
    { src: "assets/img/Stari-Grad-Hvar.jpg", alt: "Stari Grad", tag: "tura" },
    { src: "assets/img/pogled-vidikovac.jpg", alt: "Vidikovac", tag: "tura" },
    { src: "assets/img/med-kasika.jpg", alt: "Med", tag: "proizvodi" },
    { src: "assets/img/lavande.jpg", alt: "Lavande", tag: "lavanda" },
    { src: "assets/img/loza.jpg", alt: "Vinova loza", tag: "proizvodi" }
  ];

  let sviPodaci = [];
  let aktivanFilter = "all";

  function iscrtajGaleriju(podaci) {
    if (!mreza) return;
    mreza.innerHTML = "";

    podaci.forEach((stavka) => {
      const figura = document.createElement("figure");
      figura.className = "galerija-stavka";
      figura.dataset.tag = stavka.tag || "all";

      figura.innerHTML = `
        <img src="${stavka.src}" alt="${stavka.alt}">
        <figcaption>${stavka.alt}</figcaption>
      `;

      mreza.appendChild(figura);
    });

    if (poruka) {
      poruka.textContent = podaci.length ? "" : "Nema fotografija za izabrani filter.";
    }
  }

  function primeniFilter(oznaka) {
    aktivanFilter = oznaka;

    dugmiciFiltera.forEach((dugme) => {
      dugme.classList.toggle("is-active", dugme.dataset.filter === oznaka);
    });

    if (oznaka === "all") iscrtajGaleriju(sviPodaci);
    else iscrtajGaleriju(sviPodaci.filter((x) => x.tag === oznaka));
  }

  dugmiciFiltera.forEach((dugme) => {
    dugme.addEventListener("click", () => primeniFilter(dugme.dataset.filter));
  });

  function ucitajRezervno() {
    sviPodaci = rezervniPodaci;
    primeniFilter(aktivanFilter);
  }

  // Ako je otvoreno kao file://, fetch često ne radi
  if (location.protocol === "file:") {
    console.warn("Pokrenuto preko file:// — učitavam rezervne podatke (fallback).");
    ucitajRezervno();
    return;
  }

  fetch("data/galerija.json")
    .then((odgovor) => {
      if (!odgovor.ok) throw new Error("Greška u učitavanju");
      return odgovor.json();
    })
    .then((podaci) => {
      sviPodaci = Array.isArray(podaci) ? podaci : rezervniPodaci;
      primeniFilter(aktivanFilter);
      if (poruka) poruka.textContent = "";
    })
    .catch(() => {
      console.warn("AJAX nije uspeo, koristi se fallback.");
      ucitajRezervno();
    });
});