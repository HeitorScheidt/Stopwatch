//INICIANDO AS VARIAVEIS
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let count = 1;
let datei;
let datef
var startTime; //controle o tempo de inicio
let interval; //intervalo para controle
var elapsedPausedTime = 0; //tempo decorrido durante a pausa
var parcial = []
var elapsedTime
var c = 0;

let inputStartDate;
let inputEndDate;

let dinamicDiv;
let deleteIcon, editIcon, cancelIcon, saveIcon;

//INICIA O CRONOMETRO
function startFunc(){

    if(!interval){
        datei = new Date()
        parcial.push(datei)
        startTime = datei.getTime() - elapsedPausedTime
        interval = setInterval(updateFunc, 1)
    }
}

//PAUSA O CRONOMETRO
function stopFunc(){
    clearInterval(interval); //Clear the Stopwatch Interval
    datef = new Date()
    elapsedPausedTime = datef.getTime() - startTime
    parcial.push(datef)
    interval = null
    getParcial()
}

//RESETA O CRONOMETRO
function resetFunc(){

    stopFunc();
    elapsedPausedTime = 0;

    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    count = 1;

    hour.textContent = textFormat(hours)
    minute.textContent = textFormat(minutes)
    second.textContent = textFormat(seconds)
    milli.textContent = textFormat(milliseconds)


    divList = document.getElementsByClassName("parcial")
    for(var j = divList.length-1; j>=0;j--){
        divList[j].remove()
    }
    
}

//FAZ O UPDATE DOS VALORES DO CRONOMETRO
function updateFunc(){
    var currentTime = new Date().getTime()
    elapsedTime = currentTime - startTime
    seconds = ((elapsedTime / 1000) |0) % 60
    minutes = ((elapsedTime / 1000 / 60) |0) % 60
    hours = (elapsedTime / 1000 / 60 / 60) | 0
    milliseconds = elapsedTime % 1000; 

    hour.textContent = textFormat(hours)
    minute.textContent = textFormat(minutes)
    second.textContent = textFormat(seconds)
    milli.textContent = textFormat(milliseconds)
}

/********** AÇÕES DOS BOTÕES ************/

//DELETA A PARCIAL
function removeFunc(event){
    const divElement = event.target.closest('div');
    if(divElement)
    divElement.remove();
}

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


function textFormat(time){
    return time < 10 ? `0${time}` : time
}


function formatDateTime(date) {
  let formattedDateTime =  (new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()).slice(0, -5);
    
  //alert(formattedDateTime)
  return formattedDateTime;
}
  



function getParcial() {
  // Criar a nova Div
  dinamicDiv = document.createElement("div");
  dinamicDiv.classList.add("parcial")
  dinamicDiv.id = count++
  divId = dinamicDiv.id

  // BOTAO DELETAR
  const deleteButton = document.createElement("button");
  deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", "delete-24.png");
  deleteButton.appendChild(deleteIcon);
  deleteButton.addEventListener("click",removeFunc);

  //BOTAO EDITAR
  const editButton = document.createElement("button");
  editIcon = document.createElement("img");
  editIcon.setAttribute("src", "ferramenta-lapis.png");
  editButton.appendChild(editIcon);
  editButton.addEventListener("click", editFunc);

  //BOTAO CANCELAR
  const cancelButton = document.createElement("button");
  cancelIcon = document.createElement("img");
  cancelIcon.setAttribute("src", "cancelar.png");
  cancelButton.appendChild(cancelIcon);
  cancelButton.addEventListener("click", cancelFunc);
  

  //BOTÃO SALVAR
  const saveButton = document.createElement("button");
  saveIcon = document.createElement("img");
  saveIcon.setAttribute("src", "marca-de-verificacao.png");
  saveButton.appendChild(saveIcon);
  saveButton.addEventListener("click", saveFunc);



  // Criar os inputs
  inputStartDate = document.createElement("input");
  inputEndDate = document.createElement("input");

  inputStartDate.type = "datetime-local";
  inputStartDate.value = formatDateTime(datei)

  inputEndDate.type = "datetime-local";
  inputEndDate.value = formatDateTime(datef)

  //readOnlyFunc(true)

  dinamicDiv.append(`Parcial ${divId} | `, inputStartDate, " até ", inputEndDate, "| ",deleteButton ," ",editButton," ",cancelButton," ",saveButton)
  stops.appendChild(dinamicDiv);
    

}

function editFunc(event){
    const divElement = event.target.closest('div');
    const inputss = divElement.querySelectorAll("input")

    for(let i = 0; i < inputss.length; i++){
        inputss[i].readOnly = false
        inputss[i].disabled = false
        changeStyle(inputss[i], "white", "black")

    }

}


function changeStyle(input, background, color){

    input.style.backgroundColor = background
    input.style.color = color
}

function cancelFunc(event){
    const divElement = event.target.closest('div');
    const inputss = divElement.querySelectorAll("input")

    const dataFinal = parcial.pop();
    const dataInical = parcial.pop();

    console.log(dataInical)
    console.log(dataFinal)

    for(let i = 0; i < inputss.length; i++){

        if(i===0){
            inputss[i].value = formatDateTime(dataInical)
        }
        if(i===1){
            inputss[i].value = formatDateTime(dataFinal)
        }

        inputss[i].readOnly = false
        inputss[i].disabled = false

        changeStyle(inputss[i], "transparent", "white")
    }
}

function saveFunc(event){
    let currentdate = new Date();
    let current = formatDateTime(currentdate)

    const dateUm = inputStartDate.value;
    const dateDois = inputEndDate.value;

    c = datef - datei 
    seconds = ((c / 1000) |0) % 60
    minutes = ((c / 1000 / 60) |0) % 60
    hours = (c / 1000 / 60 / 60) | 0
    milliseconds = c % 1000; 

    hour.textContent = textFormat(hours)
    minute.textContent = textFormat(minutes)
    second.textContent = textFormat(seconds)
    milli.textContent = textFormat(milliseconds)

    console.log(c)


    if (dateUm > current || dateDois > current) {
        alert("ERRO: As datas não podem ser no futuro");
    } else {
        const divElement = event.target.closest('div');
        const inputss = divElement.querySelectorAll("input")

        for(let i = 0; i < inputss.length; i++){
            inputss[i].readOnly = false
            inputss[i].disabled = false

            changeStyle(inputss[i], "transparent", "white")
        }
    }
}


function dayPorcentage(){
    let totalSecondsInADay = 24 * 60 * 60   //Total seconds in a day
    let totalMinutesAtTimer = hours * 60    //Total minutes at Stopwatch
    let totalSecondsAtTimer  = (minutes * 60) + (totalMinutesAtTimer * 60) + seconds   //Total seconds at Stopwatch
    return (totalSecondsAtTimer/totalSecondsInADay) *100    //day porcentage
}

