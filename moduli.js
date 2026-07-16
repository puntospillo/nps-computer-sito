/* Moduli di contatto NPS Computer
   Nota: essendo un sito statico, l'invio apre il programma di posta
   del visitatore con il messaggio già compilato (mailto:). */
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
    '      <p class="nota">Si aprirà il vostro programma di posta con il messaggio già pronto per assistenza@npscomputer.it: basterà premere Invia.</p>' +
    '    </form>' +
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
    '      <p class="nota">Si aprirà il vostro programma di posta con il messaggio già pronto per info@npscomputer.it: basterà premere Invia.</p>' +
    '    </form>' +
    '  </div>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.insertAdjacentHTML('beforeend', html);

    function apri(id) {
      var m = document.getElementById(id);
      if (m) { m.classList.add('aperto'); }
    }
    function chiudiTutti() {
      document.querySelectorAll('.modale-sfondo.aperto').forEach(function (m) {
        m.classList.remove('aperto');
      });
    }

    // Aggancia tutti i bottoni con data-modulo="assistenza" o "consulenza"
    document.querySelectorAll('[data-modulo]').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        apri('modale-' + b.getAttribute('data-modulo'));
      });
    });

    // Chiusura: X, clic fuori dalla finestra, tasto Esc
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

    // Invio: apre il client di posta con il messaggio precompilato
    function mailto(destinatario, oggetto, righe) {
      var corpo = righe.join('\n');
      window.location.href = 'mailto:' + destinatario +
        '?subject=' + encodeURIComponent(oggetto) +
        '&body=' + encodeURIComponent(corpo);
    }

    var fa = document.getElementById('form-assistenza');
    fa.addEventListener('submit', function (e) {
      e.preventDefault();
      mailto('assistenza@npscomputer.it',
        'Richiesta di assistenza — ' + fa.nome.value,
        [
          'Nome cliente: ' + fa.nome.value,
          'Tipo di assistenza: ' + fa.tipo.value,
          '',
          'Descrizione della richiesta:',
          fa.descrizione.value,
          '',
          'Contatti:',
          'Telefono: ' + fa.telefono.value,
          'Email: ' + fa.email.value
        ]);
      chiudiTutti();
    });

    var fc = document.getElementById('form-consulenza');
    fc.addEventListener('submit', function (e) {
      e.preventDefault();
      mailto('info@npscomputer.it',
        'Richiesta di consulenza — ' + fc.nome.value,
        [
          'Nome / ragione sociale: ' + fc.nome.value,
          'Telefono: ' + (fc.telefono.value || 'non indicato'),
          'Email: ' + fc.email.value,
          'Tipo di consulenza: ' + fc.tipo.value,
          '',
          'Descrizione:',
          fc.descrizione.value
        ]);
      chiudiTutti();
    });
  });
})();
