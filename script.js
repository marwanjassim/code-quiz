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
    var name = document.getElementById('name').value
    var scores = window.localStorage.getItem('scores')

    // If no array is saved, make an empty one first
    if (scores === null) {
        scores = []
    } else {
        scores = JSON.parse(scores)
    }

    // Save score
    var savedScore = {
        name: name,
        score: score
    }
    scores.push(savedScore)

    // Save to local storage
    var scores = window.localStorage.setItem('scores', JSON.stringify(scores))
    
    // Show high scores
    showScores()
}

function clearScores() {
    window.localStorage.clear()
    showScores()
}

function showScores() {
    var scores = window.localStorage.getItem('scores')

    // If no array is saved, make an empty one first
    if (scores === null) {
        scores = []
    } else {
        scores = JSON.parse(scores)
    }

    // scores = []
    // score = {name:"Alex", score: 32}
    var output = []
    output.push("<ul>")
    scores.forEach(function(score) {
        output.push(`<li><b>${score.name}</b>: ${score.score}</li>`)
    })
    output.push("</ul>")
    output.push("<button onclick='window.location.reload()'>Back</button>")
    output.push("<button onclick='clearScores()'>Clear</button>")
    quizArea.innerHTML = output.join("")
}

function gameOver(finalTime) {
  // Stop the game timer
  clearInterval(timer)
  var html = `
  <h1>Quiz over</h1>
  <p>Your final score is ${finalTime}.</p>
  <input id="name" type="text" placeholder="Please type in your name"></input>
  <button onclick="saveScore(${finalTime})">Save</button>`
  quizArea.innerHTML = html
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