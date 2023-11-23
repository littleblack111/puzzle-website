function failLevel() {
	let dialog = document.querySelector('[greetdialog]');

	dialog.innerHTML = `
	<dialog style="z-index: 1000;" id="dialog">
		<h2>Bruhhhhh, You Failed!!!</h2>
		<p>You've Failed the ${dialog.getAttribute('page')} challenge!</p>
		<h4>Press the button below to retry!!!</h4>
		<form method="dialog">
			<button autofocus id="tryAgain">Try Again</button>
			<button id="finishHomePressed">Go Home</button>
		</form>
	</dialog>  
	`

	document.querySelector('#dialog').showModal();open

	document.querySelector('#finishHomePressed').addEventListener('click', () => {
		window.location.href = '/'
	})
	document.querySelector('#tryAgain').addEventListener('click', () => {
		window.location.reload()
	})
}
