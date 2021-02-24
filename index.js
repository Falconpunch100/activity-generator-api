import { getBoredActivities } from "./createActivities.js"
import { getTriviaQuestions } from "./createActivities.js"
import { createHTML } from "./createActivities.js"
import inquirer from "inquirer"
import path from "path"
const categories = [{"id":9,"name":"General Knowledge"},{"id":10,"name":"Entertainment: Books"},{"id":11,"name":"Entertainment: Film"},{"id":12,"name":"Entertainment: Music"},{"id":13,"name":"Entertainment: Musicals & Theatres"},{"id":14,"name":"Entertainment: Television"},{"id":15,"name":"Entertainment: Video Games"},{"id":16,"name":"Entertainment: Board Games"},{"id":17,"name":"Science & Nature"},{"id":18,"name":"Science: Computers"},{"id":19,"name":"Science: Mathematics"},{"id":20,"name":"Mythology"},{"id":21,"name":"Sports"},{"id":22,"name":"Geography"},{"id":23,"name":"History"},{"id":24,"name":"Politics"},{"id":25,"name":"Art"},{"id":26,"name":"Celebrities"},{"id":27,"name":"Animals"},{"id":28,"name":"Vehicles"},{"id":29,"name":"Entertainment: Comics"},{"id":30,"name":"Science: Gadgets"},{"id":31,"name":"Entertainment: Japanese Anime & Manga"},{"id":32,"name":"Entertainment: Cartoon & Animations"}]
const questions = [
    {
        name: "part",
        type: "input",
        message: "How many participants do you have?",
        default: "1"
    },
    {
        name: "act",
        type: "checkbox",
        message: "What activities do you like? Select all that apply.",
        choices: ["recreational", "relaxation", "diy", "social", "busywork", "music", "education", "cooking", "charity"],
        default: ""
    },
    {
        name: "num",
        type: "input",
        message: "How many activities do you want to be suggested with? (Max 10)",
        default: 5,
    },
    {
        name: "cash",
        type: "input",
        message: "On a scale of 0 to 1 including decimals, how willing are you to spend cash on an activity?",
        default: 0.5
    },
    {
        name: "quest",
        type: "input",
        message: "How many questions do you want?",
        default: 10
    },
    {
        name: "cat",
        type: "checkbox",
        message: "Select one category you want. If you want all categories, leave this blank.",
        choices: categories.map(category => {
             return category.name
        }),
        default: ""
    },
    {
        name: "diff",
        type: "checkbox",
        message: "Select a difficulty level.  If you want all categories, leave this blank.",
        choices: ["easy", "medium", "hard"],
        default: ""
    },
    {
        name: "type",
        type: "checkbox",
        message: "Do you prefer multiple choice questions or true/false questions? If you prefer both, leave this blank.",
        choices: ["multiple", "boolean"],
        default: ""
    },
]


async function askQuestions() {
    let response = await inquirer.prompt(questions)
    const activitiesArray = await getBoredActivities(response)
    const triviaArray = await getTriviaQuestions(response)
    createHTML(activitiesArray, triviaArray)
}
askQuestions()

