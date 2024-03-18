const canvas = document.getElementById("lienzo")
const contexto = canvas.getContext("2d")
const btnPause = document.getElementById("pause")
const btnReset = document.getElementById("reset")

const x = canvas.width / 2 // Posicion en x del circulo
const y = canvas.height / 2 // Posicion en y del circulo
const radio = canvas.width / 2
let s = 0
let m = 0
let h = 0

document.addEventListener("DOMContentLoaded", event => {
    function actualizarFechaHora() {
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let año = fecha.getFullYear();

        let horas = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        if(horas > 12){
            horas -= 12
        }

        segundos < 10 ? segundos = "0" + segundos : segundos
        minutos < 10 ? minutos = "0" + minutos : minutos
        horas < 10 ? horas = "0" + horas : horas

        document.getElementById('fechaActual').innerHTML = `${dia}/${mes}/${año}`;
        document.getElementById('horaActual').innerHTML = `${horas}:${minutos}:${segundos}`;
    }

    setInterval(actualizarFechaHora, 1000);
});

pintarReloj()

let paused = true
let intervalo
btnPause.addEventListener("click" , event =>{
    if(paused){
        btnPause.style.height = "80px"
        paused = false
        intervalo = setInterval(function(){
            s++
            pintarReloj()
            actualizarReloj()

            if(s >= 6000){
                s = 0
                m++
            }

            if(m >= 60){
                m = 0
                h++
            }

        }, 10)
    }
    else{
        btnPause.style.height = "100px"
        paused = true
        clearInterval(intervalo)
    }
})

function actualizarReloj(){
    let segundos = Math.trunc(s/100)

    segundos < 10 ? document.getElementById("seconds").textContent = ("0" + Math.trunc(segundos)) : document.getElementById("seconds").textContent = Math.trunc(s/100)

    m < 10 ? document.getElementById("minutes").textContent = ("0" + m) : document.getElementById("minutes").textContent = m

    h < 10 ? document.getElementById("hours").textContent = ("0" + h) : document.getElementById("hours").textContent = h
    
}

btnReset.addEventListener("click" , event =>{
    s = 0
    m = 0
    h = 0
    pintarReloj()
    clearInterval(intervalo)
    paused = true
    setTimeout(function() {
        btnReset.style.height = "50px"; 
        btnReset.style.left = "109px"
        btnReset.style.bottom = "681px"
    
        setTimeout(function() {
            btnReset.style.height = "80px"; 
            btnReset.style.left = "100px"
            btnReset.style.bottom = "678px"
        }, 300); 
    }, 0);

    document.getElementById("seconds").textContent = "00"
    document.getElementById("minutes").textContent = "00"
    document.getElementById("hours").textContent = "00"

})

function pintarReloj(){
    pintarFondo()
    pintarCirculo()
    pintarLineas()
    pintarNumeros()
    calcularSegundos(s)
}


function pintarFondo(){
    contexto.beginPath()
    contexto.arc(x, y, radio, 0, 2 * Math.PI)
    contexto.fillStyle = '#FBF5F3'
    contexto.fill();
    contexto.closePath();
}
function pintarCirculo(){
    contexto.beginPath()
    contexto.arc(x, y, radio, 0, 2 * Math.PI) /*arc(posixion x, posicion y, radio, angulo inicio, angulo final) */
    contexto.strokeStyle = 'gray'
    contexto.lineWidth = 3
    contexto.stroke()
    contexto.closePath();
}


function pintarLineas(){
    let cantidadLineas = 60
    for (let i = 0; i < cantidadLineas; i++) {
        let x_final
        let y_final
        let distanciaFinal // Distancia final desde el centro del círculo

        let separacionLineas = 2 * Math.PI / cantidadLineas //se divide la circunferencia en entre 60 en partes iguales
        let angulo = i * separacionLineas
        let xInicial = x + radio * Math.cos(angulo) // borde del círculo
        let yInicial = y + radio * Math.sin(angulo) // borde del círculo

        if (i % 5 === 0) {
            distanciaFinal = 20;
            x_final = x + (radio - distanciaFinal) * Math.cos(angulo)
            y_final = y + (radio - distanciaFinal) * Math.sin(angulo)
        }
        else {
            distanciaFinal = 10;
            x_final = x + (radio - distanciaFinal) * Math.cos(angulo) // Coordenada x final
            y_final = y + (radio - distanciaFinal) * Math.sin(angulo) // Coordenada y final
        }

        contexto.beginPath()
        contexto.moveTo(xInicial, yInicial) // Mover al borde del círculo
        contexto.lineTo(x_final, y_final) // Línea hacia el centro, deteniéndose antes de llegar
        contexto.strokeStyle = 'gray' // Color de las líneas
        contexto.stroke()
        contexto.closePath();
    }
}

function pintarNumeros(){
    contexto.textAlign = "center"
    contexto.textBaseline = "middle"
    for(let i = 0; i < 60; i++){
        contexto.fillStyle = "black";
        contexto.font = "30px Arial";
        if(i % 5 === 0){
            contexto.fillText(i.toString(), radio + (radio - 20) * 0.9 * Math.sin(i * 2 * Math.PI / 60), radio - ((radio - 20) * 0.9 * Math.cos(i * 2 * Math.PI / 60)));
        }
    }

}

function calcularSegundos(s) {
    contexto.beginPath()
    contexto.arc(x, y, 10, 0, 2 * Math.PI)
    contexto.fillStyle = 'black'
    contexto.fill();
    contexto.closePath();

    let angS = (s * 2 * Math.PI / 60)/100;
    contexto.strokeStyle = "black";
    contexto.moveTo(radio, radio)
    contexto.lineTo(radio + radio * 0.9 * Math.sin(angS), radio - (radio * 0.9 * Math.cos(angS)))
    contexto.lineWidth = 2
    contexto.stroke()
}




