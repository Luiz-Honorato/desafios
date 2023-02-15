let init = document.getElementById('mostrador');
let contar1 = document.getElementById('c1');
let contar2 = document.getElementById('c2');
let contar3 = document.getElementById('c3');
let contar4 = document.getElementById('c4');
let contar5 = document.getElementById('c5');
let contar6 = document.getElementById('c6');

let ngerado = document.getElementById('gerado');

let contador = 0;
init.innerHTML = contador;

contar1.addEventListener("click", function() {
    contador += 1;
    init.innerHTML = contador;
})

contar2.addEventListener("click", function() {
    contador -= 1;
    init.innerHTML = contador;
})
contar3.addEventListener("click", function() {
    contador += 10;
    init.innerHTML = contador;
})
contar4.addEventListener("click", function() {
    contador -= 10;
    init.innerHTML = contador;
})
contar5.addEventListener("click", function() {
    contador += 100;
    init.innerHTML = contador;
})
contar6.addEventListener("click", function() {
    contador -= 100;
    init.innerHTML = contador;
})

function gerar() {
    ngerado.innerHTML = Math.floor(Math.random() * contador);
}
