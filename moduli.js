/* Moduli di contatto NPS Computer
   Invio diretto tramite FormSubmit (https://formsubmit.co): il visitatore
   preme "Invia" e la richiesta parte subito, senza aprire programmi di posta.
   Tutte le richieste arrivano a maurizio.pagani@npscomputersrl.onmicrosoft.com.
   NOTA una tantum: al primissimo invio FormSubmit manda una email di
   attivazione all'indirizzo di destinazione — va cliccato "Activate"
   una sola volta. */
(function () {
  'use strict';

  var html =
    '<div class="modale-sfondo" id="modale-assistenza">' +
    '  <div class="modale" role="dialog" aria-modal="true" aria-labelledby="titolo-assistenza">' +
    '    <button type="button" class="chiudi" aria-label="Chiudi">&times;</button>' +
    '    <h3 id="titolo-assistenza">Richiesta di assistenza</h3>' +
    '    <p class="sotto">Compilate il modulo: vi ricontatteremo il prima possibile.</p>' +
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
    '        <label for="ass-descrizione">Descrivete la richiesta di assistenza</label>' +
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
    '    <h3 id="titolo-consulenza">Contattateci per parlare dei nostri servizi</h3>' +
    '    <p class="sotto">Raccontateci le vostre esigenze: il primo confronto è senza impegno.</p>' +
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
      var form = m.querySelector('form');
      var esito = m.querySelector('.esito');
      form.hidden = false;
      esito.hidden = true;
      esito.innerHTML = '';
      var bottone = form.querySelector('button[type=submit]');
      bottone.disabled = false;
      bottone.textContent = 'Invia la richiesta';
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
            '  <p>Grazie! Vi ricontatteremo il prima possibile.</p>' +
            '</div>';
          form.reset();
        })
        .catch(function () {
          bottone.disabled = false;
          bottone.textContent = 'Invia la richiesta';
          esito.hidden = false;
          esito.innerHTML =
            '<p class="esito-errore">Non è stato possibile inviare la richiesta. ' +
            'Riprovate tra qualche istante, oppure chiamateci allo ' +
            '<a href="tel:+390283241663">02 83.241.663</a> o scrivete a ' +
            '<a href="mailto:info@npscomputer.it">info@npscomputer.it</a>.</p>';
        });
    }

    var fa = document.getElementById('form-assistenza');
    fa.addEventListener('submit', function (e) {
      e.preventDefault();
      invia(fa, 'maurizio.pagani@npscomputersrl.onmicrosoft.com',
        'Richiesta di assistenza — ' + fa.nome.value,
        {
          'Nome cliente': fa.nome.value,
          'Tipo di assistenza': fa.tipo.value,
          'Descrizione': fa.descrizione.value,
          'Telefono': fa.telefono.value,
          'email': fa.email.value
        });
    });

    var fc = document.getElementById('form-consulenza');
    fc.addEventListener('submit', function (e) {
      e.preventDefault();
      invia(fc, 'maurizio.pagani@npscomputersrl.onmicrosoft.com',
        'Richiesta di consulenza — ' + fc.nome.value,
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
