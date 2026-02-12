let scores = JSON.parse(localStorage.getItem("battleScores")) || {};
let soundEnabled = true;
const roastSound = new Audio("https://www.soundjay.com/button/sounds/button-16.mp3");

/* AI Roast Generator (Dynamic Logic) */
function generateSmartRoast(name, level) {
    let traits = [
        "brain loading at 2G speed",
        "professional overthinker",
        "future world record holder in procrastination",
        "WiFi signal personality",
        "energy saving mode human"
    ];

    let endings = [
        "but still somehow confident.",
        "and proud of it.",
        "since version 1.0.",
        "with unlimited updates pending.",
        "and no patch available."
    ];

    let trait = traits[Math.floor(Math.random() * traits.length)];
    let ending = endings[Math.floor(Math.random() * endings.length)];

    let spice = "";
    if (level >= 4) spice = " Even autocorrect avoids you.";
    if (level == 5) spice = " Scientists are still studying this phenomenon.";

    return `${name}, you are a ${trait} ${ending}${spice}`;
}

function aiRoast() {
    const name = document.getElementById("singleName").value || "You";
    const level = document.getElementById("intensity").value;
    const roast = generateSmartRoast(name, level);

    document.getElementById("aiResult").innerText = roast;

    if (soundEnabled) roastSound.play();
}

/* Multiplayer Battle Mode */
function battle() {
    const p1 = document.getElementById("player1").value || "Player1";
    const p2 = document.getElementById("player2").value || "Player2";

    const roast1 = generateSmartRoast(p1, 3);
    const roast2 = generateSmartRoast(p2, 3);

    const score1 = Math.floor(Math.random() * 100);
    const score2 = Math.floor(Math.random() * 100);

    if (!scores[p1]) scores[p1] = 0;
    if (!scores[p2]) scores[p2] = 0;

    let winner;
    if (score1 > score2) {
        scores[p1]++;
        winner = p1 + " wins!";
    } else if (score2 > score1) {
        scores[p2]++;
        winner = p2 + " wins!";
    } else {
        winner = "It's a tie!";
    }

    localStorage.setItem("battleScores", JSON.stringify(scores));

    document.getElementById("battleResult").innerHTML =
        `<b>${p1}:</b> ${roast1} (Score: ${score1})<br><br>
         <b>${p2}:</b> ${roast2} (Score: ${score2})<br><br>
         <h3>${winner}</h3>`;

    updateScoreboard();

    if (soundEnabled) roastSound.play();
}

function updateScoreboard() {
    let board = "<h4>🏆 Leaderboard</h4>";
    Object.entries(scores)
        .sort((a, b) => b[1] - a[1])
        .forEach(([name, score]) => {
            board += `${name} — ${score} wins<br>`;
        });

    document.getElementById("scoreboard").innerHTML = board;
}

function toggleSound() {
    soundEnabled = !soundEnabled;
}

updateScoreboard();