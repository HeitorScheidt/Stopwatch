//INICIANDO AS VARIAVEIS
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;
let count = 1;
let datei;
let datef

//DOM BUTTON ELEMENTS
const startButton = document.getElementById("startButton")
const pauseButton = document.getElementById("pauseButton")
const resetButton = document.getElementById("resetButton")

//DOM DISPLAY ELEMENTS
const hour = document.getElementById("hours")
const minute = document.getElementById("minutes")
const second = document.getElementById("seconds")
const milli = document.getElementById("mili-seconds")

const stops = document.getElementById("stop")

//EVENT LISTENER
startButton.addEventListener("click", startFunc)
pauseButton.addEventListener("click", stopFunc)
resetButton.addEventListener("click", resetFunc)

//START TIMER
function startFunc(){
    interval = setInterval(() => {  //Define a Time Interval (10 milliseconds)

        milliseconds ++;

        if(milliseconds == 100){
            seconds++;
            milliseconds = 0;
        }

        if(seconds == 60){
            minutes++;
            seconds = 0;
        }

        if(minutes == 60){
            hours++;
            minutes = 0;
        }

        hour.textContent = textFormat(hours)
        minute.textContent = textFormat(minutes)
        second.textContent = textFormat(seconds)
        milli.textContent = textFormat(milliseconds)
        datei = getDate();
        
    }, 10)
}

function textFormat(time){
    return time < 10 ? `0${time}` : time
}

function stopFunc(){
    datef = getDate();
    getParcial();
    clearInterval(interval); //Clear the Stopwatch Interval
}

function resetFunc(){
    clearInterval(interval); //Clear the Stopwatch Interval
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    count = 1;

    //
    hour.textContent = textFormat(hours)
    minute.textContent = textFormat(minutes)
    second.textContent = textFormat(seconds)
    milli.textContent = textFormat(milliseconds)


    divList = document.getElementsByClassName("parcial")
    for(var j = divList.length-1; j>=0;j--){
        divList[j].remove()
    }
    
}

function getParcial(){
    let newDiv = document.createElement("div")  //Criate a new Div
    let newTr = document.createElement("tr")    //Criate a new Tr
    let newTh = document.createElement("th")    //Criate a new Th
    let icon = document.createElement("img")    //Criate a new Image

    newDiv.classList.add("parcial")             //Add a class ate the new Div
    newTh.classList.add("new")                  //Add a class ate the new Th, just for style

    icon.setAttribute("src", "delete-24.png")   //Add a src attribute at image

    /*REMOVE FUNCTION*/
    icon.onclick = function() {
        newTh.remove();
    }

    newTh.textContent = `Parcial ${count++}| ${datei} até  ${datef} | `;    //text in th
    
    /*Add the dinamics HTML tags at screen*/
    newTh.appendChild(icon);
    newTr.appendChild(newTh);
    newDiv.appendChild(newTr);
    stops.appendChild(newDiv);
}

function dayPorcentage(){
    let totalSecondsInADay = 24 * 60 * 60   //Total seconds in a day
    let totalMinutesAtTimer = hours * 60    //Total minutes at Stopwatch
    let totalSecondsAtTimer  = (minutes * 60) + (totalMinutesAtTimer * 60) + seconds   //Total seconds at Stopwatch
    return (totalSecondsAtTimer/totalSecondsInADay) *100    //day porcentage
}

function getDate(){
    var currentDate = new Date()
    let dateToString = currentDate.toLocaleString() 
    return dateToString
}