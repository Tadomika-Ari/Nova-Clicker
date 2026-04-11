window.onload = function () {
    let score = parseInt(localStorage.getItem("score")) || 0;
    let passiveScore = parseInt(localStorage.getItem("passive")) || 0;

    const marvin = document.getElementById("marvin");
    const scoreDisplay = document.getElementById("score");
    const toggle = document.getElementById("panelToggle");
    const panel = document.getElementById("sidePanel");
    let panelOpen = false;

    scoreDisplay.textContent = score;

    marvin.addEventListener("click", () => {
        score++;
        scoreDisplay.textContent = score;
        localStorage.setItem("score", score);
    });

    setInterval(() => {
        score += passiveScore;
        scoreDisplay.textContent = score;
        localStorage.setItem("score", score);
    }, 1000);

    toggle.addEventListener("click", () => {
        panelOpen = !panelOpen;
        panel.classList.toggle("open", panelOpen);
        toggle.textContent = panelOpen ? "❯" : "❮";
        toggle.style.right = panelOpen ? "260px" : "0";
});

    window.resetScore = function () {
        score = 0;
        passiveScore = 0;
        localStorage.setItem("score", 0);
        localStorage.setItem("passive", 0);
        scoreDisplay.textContent = 0;
    };

    window.addPassive = function () {
        passiveScore++;
        localStorage.setItem("passive", passiveScore);
    };
};