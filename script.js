const softRoasts = [
    "You don’t need Google… you need common sense updates.",
    "You’re not useless… you’re just in power saving mode.",
    "You remind me of math… I don’t like you, don’t understand you.",
    "You don’t trip… you do random gravity checks.",
    "Your brain works… just on airplane mode."
];

const savageRoasts = [
    "If laziness were a sport, you'd still come second.",
    "You don't have stupid ideas… just unlimited supply.",
    "You're not slow… just buffering since birth.",
    "You don't need a GPS… you’re already lost.",
    "Your confidence is impressive for someone with zero evidence."
];

let currentRoast = "";
let roastCount = localStorage.getItem("roastCount") || 0;
document.getElementById("counter").innerText = roastCount;

function generateRoast() {
    const name = document.getElementById("nameInput").value || "You";
    const mode = document.querySelector('input[name="mode"]:checked').value;

    const list = mode === "soft" ? softRoasts : savageRoasts;
    const random = list[Math.floor(Math.random() * list.length)];

    currentRoast = name + ", " + random;

    document.getElementById("resultBox").innerText = currentRoast;

    roastCount++;
    localStorage.setItem("roastCount", roastCount);
    document.getElementById("counter").innerText = roastCount;

    addToHistory(currentRoast);
}

function saveRoast() {
    if (!currentRoast) return;
    localStorage.setItem("bestRoast", currentRoast);
    alert("Saved as Best Roast!");
}

function copyRoast() {
    if (!currentRoast) return;
    navigator.clipboard.writeText(currentRoast);
    alert("Copied to clipboard!");
}

function shareRoast() {
    if (!currentRoast) return;

    if (navigator.share) {
        navigator.share({
            title: "My Roast",
            text: currentRoast
        });
    } else {
        alert("Sharing not supported on this browser.");
    }
}

function addToHistory(text) {
    const box = document.getElementById("historyBox");
    const div = document.createElement("div");
    div.innerText = text;
    box.prepend(div);
}

