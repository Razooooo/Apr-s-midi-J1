const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');

const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');

// J1 : interface seule, on bloque l’envoi et on l’explique.
formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (statut) {
    statut.textContent = 'Interface prête ; les réponses arrivent au J2.';
  }
  if (champ.value.trim() === '') {
    statut.textContent = ' Le message ne doit pas être vide';
    champ.focus();
    return;
  }
  const li = document.createElement('li');
  li.textContent = `Vous : ${champ.value}`;
  liste.append(li);
  champ.value = '';
  champ.focus();
  
  champ.value = champ.value.trim();
});

// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});


