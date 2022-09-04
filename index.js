let startHours;
let startMinutes;
let startSeconds;
let timerId;
let totalSeconds;
let isPaused=false;

const title=document.getElementById('title');
const inputContainer=document.getElementById('inputContainer');
const timeContainer=document.getElementById('timeContainer');
const timeNow=document.getElementById('timeNow');
const hoursInput=document.getElementById('hoursInput');
const minutesInput=document.getElementById('minutesInput');
const hoursLeft=document.getElementById('hoursLeft');
const minutesLeft=document.getElementById('minutesLeft');
const secondsLeft=document.getElementById('secondsLeft');
const startButton=document.getElementById('startButton');
const pauseButton=document.getElementById('pauseButton');
const resetButton=document.getElementById('resetButton');

timeNow.className='hidden';
startButton.className='shown';
pauseButton.className='hidden';

// function to reset timer and all variables
function resetTimer(){
    clearInterval(timerId);
    isPaused=false;
    hoursInput.value='';
    minutesInput.value='';
    hoursLeft.innerHTML='00';
    minutesLeft.innerHTML='00';
    secondsLeft.innerHTML='00';
    title.innerHTML='Focus Timer';
    pauseButton.innerHTML='Pause';
    title.className='shown';
    timeNow.className='hidden';
    hoursInput.className='shown';
    minutesInput.className='shown';
    startButton.className='shown';
    pauseButton.className='hidden';
};

function finishMessage(){
    clearInterval(timerId);
    title.innerHTML='You did it! Take a break!';
    timeNow.className='hidden';
    hoursInput.className='hidden';
    minutesInput.className='hidden';
    startButton.className='hidden';
    pauseButton.className='hidden'; 
};

// function to set the time as double digits if necessary
function setDisplayTime(time,timeLeft){
    if(time<10){
        timeLeft.innerHTML='0'+time;
    }else{
        timeLeft.innerHTML=time;
    };
};

// function to create a new time interval and countdown by 1 second
// every second - resets seconds, minutes, and hours as time counts
// down
function countDown(){
    timerId=setInterval(()=>{
        hours = parseInt(totalSeconds/3600);
        minutes = parseInt((totalSeconds-hours*3600)/60);
        seconds = totalSeconds-hours*3600-minutes*60;
        setDisplayTime(hours,hoursLeft); 
        setDisplayTime(minutes,minutesLeft);
        setDisplayTime(seconds,secondsLeft);
        if(totalSeconds<0){
            finishMessage();
        };
        totalSeconds-=1;
    },1000);
};

startButton.addEventListener('click',function(){
    startHours=hoursInput.value;
    startMinutes=minutesInput.value;
    hoursInput.value='';
    minutesInput.value='';
    totalSeconds=(startHours*3600)+(startMinutes*60);
    title.innerHTML='You got this!';
    timeNow.className='shown';
    hoursInput.className='hidden';
    minutesInput.className='hidden';
    this.className='hidden';
    pauseButton.className='shown';
    countDown();
});

pauseButton.addEventListener('click',function(){
    if(isPaused){
        countDown();
        this.innerHTML='Pause';
        isPaused=false;
    }else{
        clearInterval(timerId);
        this.innerHTML='Resume';
        isPaused=true;
    };
})

resetButton.addEventListener('click',resetTimer);