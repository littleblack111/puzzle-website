"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var moves = document.getElementById("moves-count");
var timeValue = document.getElementById("time");
var score = document.getElementById("score");
var avgScore = document.getElementById('avgScore');
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var gameContainer = document.querySelector(".game-container");
var result = document.getElementById("result");
var controls = document.querySelector(".controls-container");
var cards;
var interval;
var firstCard = false;
var secondCard = false;

//Items array
var items = [{
  name: "A",
  image: "/images/A.png"
}, {
  name: "2",
  image: "/images/2.png"
}, {
  name: "3",
  image: "/images/3.png"
}, {
  name: "4",
  image: "/images/4.png"
}, {
  name: "5",
  image: "/images/5.png"
}, {
  name: "6",
  image: "/images/6.png"
}, {
  name: "7",
  image: "/images/7.png"
}, {
  name: "8",
  image: "/images/8.png"
}, {
  name: "9",
  image: "/images/9.png"
}, {
  name: "10",
  image: "/images/10.png"
}, {
  name: "J",
  image: "/images/J.png"
}, {
  name: "Q",
  image: "/images/Q.png"
}];

//Initial Time
var seconds = 0,
  minutes = 0;
//Initial moves and win count
var movesCount = 0;
var winCount = 0;

// Add this at the end of your timeGenerator function
var avgScoreCalculator = function avgScoreCalculator() {
  var time = minutes + seconds / 60;
  var avg = winCount / 2 / time;
  avgScore.innerHTML = "<span>Avg Score:</span> ".concat(avg.toFixed(2));
};

//For timer
var timeGenerator = function timeGenerator() {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  var secondsValue = seconds < 10 ? "0".concat(seconds) : seconds;
  var minutesValue = minutes < 10 ? "0".concat(minutes) : minutes;
  timeValue.innerHTML = "<span>Time:</span>".concat(minutesValue, ":").concat(secondsValue);
  avgScoreCalculator();
};

//For calculating moves
var movesCounter = function movesCounter() {
  movesCount += 1;
  moves.innerHTML = "<span>Moves:</span>".concat(movesCount);
};

//Pick random objects from the items array
var generateRandom = function generateRandom() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
  //temporary array
  var tempArray = [].concat(items);
  //initializes cardValues array
  var cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = size * size / 2;
  //Random object selection
  for (var i = 0; i < size; i++) {
    var randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
var matrixGenerator = function matrixGenerator(cardValues) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  gameContainer.innerHTML = "";
  cardValues = [].concat(_toConsumableArray(cardValues), _toConsumableArray(cardValues));
  //simple shuffle
  cardValues.sort(function () {
    return Math.random() - 0.5;
  });
  for (var i = 0; i < size * size; i++) {
    /*
    	Create Cards
    	before => front side (contains question mark)
    	after => back side (contains actual image);
    	data-card-values is a custom attribute which stores the names of the cards to match later
    */
    gameContainer.innerHTML += "\n\t\t<div class=\"card-container\" data-card-value=\"".concat(cardValues[i].name, "\">\n\t\t\t<div class=\"card-before\">?</div>\n\t\t\t<div class=\"card-after\">\n\t\t\t<img src=\"").concat(cardValues[i].image, "\" class=\"image\"/></div>\n\t\t</div>\n\t\t");
  }
  if (winCount == Math.floor(cardValues.length / 2)) {
    result.innerHTML = "<h2>You Won</h2>\n\t<h4>Moves: ".concat(movesCount, "</h4>");
    avgScoreCalculator();
    stopGame();
  }
  //Grid
  gameContainer.style.gridTemplateColumns = "repeat(".concat(size, ",auto)");

  //Cards
  cards = document.querySelectorAll(".card-container");
  score.innerHTML = "<span>Score:</span>".concat(winCount, "/").concat(Math.floor(cardValues.length / 2));
  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          var secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue && firstCard != secondCard) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            score.innerHTML = "<span>Score:</span>".concat(winCount, "/").concat(cardValues.length);
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = "<h2>You Won</h2>\n\t\t\t\t<h4>Moves: ".concat(movesCount, "</h4>");
              stopGame();
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            var tempFirst = firstCard,
              tempSecond = secondCard;
            firstCard = false;
            secondCard = false;
            var delay = setTimeout(function () {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Start game
startButton.addEventListener("click", function () {
  startGame();
});

//Stop game
stopButton.addEventListener("click", stopGame = function stopGame() {
  window.location.href = "javascript:finishLevel(nextlv = '/lv3')";
  stopButton.classList.add("hide");
  clearInterval(interval);
});

//Initialize values and func calls
var initializer = function initializer() {
  result.innerText = "";
  winCount = 0;
  var cardValues = generateRandom();
  matrixGenerator(cardValues);
};
function startGame() {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  //controls amd buttons visibility
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = "<span>Moves:</span> ".concat(movesCount);
  initializer();
}
;
startGame();