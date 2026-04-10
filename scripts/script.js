let score = 0;

const marvin = document.getElementById("marvin");
const scoreDisplay = document.getElementById("score");

marvin.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
});