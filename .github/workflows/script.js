const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Who developed JavaScript?", options: ["Guido van Rossum", "Brendan Eich", "James Gosling", "Bjarne Stroustrup"], answer: "Brendan Eich" },
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Which is a programming language?", options: ["HTML", "CSS", "JavaScript", "XML"], answer: "JavaScript" },
    { question: "Which one is used for styling webpages?", options: ["Java", "Python", "CSS", "SQL"], answer: "CSS" },
    { question: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "Hyper Transfer Text Protocol", "High Text Transfer Protocol", "Hyperlink Transfer Text Protocol"], answer: "HyperText Transfer Protocol" },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
    { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: "Leonardo da Vinci" },
    { question: "What is the largest planet in our solar system?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Jupiter" },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" }

];

let currentUser = localStorage.getItem("examUser");
if (!currentUser) window.location.href = "index.html";

let examContainer = document.getElementById("questions");
let score = 0;

questions.forEach((q, index) => {
    let questionBlock = document.createElement("div");
    questionBlock.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    
    q.options.forEach(opt => {
        questionBlock.innerHTML += `<input type="radio" name="q${index}" value="${opt}"> ${opt} <br>`;
    });

    examContainer.appendChild(questionBlock);
});

function submitExam() {
    questions.forEach((q, index) => {
        let selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && selected.value === q.answer) score++;
    });

    localStorage.setItem("examScore", score);
    window.location.href = "results.html";
}

// Timer Functionality
let timeLeft = 600;
let timerDisplay = document.getElementById("time");

function startTimer() {
    let timer = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            submitExam();
        }
    }, 1000);
}

startTimer();
