export function renderMessages(messages, container) {
	const lignes = messages.map((msg) => {
		const li = document.createElement("li");
		
		return li;
	});
	container.replaceChildren(...lignes);
}
