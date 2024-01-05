const questions = [
  {
    question: "What is the capital of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Canberra", correct: true },
      { text: "Melbourne", correct: false },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "In which continent is the Amazon Rainforest located?",
    answers: [
      { text: "Africa", correct: false },
      { text: "South America", correct: true },
      { text: "Asia", correct: false },
      { text: "North America", correct: false },
    ],
  },
  {
    question: "What is the highest mountain in the world?",
    answers: [
      { text: "Mount Kilimanjaro", correct: false },
      { text: "Mount Everest", correct: true },
      { text: "Mount McKinley", correct: false },
      { text: "Mount Fuji", correct: false },
    ],
  },
  {
    question: "Which river is the longest in the world?",
    answers: [
      { text: "Nile River", correct: true },
      { text: "Amazon River", correct: false },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
    ],
  },
  {
    question: "What is the capital of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Ottawa", correct: true },
      { text: "Montreal", correct: false },
    ],
  },
  {
    question: "In which ocean is the Great Barrier Reef located?",
    answers: [
      { text: "Indian Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Southern Ocean", correct: false },
    ],
  },
  {
    question: "Which desert is often referred to as the 'Roof of the World'?",
    answers: [
      { text: "Gobi Desert", correct: false },
      { text: "Sahara Desert", correct: false },
      { text: "Atacama Desert", correct: false },
      { text: "Tibetan Plateau", correct: true },
    ],
  },
  {
    question: "What is the capital of Japan?",
    answers: [
      { text: "Beijing", correct: false },
      { text: "Seoul", correct: false },
      { text: "Tokyo", correct: true },
      { text: "Bangkok", correct: false },
    ],
  },
  {
    question: "Which country is known as the 'Land of the Midnight Sun'?",
    answers: [
      { text: "Norway", correct: true },
      { text: "Sweden", correct: false },
      { text: "Finland", correct: false },
      { text: "Iceland", correct: false },
    ],
  },
  {
    question: "Which sea is located between Europe and Africa?",
    answers: [
      { text: "Mediterranean Sea", correct: true },
      { text: "Black Sea", correct: false },
      { text: "Red Sea", correct: false },
      { text: "Adriatic Sea", correct: false },
    ],
  },
];
const questionEL = document.getElementById("question");
const answerButtonsEL = document.getElementById("answer-buttons");
const nextBtnEL = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtnEL.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionEL.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtonsEL.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextBtnEL.style.visibility = "hidden";
  while (answerButtonsEL.firstChild) {
    answerButtonsEL.removeChild(answerButtonsEL.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtonsEL.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtnEL.style.visibility = "visible";
}

function showScore() {
  resetState();
  questionEL.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtnEL.innerHTML = "Play Again";
  nextBtnEL.style.visibility = "visible";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextBtnEL.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
