window.onload = function () {
    let score = parseInt(localStorage.getItem("score")) || 0;
    const scoreDisplay = document.getElementById("score");
    let passiveScore = parseInt(localStorage.getItem("passive")) || 0;
    const passiveDisplay = document.getElementById("passive");
    const SCORE_PER_CLICK = 1;
    let scorePerClick = parseInt(localStorage.getItem("scoreperclick")) || SCORE_PER_CLICK;
    const scorePerClickDisplay = document.getElementById("scoreperclick");

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

    const CLICK_POWER = 5000;
    const CLICK_POWER_ADD = 1;
    let clickPowerCost = parseInt(localStorage.getItem("clickpowercost")) || CLICK_POWER;
    let nbClickPower = parseInt(localStorage.getItem("nbclickpower")) || 0;
    const clickPowerDisplay = document.getElementById("clickpowerdisplay");
    const clickPowerCostDisplay = document.getElementById("clickpowercostdisplay");

    const marvin = document.getElementById("marvin");
    const toggle = document.getElementById("panelToggle");
    const panel = document.getElementById("sidePanel");
    let panelOpen = false;

    scoreDisplay.textContent = score;
    passiveDisplay.textContent = passiveScore;
    scorePerClickDisplay.textContent = scorePerClick;

    tomatoFarmDisplay.textContent = nbTomatoFarm;
    tomatoFarmCostDisplay.textContent = tomatoFarmCost;

    moonRockFarmDisplay.textContent = nbMoonRockFarm;
    moonRockFarmCostDisplay.textContent = moonRockFarmCost;

    clickPowerDisplay.textContent = nbClickPower;
    clickPowerCostDisplay.textContent = clickPowerCost;

    marvin.addEventListener("click", () => {
        score += scorePerClick;
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
        scorePerClick = SCORE_PER_CLICK;
        localStorage.setItem("score", 0);
        localStorage.setItem("passive", 0);
        localStorage.setItem("scoreperclick", 0);
        scoreDisplay.textContent = score;
        passiveDisplay.textContent = passiveScore;
        scorePerClickDisplay.textContent = scorePerClick;

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

        nbClickPower = 0;
        clickPowerCost = CLICK_POWER;
        localStorage.setItem("nbclickpower", 0);
        localStorage.setItem("clickpowercost", 0);
        clickPowerDisplay.textContent = nbClickPower;
        clickPowerCostDisplay.textContent = clickPowerCost;
    };

    window.addPassive = function () {
        passiveScore++;
        localStorage.setItem("passive", passiveScore);
    };

    window.addTomatoFarm = function () {
        if (0 <= score - tomatoFarmCost) {
            passiveScore++;
            passiveDisplay.textContent = passiveScore;
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
            passiveDisplay.textContent = passiveScore;
            moonRockFarmCost += MOONROCK_FARM;
            moonRockFarmDisplay.textContent = nbMoonRockFarm;
            moonRockFarmCostDisplay.textContent = moonRockFarmCost;
            localStorage.setItem("passive", passiveScore);
            localStorage.setItem("score", score);
            localStorage.setItem("nbmoonrockfarm", nbMoonRockFarm);
            localStorage.setItem("moonrockfarmcost", moonRockFarmCost);
        }
    };

    window.addClickPower = function () {
        if (0 <= score - clickPowerCost) {
            scorePerClick += CLICK_POWER_ADD;
            score -= clickPowerCost;
            nbClickPower++;
            scorePerClickDisplay.textContent = scorePerClick;
            clickPowerCost += CLICK_POWER;
            clickPowerDisplay.textContent = nbClickPower;
            clickPowerCostDisplay.textContent = clickPowerCost;
            localStorage.setItem("scoreperclick", scorePerClick);
            localStorage.setItem("score", score);
            localStorage.setItem("nbclickpower", nbClickPower);
            localStorage.setItem("clickpowercost", clickPowerCost);
        }
    };
};