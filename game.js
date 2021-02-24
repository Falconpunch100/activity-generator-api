let scoreElement = document.getElementById("score")
let score = 0;
let timer = document.getElementById("timer")
let globalTimerID;
let quest = document.getElementById("quest")
let correctAnswer = document.getElementById("correct-answer")
//let answerArray = document.getElementById("answerArray")
let questions = triviaArray.slice()

questions = questions.map((question) => {
    if (question.difficulty === "easy") {
        question.points = 1;
        return question;
    }
    else if (question.difficulty === "medium") {
        question.points = 3;
        return question;
    }
    else if (question.difficulty === "hard") {
        question.points = 5;
        return question;
    }
});
let questionNum = 0;
let play = document.getElementById("play")
let trivia = document.getElementById("trivia-questions")
function clearTrivia() {
    trivia.innerHTML = ""
}

// play.addEventListener("click", () => {
//     clearTrivia()
// });

function displayNextQuestion() {
    //clearTrivia()
    //debugger
    //startTimer()
    var clear = document.getElementById("answerArray");
    let quest = document.getElementById("quest")
    if (quest) quest.remove();
    if (clear) clear.remove();
    let currentQuestion = questions[questionNum];
    let answerArray = document.createElement("div")
    answerArray.setAttribute("id", "answerArray")
    let questionText = `<h3 id="quest">${currentQuestion.question}</h3>`
    trivia.innerHTML += questionText
    trivia.append(answerArray)
    const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    if (currentQuestion.type === "boolean") {
        answerArray.innerHTML = `<h4 class="answer">A: ${getRandomArrayIndex(allAnswers)}</h4>
        <h4 class="answer">B: ${getRandomArrayIndex(allAnswers)}</h4>`
    }
    else {
        answerArray.innerHTML = `<h4 class="answer">A: ${getRandomArrayIndex(allAnswers)}</h4>
        <h4 class="answer">B: ${getRandomArrayIndex(allAnswers)}</h4>
        <h4 class="answer">C: ${getRandomArrayIndex(allAnswers)}</h4>
        <h4 class="answer">D: ${getRandomArrayIndex(allAnswers)}</h4>`
    }

    const h4Arr = document.getElementsByClassName("answer")
    for (let i = 0; i < h4Arr.length; i++) {
        const element = h4Arr[i];
        element.addEventListener("click", (e) => {
            const chosenAnswer = e.target.textContent
            let parsedAnswer = chosenAnswer.slice(3)
            console.log(parsedAnswer, questions[questionNum].correct_answer)
            if (parsedAnswer === questions[questionNum].correct_answer) {
                score += questions[questionNum].points;
                correctAnswer.textContent = `Correct! Answer: ${questions[questionNum].correct_answer}`
            }
            else {
                score -= 2;
                correctAnswer.textContent = `Wrong! Answer: ${questions[questionNum].correct_answer}`
            }
            correctAnswer.style.display = "inherit"
            console.log(correctAnswer)
            debugger
            setTimeout(() => {
                scoreElement.textContent = score;
                questionNum++;
                if (questionNum < questions.length) {
                    console.log("inside if")
                    displayNextQuestion()
                    console.log(globalTimerID)
                    //clearInterval(globalTimerID);
                    //startTimer()
                    correctAnswer.style.display = "none"
                }
            }, 1500);

        });
    };
}

function answerQuestions() {

}

function getRandomArrayIndex(arr) {
    let random = Math.floor(Math.random() * arr.length)
    let retVal = arr[random]
    arr.splice(random, 1)
    return retVal;
}

displayNextQuestion()

function startTimer() {
    timer.innerHTML = ""
    let time = 30;
    let timerID = setInterval(() => {
        timer.textContent = time;
        time--;
        if (time === -1) {
            clearInterval(timerID)
        }
    }, 1000);
    globalTimerID = timerID;
}