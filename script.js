let xp = Number(localStorage.getItem("xp")) || 0;
let sessions = Number(localStorage.getItem("sessions")) || 0;
let streak = Number(localStorage.getItem("streak")) || 1;

document.getElementById("xp").innerText = xp;
document.getElementById("sessions").innerText = sessions;
document.getElementById("streak").innerText = streak;

const rewards = [
    "🍫 Grab a snack",
    "🎵 Listen to one song",
    "🎮 10 mins gaming",
    "😂 Watch a meme",
    "☕ Make coffee",
    "📱 10 mins social media"
];

document
.getElementById("startTimer")
.addEventListener("click", startTimer);

function startTimer() {

    let minutes = parseInt(
        document.getElementById("timerSelect").value
    );

    let totalSeconds = minutes * 60;

    const display =
        document.getElementById("timerDisplay");

    const timer = setInterval(() => {

        let mins = Math.floor(totalSeconds / 60);
        let secs = totalSeconds % 60;

        display.innerText =
            `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

        totalSeconds--;

        if(totalSeconds < 0){

            clearInterval(timer);

            xp += 50;
            sessions += 1;

            localStorage.setItem("xp", xp);
            localStorage.setItem("sessions", sessions);

            document.getElementById("xp").innerText = xp;
            document.getElementById("sessions").innerText = sessions;

            unlockReward();
            updateBadges();

            alert("🎉 Focus Session Complete!");
        }

    },1000);
}

function unlockReward(){

    const reward =
        rewards[Math.floor(Math.random()*rewards.length)];

    document.getElementById("rewardBox")
        .innerText = reward;
}

function updateBadges(){

    let html = "";

    if(xp >= 100)
        html += `<span class="badge">🥉 Beginner Scholar</span>`;

    if(xp >= 250)
        html += `<span class="badge">🥈 Consistency Master</span>`;

    if(xp >= 500)
        html += `<span class="badge">🥇 Academic Warrior</span>`;

    document.getElementById("badgeArea")
        .innerHTML = html;
}

updateBadges();

function showTab(tab){

    document
    .getElementById("primer")
    .classList.add("hidden");

    document
    .getElementById("deepdive")
    .classList.add("hidden");

    document
    .getElementById(tab)
    .classList.remove("hidden");
}

document
.getElementById("saveNotes")
.addEventListener("click", () => {

    const notes =
        document.getElementById("dailyNotes").value;

    localStorage.setItem("notes", notes);

    alert("Saved!");
});

document.getElementById("dailyNotes").value =
    localStorage.getItem("notes") || "";