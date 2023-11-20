var colorSwatches = [];
var lives = 5;
const numSwatches = 50;

function getRandomColor() {
	var shades = ['red', 'purple', 'blue'];
	var colorIndex = Math.floor(Math.random() * shades.length);
	var shade = shades[colorIndex];
	var color = '';
	var redValue = Math.floor(Math.random() * 156) + 100;
	var blueValue = Math.floor(Math.random() * 156) + 100;

	if (shade === 'red') {
		color = 'rgb(' + redValue + ', 0, 0)';
	} else if (shade === 'purple') {
		color = 'rgb('+redValue+', 0, ' + blueValue + ')';
	} else if (shade === 'blue') {
		color = 'rgb(0, 0 ,' + blueValue + ')';
	}

	return color;
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function generateColorSwatches() {
	var targetIndex = Math.floor(Math.random() * numSwatches);
	var targetIndex2 = targetIndex;
	while (targetIndex == targetIndex2){
		targetIndex2 = Math.floor(Math.random() * numSwatches);
	}
	colorSwatches = Array.from({ length: numSwatches }, function () {
		return getRandomColor();
	});
	colorSwatches[targetIndex] = '#88002B';
	colorSwatches[targetIndex2] = '#004C80';
	shuffleArray(colorSwatches);
}

function handleSwatchClick(swatch) {
	if ((swatch.style.backgroundColor === 'rgb(136, 0, 43)')||(swatch.style.backgroundColor === 'rgb(0, 76, 128)')) {
		console.log("innovationvsa{fInALLy_f0UNd_1t}")
		finishLevel(nextlv = '/lv4')
	} else {
		lives--;
		document.getElementById('lives').textContent = 'Lives: ' + lives;

		if (lives === 0) {
			failLevel()
			lives = 5;
			document.getElementById('lives').textContent = 'Lives: ' + lives;
			generateColorSwatches();
			createColorSwatches();
		} else {
			// alert('Oops! Try again.');
		}
	}
}

function createColorSwatches() {
	var swatchContainer = document.getElementById('swatch-container');
	if (swatchContainer) {
		swatchContainer.remove();
	}

	swatchContainer = document.createElement('div');
	swatchContainer.id = 'swatch-container';

	colorSwatches.forEach(function (color) {
		var swatch = document.createElement('div');
		swatch.classList.add('color-swatch', 'card');
		swatch.style.backgroundColor = color;
		swatch.addEventListener('click', function () {
		handleSwatchClick(swatch);
		});
		swatchContainer.appendChild(swatch);
	});

	document.querySelector('.main').appendChild(swatchContainer);
}

document.getElementById('lives').textContent = 'Lives: ' + lives;
generateColorSwatches();
createColorSwatches();
