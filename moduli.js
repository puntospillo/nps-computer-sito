/* Moduli di contatto NPS Computer
   Invio diretto tramite FormSubmit (https://formsubmit.co): il visitatore
   preme "Invia" e la richiesta parte subito, senza aprire programmi di posta.
   Tutte le richieste arrivano a maurizio.pagani@npscomputersrl.onmicrosoft.com.
   NOTA una tantum: al primissimo invio FormSubmit manda una email di
   attivazione all'indirizzo di destinazione: va cliccato "Activate"
   una sola volta. */
/* ── Google Analytics con consenso cookie ──
   GA4 (G-2TKTJ0PP1B) viene caricato SOLO dopo che il visitatore preme
   "Accetta" nel banner, oppure automaticamente nelle visite successive
   se aveva già accettato in passato. Se rifiuta, nessuno script di
   Google viene mai richiamato. */
(function () {
  'use strict';

  var ID_GA = 'G-2TKTJ0PP1B';
  var CHIAVE = 'nps-consenso-cookie';

  function caricaGoogleAnalytics() {
    if (window.__gaCaricato) { return; }
    window.__gaCaricato = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ID_GA, { anonymize_ip: true });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID_GA;
    document.head.appendChild(s);
  }

  function radiceRelativa() {
    return location.pathname.indexOf('/servizi/') !== -1 ? '../' : '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var scelta = null;
    try { scelta = localStorage.getItem(CHIAVE); } catch (e) {}

    if (scelta === 'accettato') {
      caricaGoogleAnalytics();
      return;
    }
    if (scelta === 'rifiutato') {
      return;
    }

    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.innerHTML =
      '<p>Usiamo Google Analytics solo se ci dai il consenso, per capire come viene usato il sito. ' +
      '<a href="' + radiceRelativa() + 'privacy.html#cookie">Scopri di più</a>.</p>' +
      '<div class="cookie-bottoni">' +
      '  <button type="button" class="btn btn-ghost" id="cookie-rifiuta">Rifiuta</button>' +
      '  <button type="button" class="btn btn-corallo" id="cookie-accetta">Accetta</button>' +
      '</div>';
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add('visibile'); });

    document.getElementById('cookie-accetta').addEventListener('click', function () {
      try { localStorage.setItem(CHIAVE, 'accettato'); } catch (e) {}
      banner.remove();
      caricaGoogleAnalytics();
    });
    document.getElementById('cookie-rifiuta').addEventListener('click', function () {
      try { localStorage.setItem(CHIAVE, 'rifiutato'); } catch (e) {}
      banner.remove();
    });
  });
})();

(function () {
  'use strict';

  var html =
    '<div class="modale-sfondo" id="modale-assistenza">' +
    '  <div class="modale" role="dialog" aria-modal="true" aria-labelledby="titolo-assistenza">' +
    '    <button type="button" class="chiudi" aria-label="Chiudi">&times;</button>' +
    '    <h3 id="titolo-assistenza">Richiesta di assistenza</h3>' +
    '    <p class="sotto">Compila il modulo: ti ricontatteremo il prima possibile.</p>' +
    '    <form id="form-assistenza">' +
    '      <div class="campo">' +
    '        <label for="ass-nome">Nome cliente / azienda</label>' +
    '        <input type="text" id="ass-nome" name="nome" required autocomplete="organization">' +
    '      </div>' +
    '      <div class="campo">' +
    '        <label for="ass-tipo">Tipo di assistenza</label>' +
    '        <select id="ass-tipo" name="tipo" required>' +
    '          <option value="Da contratto">Da contratto</option>' +
    '          <option value="A pagamento">A pagamento</option>' +
    '        </select>' +
    '      </div>' +
    '      <div class="campo">' +
    '        <label for="ass-descrizione">Descrivi la richiesta di assistenza</label>' +
    '        <textarea id="ass-descrizione" name="descrizione" required placeholder="Es. il gestionale non si avvia da questa mattina su due postazioni…"></textarea>' +
    '      </div>' +
    '      <div class="campo campo-doppio">' +
    '        <div>' +
    '          <label for="ass-telefono">Telefono</label>' +
    '          <input type="tel" id="ass-telefono" name="telefono" required autocomplete="tel">' +
    '        </div>' +
    '        <div>' +
    '          <label for="ass-email">Email</label>' +
    '          <input type="email" id="ass-email" name="email" required autocomplete="email">' +
    '        </div>' +
    '      </div>' +
    '      <button type="submit" class="btn btn-corallo">Invia la richiesta</button>' +
    '      <p class="nota">La richiesta arriva direttamente al nostro servizio di assistenza.</p>' +
    '    </form>' +
    '    <div class="esito" hidden></div>' +
    '  </div>' +
    '</div>' +
    '<div class="modale-sfondo" id="modale-consulenza">' +
    '  <div class="modale" role="dialog" aria-modal="true" aria-labelledby="titolo-consulenza">' +
    '    <button type="button" class="chiudi" aria-label="Chiudi">&times;</button>' +
    '    <h3 id="titolo-consulenza">Contattaci per parlare dei nostri servizi</h3>' +
    '    <p class="sotto">Raccontaci le tue esigenze: il primo confronto è senza impegno.</p>' +
    '    <form id="form-consulenza">' +
    '      <div class="campo">' +
    '        <label for="con-nome">Nome o ragione sociale</label>' +
    '        <input type="text" id="con-nome" name="nome" required autocomplete="organization">' +
    '      </div>' +
    '      <div class="campo campo-doppio">' +
    '        <div>' +
    '          <label for="con-telefono">Telefono <span class="fac">(facoltativo)</span></label>' +
    '          <input type="tel" id="con-telefono" name="telefono" autocomplete="tel">' +
    '        </div>' +
    '        <div>' +
    '          <label for="con-email">Email</label>' +
    '          <input type="email" id="con-email" name="email" required autocomplete="email">' +
    '        </div>' +
    '      </div>' +
    '      <div class="campo">' +
    '        <label for="con-tipo">Tipo di consulenza</label>' +
    '        <select id="con-tipo" name="tipo" required>' +
    '          <option value="Consulenza AI">Consulenza AI</option>' +
    '          <option value="Automazione dei processi">Automazione dei processi</option>' +
    '          <option value="Formazione del personale">Formazione del personale</option>' +
    '          <option value="Integrazione AI con gli strumenti aziendali">Integrazione AI con gli strumenti aziendali</option>' +
    '          <option value="Servizi IT e infrastruttura">Servizi IT e infrastruttura</option>' +
    '          <option value="Altro">Altro</option>' +
    '        </select>' +
    '      </div>' +
    '      <div class="campo">' +
    '        <label for="con-descrizione">Descrizione</label>' +
    '        <textarea id="con-descrizione" name="descrizione" required placeholder="Es. vorremmo capire se l’AI può aiutarci a gestire i preventivi…"></textarea>' +
    '      </div>' +
    '      <button type="submit" class="btn btn-corallo">Invia la richiesta</button>' +
    '      <p class="nota">La richiesta arriva direttamente al nostro staff.</p>' +
    '    </form>' +
    '    <div class="esito" hidden></div>' +
    '  </div>' +
    '</div>' +
    '<div class="modale-sfondo" id="modale-nis2">' +
    '  <div class="modale" role="dialog" aria-modal="true" aria-labelledby="titolo-nis2">' +
    '    <button type="button" class="chiudi" aria-label="Chiudi">&times;</button>' +
    '    <h3 id="titolo-nis2">Verifica in 30 secondi se la tua azienda potrebbe rientrare nella NIS2</h3>' +
    '    <form id="form-nis2">' +
    '      <div class="quiz-domanda">' +
    '        <p>1. La tua azienda opera in uno dei settori interessati dalla NIS2?</p>' +
    '        <p class="quiz-settori">Energia (elettricità, gas, petrolio, idrogeno, teleriscaldamento) &middot; Trasporti (aerei, ferroviari, marittimi, su strada) &middot; Settore bancario e mercati finanziari &middot; Sanità e dispositivi medici &middot; Acqua potabile e acque reflue &middot; Infrastrutture digitali e servizi ICT &middot; Pubblica amministrazione &middot; Spazio &middot; Servizi postali e di corriere &middot; Gestione dei rifiuti &middot; Sostanze chimiche &middot; Produzione e distribuzione di alimenti &middot; Fabbricazione (elettronica, macchinari, autoveicoli e altri mezzi di trasporto) &middot; Fornitori di servizi digitali (marketplace, motori di ricerca, social network) &middot; Ricerca</p>' +
    '        <div class="quiz-opzioni">' +
    '          <label><input type="radio" name="d1" value="Sì" required> Sì</label>' +
    '          <label><input type="radio" name="d1" value="No"> No</label>' +
    '          <label><input type="radio" name="d1" value="Non so"> Non so</label>' +
    '        </div>' +
    '      </div>' +
    '      <div class="quiz-domanda">' +
    '        <p>2. La tua azienda ha almeno 50 dipendenti oppure supera i 10 milioni di euro di fatturato annuo?</p>' +
    '        <div class="quiz-opzioni">' +
    '          <label><input type="radio" name="d2" value="Sì" required> Sì</label>' +
    '          <label><input type="radio" name="d2" value="No"> No</label>' +
    '          <label><input type="radio" name="d2" value="Non so"> Non so</label>' +
    '        </div>' +
    '      </div>' +
    '      <div class="quiz-domanda">' +
    '        <p>3. Fornisci servizi IT o di cybersecurity a clienti che potrebbero essere soggetti alla NIS2?</p>' +
    '        <div class="quiz-opzioni">' +
    '          <label><input type="radio" name="d3" value="Sì" required> Sì</label>' +
    '          <label><input type="radio" name="d3" value="No"> No</label>' +
    '          <label><input type="radio" name="d3" value="Non so"> Non so</label>' +
    '        </div>' +
    '      </div>' +
    '      <div class="quiz-domanda">' +
    '        <p>4. Hai ricevuto richieste dai clienti riguardo a NIS2, cybersecurity o requisiti di sicurezza dei fornitori?</p>' +
    '        <div class="quiz-opzioni">' +
    '          <label><input type="radio" name="d4" value="Sì" required> Sì</label>' +
    '          <label><input type="radio" name="d4" value="No"> No</label>' +
    '          <label><input type="radio" name="d4" value="Non so"> Non so</label>' +
    '        </div>' +
    '      </div>' +
    '      <button type="submit" class="btn btn-corallo">Vedi il risultato</button>' +
    '    </form>' +
    '    <div id="nis2-esito" hidden>' +
    '      <div class="nis2-risposta">' +
    '        <h4 id="nis2-esito-titolo"></h4>' +
    '        <p id="nis2-esito-testo"></p>' +
    '      </div>' +
    '      <button type="button" class="btn btn-corallo" id="nis2-contatta"></button>' +
    '    </div>' +
    '    <form id="form-nis2-contatto" hidden>' +
    '      <div class="campo">' +
    '        <label for="nis-azienda">Azienda</label>' +
    '        <input type="text" id="nis-azienda" name="azienda" required autocomplete="organization">' +
    '      </div>' +
    '      <div class="campo">' +
    '        <label for="nis-riferimento">Riferimento (nome e cognome)</label>' +
    '        <input type="text" id="nis-riferimento" name="riferimento" required autocomplete="name">' +
    '      </div>' +
    '      <div class="campo campo-doppio">' +
    '        <div>' +
    '          <label for="nis-email">Email</label>' +
    '          <input type="email" id="nis-email" name="email" required autocomplete="email">' +
    '        </div>' +
    '        <div>' +
    '          <label for="nis-telefono">Telefono <span class="fac">(facoltativo)</span></label>' +
    '          <input type="tel" id="nis-telefono" name="telefono" autocomplete="tel">' +
    '        </div>' +
    '      </div>' +
    '      <button type="submit" class="btn btn-corallo">Invia la richiesta</button>' +
    '      <p class="nota">La richiesta arriva direttamente al nostro staff.</p>' +
    '    </form>' +
    '    <div class="esito" hidden></div>' +
    '  </div>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', html);

    /* Menu mobile (hamburger) */
    var hamburger = document.querySelector('.btn-hamburger');
    var menuMobile = document.querySelector('.menu-mobile');
    if (hamburger && menuMobile) {
      hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('aperto');
        menuMobile.classList.toggle('aperto');
      });
      menuMobile.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          hamburger.classList.remove('aperto');
          menuMobile.classList.remove('aperto');
        });
      });
    }

    /* Blocca lo scorrimento della pagina mentre un modulo è aperto (evita
       il doppio scorrimento tipico di iOS Safari) */
    var scrollY = 0;
    function bloccaScorrimento() {
      scrollY = window.scrollY;
      document.body.style.top = -scrollY + 'px';
      document.body.classList.add('bloccato');
    }
    function sbloccaScorrimento() {
      document.body.classList.remove('bloccato');
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }

    function apri(id) {
      var m = document.getElementById(id);
      if (!m) { return; }
      // Riporta la finestra allo stato iniziale a ogni apertura
      if (id === 'modale-nis2') {
        azzeraNis2();
      } else {
        var form = m.querySelector('form');
        var esito = m.querySelector('.esito');
        form.hidden = false;
        esito.hidden = true;
        esito.innerHTML = '';
        var bottone = form.querySelector('button[type=submit]');
        bottone.disabled = false;
        bottone.textContent = 'Invia la richiesta';
      }
      m.classList.add('aperto');
      bloccaScorrimento();
    }
    function chiudiTutti() {
      document.querySelectorAll('.modale-sfondo.aperto').forEach(function (m) {
        m.classList.remove('aperto');
      });
      sbloccaScorrimento();
    }

    document.querySelectorAll('[data-modulo]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        apri('modale-' + b.getAttribute('data-modulo'));
      });
    });

    document.querySelectorAll('.modale .chiudi').forEach(function (b) {
      b.addEventListener('click', chiudiTutti);
    });
    document.querySelectorAll('.modale-sfondo').forEach(function (m) {
      m.addEventListener('click', function (e) {
        if (e.target === m) { chiudiTutti(); }
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { chiudiTutti(); }
    });

    /* Invio diretto: POST all'endpoint AJAX di FormSubmit */
    function invia(form, destinatario, oggetto, dati) {
      var bottone = form.querySelector('button[type=submit]');
      var esito = form.parentElement.querySelector('.esito');
      bottone.disabled = true;
      bottone.textContent = 'Invio in corso…';

      dati._subject = oggetto;
      dati._template = 'table';

      fetch('https://formsubmit.co/ajax/' + destinatario, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(dati)
      })
        .then(function (r) {
          if (!r.ok) { throw new Error('HTTP ' + r.status); }
          return r.json();
        })
        .then(function () {
          form.hidden = true;
          esito.hidden = false;
          esito.innerHTML =
            '<div class="esito-ok">' +
            '  <div class="esito-icona">✓</div>' +
            '  <h4>Richiesta inviata</h4>' +
            '  <p>Grazie! Ti ricontatteremo il prima possibile.</p>' +
            '</div>';
          form.reset();
        })
        .catch(function () {
          bottone.disabled = false;
          bottone.textContent = 'Invia la richiesta';
          esito.hidden = false;
          esito.innerHTML =
            '<p class="esito-errore">Non è stato possibile inviare la richiesta. ' +
            'Riprova tra qualche istante, oppure chiamaci allo ' +
            '<a href="tel:+390283241663">02 83.241.663</a> o scrivi a ' +
            '<a href="mailto:info@npscomputer.it">info@npscomputer.it</a>.</p>';
        });
    }

    var fa = document.getElementById('form-assistenza');
    fa.addEventListener('submit', function (e) {
      e.preventDefault();
      invia(fa, 'maurizio.pagani@npscomputersrl.onmicrosoft.com',
        'Richiesta di assistenza: ' + fa.nome.value,
        {
          'Nome cliente': fa.nome.value,
          'Tipo di assistenza': fa.tipo.value,
          'Descrizione': fa.descrizione.value,
          'Telefono': fa.telefono.value,
          'email': fa.email.value
        });
    });

    /* ── Questionario NIS2 ── */
    var quizNis2 = document.getElementById('form-nis2');
    var esitoNis2 = document.getElementById('nis2-esito');
    var contattoNis2 = document.getElementById('form-nis2-contatto');
    var bottoneNis2 = document.getElementById('nis2-contatta');
    var risultatoNis2 = '';

    function azzeraNis2() {
      quizNis2.hidden = false;
      quizNis2.reset();
      esitoNis2.hidden = true;
      contattoNis2.hidden = true;
      contattoNis2.reset();
      var finale = contattoNis2.parentElement.querySelector('.esito');
      finale.hidden = true;
      finale.innerHTML = '';
      var b1 = quizNis2.querySelector('button[type=submit]');
      b1.disabled = false;
      b1.textContent = 'Vedi il risultato';
      var b2 = contattoNis2.querySelector('button[type=submit]');
      b2.disabled = false;
      b2.textContent = 'Invia la richiesta';
    }

    quizNis2.addEventListener('submit', function (e) {
      e.preventDefault();
      var d1 = quizNis2.d1.value, d2 = quizNis2.d2.value;
      var d3 = quizNis2.d3.value, d4 = quizNis2.d4.value;
      var titolo, testo, etichetta;
      if (d1 === 'Sì' && d2 === 'Sì') {
        titolo = 'Probabilmente rientri nella NIS2';
        testo = 'Il settore e le dimensioni della tua azienda indicano un\'alta probabilità di rientrare direttamente negli obblighi della direttiva.';
        etichetta = 'Richiedi un assessment';
        risultatoNis2 = 'Alta probabilità di rientrare nella NIS2';
      } else if (d3 === 'Sì' || d4 === 'Sì') {
        titolo = 'Potresti avere obblighi indiretti come fornitore';
        testo = 'Anche se non rientri direttamente, i tuoi clienti soggetti alla NIS2 possono chiederti requisiti di sicurezza come fornitore.';
        etichetta = 'Richiedi una verifica';
        risultatoNis2 = 'Possibili obblighi come fornitore di soggetti NIS2';
      } else {
        titolo = 'Probabilmente non rientri';
        testo = 'Dalle risposte non emergono obblighi diretti. Se preferisci ti contattiamo per una verifica gratuita e senza impegno.';
        etichetta = 'Contattami';
        risultatoNis2 = 'Probabilmente non rientra direttamente';
      }
      document.getElementById('nis2-esito-titolo').textContent = titolo;
      document.getElementById('nis2-esito-testo').textContent = testo;
      bottoneNis2.textContent = etichetta;
      quizNis2.hidden = true;
      esitoNis2.hidden = false;
    });

    bottoneNis2.addEventListener('click', function () {
      esitoNis2.hidden = true;
      contattoNis2.hidden = false;
    });

    contattoNis2.addEventListener('submit', function (e) {
      e.preventDefault();
      invia(contattoNis2, 'maurizio.pagani@npscomputersrl.onmicrosoft.com',
        'Verifica NIS2: ' + contattoNis2.azienda.value,
        {
          'Azienda': contattoNis2.azienda.value,
          'Riferimento': contattoNis2.riferimento.value,
          'email': contattoNis2.email.value,
          'Telefono': contattoNis2.telefono.value || 'non indicato',
          'Esito del questionario': risultatoNis2,
          'D1 - Settore NIS2': quizNis2.d1.value,
          'D2 - Dimensioni (50 dip. / 10 mln)': quizNis2.d2.value,
          'D3 - Fornitore di soggetti NIS2': quizNis2.d3.value,
          'D4 - Richieste dai clienti': quizNis2.d4.value
        });
    });

    var fc = document.getElementById('form-consulenza');
    fc.addEventListener('submit', function (e) {
      e.preventDefault();
      invia(fc, 'maurizio.pagani@npscomputersrl.onmicrosoft.com',
        'Richiesta di consulenza: ' + fc.nome.value,
        {
          'Nome o ragione sociale': fc.nome.value,
          'Telefono': fc.telefono.value || 'non indicato',
          'email': fc.email.value,
          'Tipo di consulenza': fc.tipo.value,
          'Descrizione': fc.descrizione.value
        });
    });
  });
})();
