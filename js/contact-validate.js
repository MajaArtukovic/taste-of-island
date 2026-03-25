(function () {

  document.querySelectorAll(".kontakt__forma").forEach((forma) => {

    const dugme = forma.querySelector('button[type="submit"]');

    const $ = (id) => forma.querySelector(`#${id}`);

    const imeEl = $("name");
    const emailEl = $("email");
    const telefonEl = $("phone");
    const datumEl = $("date");
    const osobeEl = $("people");
    const budzetEl = $("budget");
    const porukaEl = $("message");

    const saglasnostEl = forma.querySelector('input[name="consent"]');
    const interesovanjaEls = Array.from(
      forma.querySelectorAll('input[name="interests"]')
    );

    function greskaBox(kljuc) {
      return forma.querySelector(`.greska-polja[data-error-for="${kljuc}"]`);
    }

    function postaviGresku(el, kljuc, poruka) {
      const box = greskaBox(kljuc);
      if (box) box.textContent = poruka || "";

      if (el) {
        el.classList.toggle("neispravno", !!poruka);
        el.setAttribute("aria-invalid", poruka ? "true" : "false");
      }
    }

    function validanEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }

    function validanTelefon(v) {
      const cifre = v.replace(/\D/g, "");
      if (cifre.length < 7) return false;
      return /^[\d\s()+-]+$/.test(v);
    }

    function imaInteresovanje() {
      return interesovanjaEls.some(el => el.checked);
    }

    function danasISO() {
      const d = new Date();
      d.setHours(0,0,0,0);
      return d.toISOString().split("T")[0];
    }

    if (datumEl) {
      datumEl.setAttribute("min", danasISO());
    }

    function validiraj() {

      let ok = true;

      if (imeEl) {
        const v = imeEl.value.trim();
        if (v.length < 3) {
          postaviGresku(imeEl,"name","Unesite bar 3 karaktera.");
          ok = false;
        } else postaviGresku(imeEl,"name","");
      }

      if (emailEl) {
        const v = emailEl.value.trim();
        if (!validanEmail(v)) {
          postaviGresku(emailEl,"email","Unesite ispravan email.");
          ok = false;
        } else postaviGresku(emailEl,"email","");
      }

      if (telefonEl) {
        const v = telefonEl.value.trim();
        if (v && !validanTelefon(v)) {
          postaviGresku(telefonEl,"phone","Neispravan broj telefona.");
          ok = false;
        } else postaviGresku(telefonEl,"phone","");
      }

      if (datumEl && datumEl.required) {
        const v = datumEl.value.trim();
        if (!v) {
          postaviGresku(datumEl,"date","Odaberite datum.");
          ok = false;
        } else postaviGresku(datumEl,"date","");
      }

      if (osobeEl) {
        const n = Number(osobeEl.value);
        if (!n || n < 1 || n > 20) {
          postaviGresku(osobeEl,"people","Unesite broj osoba.");
          ok = false;
        } else postaviGresku(osobeEl,"people","");
      }

      if (budzetEl) {
        const v = budzetEl.value.trim();
        if (!v) {
          postaviGresku(budzetEl,"budget","Odaberite budžet.");
          ok = false;
        } else postaviGresku(budzetEl,"budget","");
      }

      if (interesovanjaEls.length) {
        if (!imaInteresovanje()) {
          postaviGresku(null,"interests","Izaberite bar jedno interesovanje.");
          ok = false;
        } else postaviGresku(null,"interests","");
      }

      if (porukaEl) {
        const v = porukaEl.value.trim();
        if (v && v.length < 10) {
          postaviGresku(porukaEl,"message","Poruka mora imati bar 10 karaktera.");
          ok = false;
        } else postaviGresku(porukaEl,"message","");
      }

      if (saglasnostEl && !saglasnostEl.checked) {
        postaviGresku(null,"consent","Morate potvrditi saglasnost.");
        ok = false;
      } else postaviGresku(null,"consent","");

      if (dugme) dugme.disabled = !ok;

      return ok;
    }

    forma.addEventListener("input", validiraj);
    forma.addEventListener("change", validiraj);

    forma.addEventListener("submit", (e) => {

      if (!validiraj()) {
        e.preventDefault();

        const prvo = forma.querySelector(".neispravno");
        if (prvo) {
          prvo.scrollIntoView({behavior:"smooth",block:"center"});
          prvo.focus();
        }

        return;
      }

      e.preventDefault();
      alert("Hvala! Upit je uspešno poslat.");
      forma.reset();
      validiraj();

    });

    validiraj();

  });

})();