window.onload = function() {
	const correct = document.getElementById(Math.floor(Math.random() * 12) + 1 + "tryme")
	correct.href = "javascript:finishLevel(nextlv = '/lv2')";
}