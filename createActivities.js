import fs from "fs";
import axios from "axios";
const triviaAPIURL = "https://opentdb.com/api.php"
const boredAPIURL = 'http://www.boredapi.com/api/activity/'
const boredAPI = axios.create({
    baseURL: boredAPIURL
});
const triviaAPI = axios.create({
    baseURL: triviaAPIURL
});

export async function getBoredActivities(answers) {
    console.log(answers)
    const activitiesArray = []
    const activitiesNumber = answers.num
    for (let index = 0; index < activitiesNumber; index++) {
        const response = await boredAPI.get("", {
            params: {
                participants: answers.part,
                type: answers.act,
                minprice: 0,
                maxprice: answers.cash,
            }
        });
        activitiesArray.push(response.data)
    }
    console.log(activitiesArray)
    return activitiesArray
}


export async function getTriviaQuestions(answers) {
    const response = await triviaAPI.get("", {
        params: {
            amount: answers.quest,
            category: answers.cat,
            difficulty: answers.diff,
            type: answers.type
        }
    });
    console.log(response.data.results)
    return response.data.results
}

export function createHTML(activitiesArray, triviaArray){
    const htmlString = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Trivia Questions</title>
    </head>
    <body>
        <header>
    
        </header>
        <main>
            <section id="intro">
                <h1>Welcome to the Trivia Questions app! To use this, you must [to be added later]</h1>
            </section>
            <section id="activity-list">
                    <ul id="list">
                        ${activitiesArray.map(activity => {
                            return `<li>${activity.activity}</li>`
                        }).join(" ")}

                    </ul>
            </section>
            <section id="trivia-questions">
            <!-- <h2>Trivia Questions</h2>
            <button id="play" class="btn">Start Game</button> -->
            <header id="statbar">
                <div><span id="timer"></span></span> seconds</div>
                <div><span id="score">0</span> points</div>
            </header>
            <h3 id="quest"></h3>
            <div id="answerArray">
            </div>
            <p id="correct-answer">The correct answer is: </p>
        </section>
        </main>
        <footer>
    
        </footer>
    </body>
    <script>
    let triviaArray = ${JSON.stringify(triviaArray)}
    </script>
    <script src="game.js"></script>
    </html>`
    fs.writeFile("./index.html", htmlString, () => {
        console.log("finished")
    });

}