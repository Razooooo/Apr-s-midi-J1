import { validateMessage, replyTo } from './brain.js';

const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');

const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');

const historique = [{role: 'user', text: '…' },{ role: 'assistant', text: '…' }];

// J1 : interface seule, on bloque l’envoi et on l’explique.
formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
const validation = validateMessage(champ.value);
  if (!validation.ok) {
    statut.textContent = validation.error;
    return;
  }
  const li = document.createElement('li');
  li.textContent = `Vous : ${champ.value}`;
  liste.append(li);
  champ.value = '';
  champ.focus();
  
  champ.value = champ.value.trim();
;

  
  const reponse = replyTo(validation.value);
  if (reponse) {
    const liReponse = document.createElement('li');
    liReponse.textContent = `cap-Web : ${reponse}`;
    liste.append(liReponse);
    champ.focus();
  } 

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


