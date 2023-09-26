let startTime;
let interval;
let timeLaps = []; 
let lapStartTime = 0; 

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapsButton = document.getElementById("laps");
const lapsList = document.getElementById("lapsList");

function formatTime(ms) {
  const date = new Date(ms);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const milliseconds = date.getUTCMilliseconds().toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime;
  display.innerHTML = formatTime(currentTime);
}

function updateLapDisplay() {
  const currentTime = Date.now() - lapStartTime;
  timeLaps.push(formatTime(currentTime)); 
  const lapTime = timeLaps[timeLaps.length - 1];
  lapsList.innerHTML += `<li class ="lapss">${lapTime}</li>`;
  lapStartTime = Date.now();
}

startStopButton.addEventListener("click", () => {
  if (!startTime) {
    startTime = Date.now();
    startStopButton.textContent = "Stop";
    interval = setInterval(updateDisplay, 10);
    lapStartTime = Date.now();
    lapsButton.textContent = "Lap";
  } else {
    clearInterval(interval);
    startStopButton.textContent = "Start";
    startTime = null;
  }
});

lapsButton.addEventListener("click", () => {
  if (startTime) {
    updateLapDisplay();
  }
});

resetButton.addEventListener("click", () => {
  clearInterval(interval);
  startStopButton.textContent = "Start";
  lapsButton.textContent = "Lap";
  display.innerHTML = formatTime(0);
  startTime = null;
  timeLaps = []; 
  lapsList.innerHTML = ""; 
});
