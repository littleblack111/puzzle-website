"use strict";

function finishLevel() {
  var dialog = document.querySelector('[greetdialog]');
  dialog.innerHTML = "\n\t<dialog style=\"z-index: 1000;\" id=\"dialog\">\n\t\t<h2>Yoooo! Congratulations!!!</h2>\n\t\t<p>You've completed the ".concat(dialog.getAttribute('page'), " challenge!</p>\n\t\t<h4>Press the button below to go to the next level!!!</h4>\n\t\t<form method=\"dialog\">\n\t\t\t<button autofocus id=\"finishPressed\">Let's Go!</button>\n\t\t\t<button id=\"finishHomePressed\">Go Home!</button>\n\t\t\t<button id=\"tryAgain\">Try Again</button>\n\t\t</form>\n\t</dialog>  \n\t");
  document.querySelector('#dialog').showModal();
  open;
  document.querySelector('#finishPressed').addEventListener('click', function () {
    window.location.href = nextlv;
  });
  document.querySelector('#finishHomePressed').addEventListener('click', function () {
    window.location.href = '/';
  });
  document.querySelector('#tryAgain').addEventListener('click', function () {
    window.location.reload();
  });
}