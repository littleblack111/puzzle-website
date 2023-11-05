function finishLevel() {
	let dialog = document.querySelector('[greetdialog]');

	dialog.innerHTML = `
	<dialog style="z-index: 1000;" id="dialog">
		<h2>Yoooo! Congratulations!!!</h2>
		<p>You've completed the ${dialog.getAttribute('page')} challenge!</p>
		<h4>Press the button below to go to the next level!!!</h4>
		<form method="dialog">
			<button autofocus id="finishPressed">Let's Go!</button>
			<button id="finishHomePressed">Go Home!</button>
			<button id="tryAgain">Try Again</button>
		</form>
	</dialog>  
	`

	document.querySelector('#dialog').showModal();open

	document.querySelector('#finishPressed').addEventListener('click', () => {
		window.location.href = nextlv
	})
	document.querySelector('#finishHomePressed').addEventListener('click', () => {
		window.location.href = '/'
	})
	document.querySelector('#tryAgain').addEventListener('click', () => {
		window.location.reload()
	})
}
