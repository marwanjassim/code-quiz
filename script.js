var time = 0;
var disp = document.getElementById("time")
var quizArea = document.getElementById("quiz")
var timer = null

function timerFunction() {
  // -1 second, check if game is still going 
  time = time - 1
  if (time <= 0) {
    disp.innerHTML = "0"
    gameOver(0)
  } else {
    disp.innerHTML = time
  }
}

function startGame() {
  // Set up time
  time = questions.length * 15
  disp.innerHTML = time
  // Start timer function
  timer = setInterval(timerFunction, 1000);
  // Start game!
  showQuestion(0)
}

function saveScore(score) {

}

function clearScores() {

}

function showScores() {

}

function gameOver(finalTime) {
  // Stop the game timer
  clearInterval(timer)
}

function showQuestion(num) {
    // Somewhere to put our HTML
    var output = []

    // Add question
    output.push(`<h1>${questions[num].title}</h1>`)

    // Add all answers
    for (answer of questions[num].choices) {
        output.push(
            `<button onClick="answerQuestion(${num}, '${answer}')">
                ${answer}
            </button>`)
    }

    // Put it on the page
    quizArea.innerHTML = output.join("")
}

function answerQuestion(num, answer){
  if (answer !== questions[num].answer) {
    time = time - 15
    disp.innerHTML = time
  }

  if (num + 1 < questions.length) {
      showQuestion(num+1)
  } else {
      gameOver(time)
  }
}