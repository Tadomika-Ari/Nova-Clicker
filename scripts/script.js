window.onload = function () {
    let score = parseInt(localStorage.getItem("score")) || 0;
    let passiveScore = parseInt(localStorage.getItem("passive")) || 0;

    const TOMATO_FARM = 100;
    const TOMATO_FARM_ADD = 1;
    let tomatoFarmCost = parseInt(localStorage.getItem("tomatofarmcost")) || TOMATO_FARM;
    let nbTomatoFarm = parseInt(localStorage.getItem("nbtomatofarm")) || 0;
    const tomatoFarmDisplay = document.getElementById("tomatofarmdisplay");
    const tomatoFarmCostDisplay = document.getElementById("tomatofarmcostdisplay");

    const MOONROCK_FARM = 1000;
    const MOONROCK_FARM_ADD = 2;
    let moonRockFarmCost = parseInt(localStorage.getItem("moonrockfarmcost")) || MOONROCK_FARM;
    let nbMoonRockFarm = parseInt(localStorage.getItem("nbmoonrockfarm")) || 0;
    const moonRockFarmDisplay = document.getElementById("moonrockfarmdisplay");
    const moonRockFarmCostDisplay = document.getElementById("moonrockfarmcostdisplay");

    const marvin = document.getElementById("marvin");
    const scoreDisplay = document.getElementById("score");
    const toggle = document.getElementById("panelToggle");
    const panel = document.getElementById("sidePanel");
    let panelOpen = false;

    scoreDisplay.textContent = score;

    tomatoFarmDisplay.textContent = nbTomatoFarm;
    tomatoFarmCostDisplay.textContent = tomatoFarmCost;

    moonRockFarmDisplay.textContent = nbMoonRockFarm;
    moonRockFarmCostDisplay.textContent = moonRockFarmCost;

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
        localStorage.setItem("score", 0);
        localStorage.setItem("passive", 0);
        scoreDisplay.textContent = score;

        nbTomatoFarm = 0;
        tomatoFarmCost = TOMATO_FARM;
        localStorage.setItem("nbtomatofarm", 0);
        localStorage.setItem("tomatofarmcost", 0);
        tomatoFarmDisplay.textContent = nbTomatoFarm;
        tomatoFarmCostDisplay.textContent = tomatoFarmCost;

        nbMoonRockFarm = 0;
        moonRockFarmCost = MOONROCK_FARM;
        localStorage.setItem("nbmoonrockfarm", 0);
        localStorage.setItem("moonrockfarmcost", 0);
        moonRockFarmDisplay.textContent = nbMoonRockFarm;
        moonRockFarmCostDisplay.textContent = moonRockFarmCost;
    };

    window.addPassive = function () {
        passiveScore++;
        localStorage.setItem("passive", passiveScore);
    };

    window.addTomatoFarm = function () {
        if (0 <= score - tomatoFarmCost) {
            passiveScore++;
            score -= tomatoFarmCost;
            nbTomatoFarm += TOMATO_FARM_ADD;
            tomatoFarmCost += TOMATO_FARM;
            tomatoFarmDisplay.textContent = nbTomatoFarm;
            tomatoFarmCostDisplay.textContent = tomatoFarmCost;
            localStorage.setItem("passive", passiveScore);
            localStorage.setItem("score", score);
            localStorage.setItem("nbtomatofarm", nbTomatoFarm);
            localStorage.setItem("tomatofarmcost", tomatoFarmCost);
        }
    };

    window.addMoonRockFarm = function () {
        if (0 <= score - moonRockFarmCost) {
            passiveScore += MOONROCK_FARM_ADD;
            score -= moonRockFarmCost;
            nbMoonRockFarm++;
            moonRockFarmCost += MOONROCK_FARM;
            moonRockFarmDisplay.textContent = nbMoonRockFarm;
            moonRockFarmCostDisplay.textContent = moonRockFarmCost;
            localStorage.setItem("passive", passiveScore);
            localStorage.setItem("score", score);
            localStorage.setItem("nbmoonrockfarm", nbMoonRockFarm);
            localStorage.setItem("moonrockfarmcost", moonRockFarmCost);
        }
    };
};