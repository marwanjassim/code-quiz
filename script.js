var time = 0;
var disp = document.getElementById("time")
var quizArea = document.getElementById("quiz")
var timer = null

function timerFunction() {
  // -1 second, check if game is still going 
  time = time - 1
  if (time <= 0) {
    gameOver(time)
  } else {
    disp.innerHTML = "Time remaining: " + time
  }
}

function startGame() {
  // Set up time
  time = questions.length * 15
  disp.innerHTML = "Time remaining: " + time
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
    output.push(
        `<table class="table">
        <thead>
            <tr>
            <th scope="col">Name</th>
            <th scope="col">Score</th>
            </tr>
        </thead>
        <tbody>`)
    scores.forEach(function(score) {
        output.push(`<tr><td>${score.name}</td><td>${score.score}</td></tr>`)
    })
    output.push("</tbody></table>")
    output.push(
        `<div class="row">
         <div class="col-12 col-md-6 mb-2">
            <button class="btn btn-primary w-100" onclick="window.location.reload()">Back</button>
         </div>
         <div class="col-12 col-md-6 mb-2">
            <button class="btn btn-danger w-100"  onclick="clearScores()">Clear</button>
         </div></div>`)
    quizArea.innerHTML = output.join(" ")
}

function gameOver(finalTime) {
  // Clear time display
  disp.innerHTML = ""

  // If less than 0, score is 0
  if (finalTime < 0) {
      finalTime = 0
  }

  // Stop the game timer
  clearInterval(timer)
  var html = `
  <p>Your final score is ${finalTime}.</p>
  <form class="row">
    <div class="col-12 col-md-8 mb-3">
      <input id="name" class="form-control w-100" type="text" placeholder="Please type in your name"></input>
    </div>
    <div class="col-12 col-md-4">
      <button class="w-100 btn btn-primary" onclick="saveScore(${finalTime})" action="submit">Save</button>
    </div>
  </form>`
  quizArea.innerHTML = html
}

function showQuestion(num) {
    // Somewhere to put our HTML
    var output = []

    // Add question
    output.push(`<h4>${questions[num].title}</h4>`)

    // Add all answers
    output.push("<div class='row'>")
    for (answer of questions[num].choices) {
        output.push(
            `<div class="col-12 col-md-6">
             <button class="btn btn-primary w-100 mb-4" onClick="answerQuestion(${num}, '${answer}')">
                ${answer}
             </button></div>`)
    }
    output.push("</div>")

    // Put it on the page
    quizArea.innerHTML = output.join(" ")
}

function answerQuestion(num, answer){
  if (answer !== questions[num].answer) {
    time = time - 15
    disp.innerHTML = "Time remaining: " + time
  }

  if (num + 1 < questions.length) {
      showQuestion(num+1)
  } else {
      gameOver(time)
  }
}