let pontos = 0;
let vidas = 3;

let nummax = 10;
let nummin = 0;
let adcao = 0;
let sub = 1;
let mult = 2;
let divi = 3;

let x = 0;

let usuario = "";
while(usuario = "") {
    usuario=prompt('Digite seu nome para continuar')
}

while (vidas > 0) {
    let n1 = Math.floor(Math.random() * (nummax - nummin) + nummin);
    let n2 = Math.floor(Math.random() * (nummax - nummin) + nummin);
    let posicao = Math.floor(Math.random() * (3))
    let operacao = Math.floor(Math.random() * (4));

    let sinal = "";
    let result = 0;

    if (operacao == 0) {
        if (posicao == 0) {
            x == n1 + n2;
        } else if (posicao == 1) {
            x + n1 == n2
        } else if (posicao == 3) {
            x + n2 == n1
        }
        sinal = "+"
        result = n1 + n2;
    } else if (operacao == 1){
        if (n1 < n2) {
            let auxilia = n1;
            n1 = n2;
            n2 = auxilia;
        }
        if (posicao == 0) {
            n1 - n2 == x
        } else if (posicao == 1) {
            x - n1 == n2
        } else if (posicao == 2) {
            x - n2 == n1
        }

        sinal = "-"
        result = n1 - n2;
    } else if (operacao == 2) {
        if (posicao == 0) {
            n1 * n2 == x
        } else if (posicao == 1) {
            x * n1 == n2
        } else if (posicao == 2) {
            x * n2 == n1
        }
        sinal = "*"
        result = n1 * n2;
    } else if (operacao == 3) {
        while (n1 % n2 != 0) {
            n1 = Math.floor(Math.random() * (nummax - nummin) + nummin);
            n2 = Math.floor(Math.random() * (nummax - nummin) + nummin);
        }
        if (posicao == 0) {
            n1 / n2 == x
        } else if (posicao == 1) {
            x / n1 == n2
        } else if (posicao == 2) {
            x / n2 == n1
        }
        sinal = "/"
        result = n1 / n2;
    }

    if (posicao == 0) {
        r = prompt(`Quanto é ${n1} ${sinal} ${n2} = x ?`)
    } else if(posicao == 1) {
        r = prompt(`Quanto é  x ${sinal} ${n1} = ${n2} ?`)
    } else if (posicao == 2) {
        r = prompt(`Quanto é x ${sinal} ${n2} = ${n1}?`)
    }

    if (r == result) {
        pontos += 5;
    } else {
        vidas -= 1;
        alert(`Vidas ${vidas}`)
    }

    if (vidas == 0) {
        let recomeçar = "R";
        if (prompt(`GAME OVER!\n PONTOS: ${pontos} Digite "R" para recomeçar ou tecle "s" para sair.`) && recomeçar == "R"){
            vidas = 3;
            pontos = 0;
        }
    }


}