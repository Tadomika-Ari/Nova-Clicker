window.onload = function () {
    let score = parseInt(localStorage.getItem("score")) || 0;
    let passiveScore = parseInt(localStorage.getItem("passive")) || 0;

    const TOMATO_FARM = 100;

    let tomatoFarmCost = parseInt(localStorage.getItem("tomatofarmcost")) || TOMATO_FARM;
    let nbTomatoFarm = parseInt(localStorage.getItem("nbtomatofarm")) || 0;
    const tomatoFarmDisplay = document.getElementById("tomatofarmdisplay");
    const tomatoFarmCostDisplay = document.getElementById("tomatofarmcostdisplay");

   
    const marvin = document.getElementById("marvin");
    const scoreDisplay = document.getElementById("score");
    const toggle = document.getElementById("panelToggle");
    const panel = document.getElementById("sidePanel");
    let panelOpen = false;

    scoreDisplay.textContent = score;
    tomatoFarmDisplay.textContent = nbTomatoFarm;
    tomatoFarmCostDisplay.textContent = tomatoFarmCost;

    marvin.addEventListener("click", () => {
        score += 100;
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
        nbTomatoFarm = 0;
        tomatoFarmCost = TOMATO_FARM;
        localStorage.setItem("score", 0);
        localStorage.setItem("passive", 0);
        localStorage.setItem("nbtomatofarm", 0);
        localStorage.setItem("tomatofarmcost", 0);
        scoreDisplay.textContent = score;
        tomatoFarmDisplay.textContent = nbTomatoFarm;
        tomatoFarmCostDisplay.textContent = tomatoFarmCost;
    };

    window.addPassive = function () {
        passiveScore++;
        localStorage.setItem("passive", passiveScore);
    };

    window.addTomatoFarm = function () {
        if (0 <= score - tomatoFarmCost) {
            passiveScore++;
            score -= tomatoFarmCost;
            nbTomatoFarm++;
            tomatoFarmCost += TOMATO_FARM;
            tomatoFarmDisplay.textContent = nbTomatoFarm;
            tomatoFarmCostDisplay.textContent = tomatoFarmCost;
            localStorage.setItem("passive", passiveScore);
            localStorage.setItem("score", score);
            localStorage.setItem("nbtomatofarm", nbTomatoFarm);
            localStorage.setItem("tomatofarmcost", tomatoFarmCost);
        }
    };
};