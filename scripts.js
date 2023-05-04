let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button")
const alertSound = new Audio('./sound/alarm.mp3');
const stopButton = document.querySelector(".stop-button")

const timer = (seconds) => {
	clearInterval(countdown)
	const now =  Date.now();
	const then = now + seconds * 1000;
	console.log({now,then});
	displayTimeLeft(seconds)
	displayEndTime(then);

	countdown = setInterval(()=>{
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if(secondsLeft < 0){
			// Show the stop button when the alarm goes off
			stopButton.style.display = "block";
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft)
	},1000)
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds /60);
	const reminderSeconds = seconds % 60;
	// console.log({minutes,reminderSeconds});
	const display = `${minutes}:${reminderSeconds < 10 ? "0" : ""}${reminderSeconds}`
	timerDisplay.textContent = display;
	
	if (seconds === 0) {
		alertSound.play()
	}
}

const displayEndTime =(timestamp) =>{
	const end = new Date(timestamp);
	const hour = end.getHours();
	const adjustedHour = hour > 12 ? hour - 12 : hour;
	const minutes = end.getMinutes();
	endTime.textContent = `The Timer is Going to Finish At ${adjustedHour}:${minutes < 10 ? "0" : ""}${minutes}`;
	
}

function startTimer (){
	const seconds = parseInt(this.dataset.time)
	timer(seconds)
}

function stopAlarm(){
	clearInterval(countdown)
	alertSound.pause();
	alertSound.currentTime = 0;
	stopButton.style.display= "none";
	timerDisplay.textContent = "";
	endTime.textContent = ""

	timerDisplay.textContent = 'Time is up!';
  setTimeout(() => {
    timerDisplay.textContent = '';
  }, 3000);
}

stopButton.addEventListener("click", stopAlarm)
buttons.forEach(button => button.addEventListener("click",startTimer))
document.customForm.addEventListener("submit",function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins*60);
	this.reset()
})
