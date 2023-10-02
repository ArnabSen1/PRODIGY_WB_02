let startTime;
let interval;
let running = false;
const lapTimes = [];
const lapList = document.getElementById("lapList");

function startStop() {
    if (running) {
        clearInterval(interval);
        document.getElementById("startStop").textContent = "Start";
    } else {
        startTime = Date.now() - (lapTimes.reduce((acc, time) => acc + time, 0) || 0);
        interval = setInterval(updateTime, 10);
        document.getElementById("startStop").textContent = "Stop";
    }
    running = !running;
}

function lap() {
    if (running) {
        const lapTime = Date.now() - startTime;
        lapTimes.push(lapTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = formatTime(lapTime);
        lapList.appendChild(lapItem);
    }
}

function reset() {
    clearInterval(interval);
    startTime = null;
    running = false;
    lapTimes.length = 0;
    lapList.innerHTML = "";
    document.getElementById("stopwatch").textContent = "0:00:00";
    document.getElementById("startStop").textContent = "Start";
}

function updateTime() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    document.getElementById("stopwatch").textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
     const milliseconds = Math.floor(time % 1000);
    return `${hours}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, "0");
}

function padMilliseconds(num) {
    return num.toString().padStart(3, "0");
}
