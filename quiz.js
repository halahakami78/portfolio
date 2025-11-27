// js/quiz.js
document.addEventListener("DOMContentLoaded", () => {
  const questionEl = document.getElementById("question");
  const form = document.getElementById("answer-form");
  const answerInput = document.getElementById("answer");
  const feedbackEl = document.getElementById("feedback");
  const scoreEl = document.getElementById("score");

  const TOTAL_QUESTIONS = 3;   // ← exactly 3 per requirement
  let questions = [];
  let index = 0;
  let score = 0;
  let locked = false;

  // Build 3 questions up front (for-loop + Math.random)
  function generateQuestions() {
    questions = [];
    const ops = ["+", "-", "*"];
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      const a = Math.floor(Math.random() * 10) + 1; // 1..10
      const b = Math.floor(Math.random() * 10) + 1;
      const op = ops[Math.floor(Math.random() * ops.length)];
      const ans = op === "+" ? a + b : op === "-" ? a - b : a * b;

      questions.push({ text: `${a} ${op} ${b} = ?`, answer: ans });
    }
  }

  function renderQuestion() {
    const qNum = index + 1;
    questionEl.textContent = `Question ${qNum}/${TOTAL_QUESTIONS}: ${questions[index].text}`;
    feedbackEl.textContent = "";
    feedbackEl.className = "";
    answerInput.value = "";
    answerInput.focus();
    locked = false;
  }

  function finishQuiz() {
    questionEl.textContent = "Quiz Completed!";
    form.style.display = "none";
    feedbackEl.textContent = "";
    scoreEl.textContent = `Your score: ${score}/${TOTAL_QUESTIONS}`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (locked) return;
    locked = true;

    const user = Number(answerInput.value);
    const correct = questions[index].answer;

    if (Number.isNaN(user)) {
      feedbackEl.textContent = "Please enter a number.";
      feedbackEl.className = "wrong";
      locked = false;
      return;
    }

    if (user === correct) {
      feedbackEl.textContent = "✅ Correct!";
      feedbackEl.className = "correct";
      score++;
    } else {
      feedbackEl.textContent = `❌ Wrong! The correct answer was ${correct}.`;
      feedbackEl.className = "wrong";
    }

    setTimeout(() => {
      index++;
      if (index < TOTAL_QUESTIONS) {
        renderQuestion();
      } else {
        finishQuiz();
      }
    }, 800);
  });

  generateQuestions();
  renderQuestion();
});
