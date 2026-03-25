(function () {
  const koren = document.documentElement;
  const dugmeTema = document.querySelector(".tema-fab");
  const ikona = dugmeTema?.querySelector(".tema-fab__ikona");

  function upisiKolacic(naziv, vrednost, dana = 365) {
    const datum = new Date();
    datum.setTime(datum.getTime() + dana * 24 * 60 * 60 * 1000);
    document.cookie =
      `${encodeURIComponent(naziv)}=${encodeURIComponent(vrednost)};` +
      `expires=${datum.toUTCString()};path=/;SameSite=Lax`;
  }

  function procitajKolacic(naziv) {
    const trazeni = encodeURIComponent(naziv) + "=";
    const delovi = document.cookie.split(";").map(s => s.trim());
    for (const deo of delovi) {
      if (deo.startsWith(trazeni)) {
        return decodeURIComponent(deo.substring(trazeni.length));
      }
    }
    return null;
  }


  const sacuvanaTemaKolacic = procitajKolacic("toi-theme");
  const sacuvanaTemaLS = localStorage.getItem("toi-theme");

  const pocetnaTema =
    (sacuvanaTemaKolacic === "dark" || sacuvanaTemaKolacic === "light")
      ? sacuvanaTemaKolacic
      : ((sacuvanaTemaLS === "dark" || sacuvanaTemaLS === "light") ? sacuvanaTemaLS : "light");

  koren.setAttribute("data-theme", pocetnaTema);

  function sinhronizujIkonu() {
    const tamnaTema = koren.getAttribute("data-theme") === "dark";
    if (ikona) ikona.textContent = tamnaTema ? "🌙" : "☀️";
    if (dugmeTema) {
      dugmeTema.setAttribute("aria-label", tamnaTema ? "Prebaci na svetlu temu" : "Prebaci na tamnu temu");
      dugmeTema.setAttribute("title", tamnaTema ? "Prebaci na svetlu temu" : "Prebaci na tamnu temu");
    }
  }

  sinhronizujIkonu();

  dugmeTema?.addEventListener("click", () => {
    const trenutna = (koren.getAttribute("data-theme") === "dark") ? "dark" : "light";
    const sledeca = (trenutna === "dark") ? "light" : "dark";

    koren.setAttribute("data-theme", sledeca);

    upisiKolacic("toi-theme", sledeca);
    localStorage.setItem("toi-theme", sledeca);

    sinhronizujIkonu();
  });

  document.addEventListener("DOMContentLoaded", () => {
    const dugmeFont = document.getElementById("fontBtn");
    const htmlElement = document.documentElement;

    const sacuvaniFontKolacic = procitajKolacic("toi-font");
    const sacuvaniFontLS = localStorage.getItem("user-font-size");

    const pocetniFont =
      (sacuvaniFontKolacic === "large" || sacuvaniFontKolacic === "normal")
        ? sacuvaniFontKolacic
        : ((sacuvaniFontLS === "large" || sacuvaniFontLS === "normal") ? sacuvaniFontLS : "normal");

    if (pocetniFont === "large") {
      htmlElement.setAttribute("data-font", "large");
      if (dugmeFont) dugmeFont.textContent = "Smanji font";
    } else {
      htmlElement.removeAttribute("data-font");
      if (dugmeFont) dugmeFont.textContent = "Povećaj font";
    }

    if (!dugmeFont) return;

    dugmeFont.addEventListener("click", () => {
      const trenutno = htmlElement.getAttribute("data-font");
      const sledece = trenutno ? "normal" : "large";

      if (sledece === "large") {
        htmlElement.setAttribute("data-font", "large");
        dugmeFont.textContent = "Smanji font";
      } else {
        htmlElement.removeAttribute("data-font");
        dugmeFont.textContent = "Povećaj font";
      }

      upisiKolacic("toi-font", sledece);
      localStorage.setItem("user-font-size", sledece);
    });
  });
})();