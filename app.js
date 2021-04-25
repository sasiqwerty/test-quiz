const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElements = document.getElementById("answer-buttons");
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  console.log("game has been started");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  navigator.vibrate(30);
  setNextQuestion();
}
function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}
function showQuestion(question) {
  questionElement.textContent = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElements.appendChild(button);
  });
}
function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElements.firstChild) {
    answerButtonsElements.removeChild(answerButtonsElements.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElements.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  navigator.vibrate(30);
  if (shuffledQuestions.length - 1 > currentQuestionIndex) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Reset";
    startButton.classList.remove("hide");
    questionElement.innerText =
      "You have completed the test, press reset to start again";
    resetState();
  }
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
const questions = [
  {
    question: "what is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
      { text: "52", correct: false },
      { text: "14", correct: false },
    ],
  },
  {
    question: "what is 5 + 2?",
    answers: [
      { text: "22", correct: false },
      { text: "52", correct: false },
      { text: "7", correct: true },
      { text: "14", correct: false },
    ],
  },
  {
    question: "what is 11 + 2?",
    answers: [
      { text: "22", correct: false },
      { text: "52", correct: false },
      { text: "13", correct: true },
      { text: "14", correct: false },
    ],
  },
  {
    question: "what is 52 + 2?",
    answers: [
      { text: "22", correct: false },
      { text: "54", correct: true },
      { text: "52", correct: false },
      { text: "14", correct: false },
    ],
  },
  {
    question: "what is 40 + 2?",
    answers: [
      { text: "42", correct: true },
      { text: "22", correct: false },
      { text: "52", correct: false },
      { text: "14", correct: false },
    ],
  },
  {
    question: "what is 78 + 2?",
    answers: [
      { text: "22", correct: false },
      { text: "52", correct: false },
      { text: "14", correct: false },
      { text: "80", correct: true },
    ],
  },
  {
    question: "what is 100 + 100?",
    answers: [
      { text: "22", correct: false },
      { text: "200", correct: true },
      { text: "52", correct: false },
      { text: "14", correct: false },
    ],
  },
];
