const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreElement = document.getElementById("score");

let userAnswers = JSON.parse(sessionStorage.getItem("userAnswers") || "[]");

while (userAnswers.length < questions.length) {
  userAnswers.push(null);
}

function saveAnswers() {
  const radios = document.querySelectorAll("input[type=radio]");
  radios.forEach(radio => {
    if (radio.checked) {
      const qIndex = parseInt(radio.name.split("-")[1]);
      userAnswers[qIndex] = radio.value;
    }
  });
  sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
}


function showScore() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  scoreElement.textContent = Your score is ${score} out of ${questions.length}.;
  localStorage.setItem("score", score);
}


const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = Your score is ${savedScore} out of ${questions.length}.;
}

questionsElement.addEventListener("change", saveAnswers);

submitBtn.addEventListener("click", () => {
  saveAnswers();
  showScore();
});