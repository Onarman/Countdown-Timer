let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button")

const timer = (seconds) => {
	clearInterval(countdown)
	const now =  Date.now();
	const then = now + seconds * 1000;
	console.log({now,then});
	displayTimeLeft(seconds)
	displayEndTime(then);

	countdown = setInterval(()=>{
		const secondsLeft = Math.round((then - Date.now())/1000);
		if(secondsLeft < 0){
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

buttons.forEach(button => button.addEventListener("click",startTimer))
document.customForm.addEventListener("submit",function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	console.log(mins);
	timer(mins*60);
	this.reset()
})