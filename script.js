// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: "Paris"
    },
    {
        question: "Who is the current president of the United States?",
        choices: ["Joe Biden", "Barack Obama", "Donald Trump", "George Bush"],
        correct: "Joe Biden"
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: "Jupiter"
    },
    {
        question: "What is the square root of 64?",
        choices: ["6", "7", "8", "9"],
        correct: "8"
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let hasAnswered = false;

// DOM elements
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');

// Function to load a question
function loadQuestion() {
    hasAnswered = false; // Reset the answer state
    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    choicesElement.innerHTML = '';  // Clear previous choices

    // Display the choices
    currentQuiz.choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click', () => selectAnswer(li, choice));
        choicesElement.appendChild(li);
    });

    resultElement.style.display = 'none';  // Hide result
    nextButton.disabled = true; // Disable the Next button until an answer is selected
}

// Function to handle answer selection
function selectAnswer(selectedLi, selected) {
    if (hasAnswered) return; // Prevent multiple selections
    hasAnswered = true;

    const correctAnswer = quizData[currentQuestion].correct;

    // Check if the selected answer is correct
    if (selected === correctAnswer) {
        score++;
        selectedLi.style.backgroundColor = 'green';  // Turn correct answer green
    } else {
        selectedLi.style.backgroundColor = 'red';    // Turn wrong answer red
        // Highlight the correct answer
        Array.from(choicesElement.children).forEach((li) => {
            if (li.textContent === correctAnswer) {
                li.style.backgroundColor = 'green';
            }
        });
    }

    nextButton.disabled = false; // Enable the Next button after an answer is selected
}

// Function to show the final result
function showResult() {
    questionElement.textContent = 'Quiz Completed!';
    choicesElement.innerHTML = '';
    resultElement.textContent = `You scored ${score} out of ${quizData.length}!`;
    resultElement.style.display = 'block';

    // Show "Play Again" button
    nextButton.textContent = "Play Again";
    nextButton.style.display = 'inline-block';
}

// Function to restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    nextButton.textContent = "Next";
    loadQuestion();
}

// Function to go to the next question or finish the quiz
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
        nextButton.addEventListener('click', restartQuiz, { once: true });
    }
}

// Initial setup
loadQuestion();

// Event listener for the Next button
nextButton.addEventListener('click', nextQuestion);
