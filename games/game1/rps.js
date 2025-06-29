// Rock Paper Scissors Logic
const choices = ["rock", "paper", "scissors"];
const images = document.querySelectorAll(".choice");

images.forEach(img => {
  img.addEventListener("click", () => {
    const userChoice = img.dataset.choice;
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    // عرض النصوص
    document.getElementById("user-choice").textContent = userChoice;
    document.getElementById("computer-choice").textContent = computerChoice;

    // تحديد النتيجة وتغيير لون الخلفية للنص
    const result = getWinner(userChoice, computerChoice);
    const winnerElem = document.getElementById("winner");
    winnerElem.textContent = result.text;
    winnerElem.className = result.class;

    // تلوين اختيارات المستخدم والكمبيوتر حسب النتيجة
    const userText = document.getElementById("user-choice");
    const computerText = document.getElementById("computer-choice");

    userText.classList.remove("win-text", "lose-text", "draw-text");
    computerText.classList.remove("win-text", "lose-text", "draw-text");

    if (result.class === "win") {
      userText.classList.add("win-text");
      computerText.classList.add("lose-text");
    } else if (result.class === "lose") {
      userText.classList.add("lose-text");
      computerText.classList.add("win-text");
    } else {
      userText.classList.add("draw-text");
      computerText.classList.add("draw-text");
    }
  });
});

// تحديد الفائز
function getWinner(user, comp) {
  if (user === comp) return { text: "It's a Draw!", class: "draw" };

  if (
    (user === "rock" && comp === "scissors") ||
    (user === "paper" && comp === "rock") ||
    (user === "scissors" && comp === "paper")
  ) {
    return { text: "You Win!", class: "win" };
  }

  return { text: "Computer Wins!", class: "lose" };
}