"use strict";

var header = document.querySelector('[header]');
var newElement = document.createElement('div');
var page = header.getAttribute('page');
newElement.innerHTML = "\n<!-- header -->\n<header id=\"navBarHeader\">\n\t<nav class=\"navBar\">\n\t\t<div class=\"hleft\">\n\t\t\t<a onclick=\"goBack()\" id=\"btnBack\" style=\"text-decoration: unset; cursor: pointer;\">Back<span></span></span></a>\n\t\t</div>\n\t</nav> \n</header>\n";
header.appendChild(newElement);
function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.replace('/');
  }
}