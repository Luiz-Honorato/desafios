class Jogomatematico {
    num1 = null;
    num2 = null;
    Noperacao = 0;
    Xposicao = null;
    minimo = 0;
    maximo = 10;
    resultado = null;
    resultdigitado = null;
    resultadoequacao = null;
    score = 0;
    life = 3;
    

    constructor () {
        this.jogo()
    }

    gerarnumero() {
        this.num1 = Math.floor(Math.random() * (this.maximo - this.minimo) + this.minimo)
        this.num2 = Math.floor(Math.random() * (this.maximo - this.minimo) + this.minimo) 
        this.Noperacao = Math.floor(Math.random() * (4)) 
        this.Xposicao = Math.floor(Math.random() * (3)) 
    }
    jogo () {
        this.gerarnumero()
        switch (this.Noperacao) {
            case 0:
                this.soma();
                break
            case 1:
                this.subtracao();
                break
            case 2:
                this.multiplicar();
                break
            case 3 : 
                this.divisao();
                break
        }
        this.checarresultado()
    }
    // posicao da equacao
    position (sinal) {
        let equacao = "";
        switch (this.Xposicao) {
            case 0:
                equacao = `X ${sinal} ${this.num2} = ${this.resultadoequacao}`;
                this.resultado = this.num1;
                break;
            case 1:
                equacao = `${this.num1} ${sinal} X = ${this.resultadoequacao}`;
                this.resultado = this.num2;
                break;
            case 2:
                equacao = `${this.num1} ${sinal} ${this.num2} = X`;
                this.resultado = this.resultadoequacao;
                break;
        }
        return equacao;
    }
    checarresultado () {
        if (this.resultdigitado == this.resultado) {
            this.adcionarpontos()
            this.jogo();
           
        } else {
            this.gameover()
            if (this.life > 0) {
                this.jogo()
            }
        }
    }
    // operacoes matematica
    soma () {
        this.resultadoequacao = this.num1 + this.num2;
        this.resultdigitado = prompt(`Qual é o valor de ${this.position('+')}?`);
    }

    subtracao () {
        this.posicaodeNum1eNum2()
        this.resultadoequacao = this.num1 - this.num2;
        this.resultdigitado = prompt(`Qual é o valor de ${this.position('-')}?`);
    }
    posicaodeNum1eNum2() {
        let auxiliar = this.num2;
        if (this.num1 < this.num2) {
            this.num2 = this.num1;
            this.num1 = auxiliar;
        }
    }

    multiplicar (){
        this.resultadoequacao = this.num1 * this.num2
        this.resultdigitado = prompt(`Qual o valor de ${this.position('*')}?`)
    }
    
    divisao () {
        this.Restodiferentedzero();
        this.resultadoequacao = this.num1 / this.num2;
        this.resultdigitado = prompt(`Qual é o valor de ${this.position('/')}?`)
    }
    //verificar se dois numeros divisiveis é diferente de 0, se não for, gerar numero até que sejam.
    Restodiferentedzero () {
        while(this.num1 % this.num2 != 0) {
            this.num1 = Math.floor(Math.random() * (this.maximo - this.minimo) + this.minimo)
            this.num2 = Math.floor(Math.random() * (this.maximo - this.minimo) + this.minimo)
        }
    }
    adcionarpontos () {
        this.score += 5;
        if(this.score % 20 == 0) {
            this.maximo += 10;
        }
        if(this.score % 50 == 0 && this.life < 3) {
            this.life++
            alert('Você recuperou mais uma vida.')
        }
    }
    //diminuir pontos e reset game
    gameover() {
        if (this.resultdigitado != this.resultado) {
            this.life--
            alert('Vidas: ' + this.life)
        }
        
        if (this.life == 0) {
            if(prompt("GAME OVER! Você fez " + this.score + " pontos. Se deseja recomeçar tecle s. se não, tecle n.") == "s") {
                this.life = 3;
                this.score = 0;
                this.maximo = 0;
            }
        }
    }
}

new Jogomatematico()