"use strict";

var dialog = document.querySelector('[greetdialog]');
dialog.innerHTML = "\n<dialog style=\"z-index: 1000;\" id=\"dialog\">\n\t<h2>Greetings! Welcome to the Solve the puzzle challenge</h2>\n\t<p>This is the ".concat(dialog.getAttribute('page'), " challenge!</p>\n\t<h4>Good Luck!!!</h4>\n\t<form method=\"dialog\">\n\t\t<button autofocus>Let's Start!</button>\n\t</form>\n</dialog>  \n");
document.querySelector('#dialog').showModal();
open;