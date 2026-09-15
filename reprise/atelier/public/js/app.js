import { validateMessage, replyTo } from "./brain.js";
import { renderMessages } from "./view.js";

const formulaire = document.querySelector("#chat-form");
const statut = document.querySelector("#status");
const versionElt = document.querySelector("#version");

const champ = document.querySelector("#message");
const liste = document.querySelector("#messages");

const historique = [
];


// J1 : interface seule, on bloque l’envoi et on l’explique.
// ...existing code...

formulaire?.addEventListener("submit", (event) => {
	event.preventDefault();

	const message = champ.value.trim();
	const validation = validateMessage(message);

	if (!validation.ok) {
		statut.textContent = validation.error;
		return;
	}

	historique.push({
		role: "user",
		text: validation.value,
	});

	const reponse = replyTo(validation.value);

	if (reponse) {
		historique.push({
			role: "assistant",
			text: reponse,
		});
	}


	renderMessages(historique, liste);

	champ.value = "";
	champ.focus();
});

// ...existing code...

// Version du serveur local, échec discret si indisponible.
fetch("/version.json", { headers: { accept: "application/json" } })
	.then((reponse) => (reponse.ok ? reponse.json() : null))
	.then((donnees) => {
		if (donnees && typeof donnees.version === "string" && versionElt) {
			versionElt.textContent = `version ${donnees.version}`;
		}
	})
	.catch(() => {});
