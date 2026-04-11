window.onload = function () {

    let score = parseInt(localStorage.getItem("score")) || 0;
    let passiveScore = parseInt(localStorage.getItem("passive")) || 0;

    const marvin = document.getElementById("marvin");
    const scoreDisplay = document.getElementById("score");

    scoreDisplay.textContent = score;

    marvin.addEventListener("click", () => {
        score++;
        passiveScore += 1;
        scoreDisplay.textContent = score;
        localStorage.setItem("score", score);
    });

    setInterval(() => {
        score += passiveScore;
        scoreDisplay.textContent = score;
        localStorage.setItem("score", score);
    }, 1000);
};

function resetScore() {
    localStorage.setItem("passive", 0);
    localStorage.setItem("score", 0);
    location.reload();
}

function addPassive() {
    let passiveScore = parseInt(localStorage.getItem("passive")) || 0;
    passiveScore += 1;
    localStorage.setItem("passive", passiveScore);
    location.reload();
}

