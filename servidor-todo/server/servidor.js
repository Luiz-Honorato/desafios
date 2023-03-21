const http = require("http");
const { Stream } = require("stream");
const url = require("url");

let todos = [
    /*{id: 1, title: "Compras", description: "Frutas, Limpeza, comidas"},
    */
];
//GET PEGAR UMA TAREFA;
//POST ADD UMA TARFEA NOVA;
//DELETE DELETAR UMA TAREFA;
http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    console.log("Rodando");
    
    if (reqUrl.pathname == "/todo") {
        
        if(req.method == "GET") {
            if(reqUrl.query.id == todos[id]) {
                let especificTodos = null;
                for (let i in todos) {
                    if(todos[i].id == id) {
                        especificTodos = todos[i]
                    }
                }
                res.end(especificTodos);
            } else {
                res.end(JSON.stringify(todos));
            } 
            //res.end(JSON.stringify(todos));
        } else if(req.method == "POST") {
            //adc

            let data = "";//vai receber o chunk que é enviado de forma separada;
            req.on('data', chunk => {
                //chunk é uma parcela de dados que serão enviados, os dados são quebrados para serem enviados;
                data += chunk;
            });
            
            req.on("end", () => {
                
                function gerarId() {
                    let lastTask = todos[todos.length - 1];
                    let id = 1;
                    if(lastTask) {
                        id = lastTask.id + 1;
                    }
                    task.id = id;
                }
                
                let task = JSON.parse(data) //transforma a string em um método;
                gerarId(task);
                todos.push(task);
                res.end();
            });
        } else if(req.method == "DELETE") {
            let id = reqUrl.query.id;
            let newtodos = [];
            
            //deletar, check na posição do array todos 
            for (let i in todos) {
                if(todos[i].id != id) {
                    newtodos.push(todos[i]);
                }
            }
            todos = newtodos;
            res.end();
        } else {
            res.end();
        }
    } else {
        res.end("");
    }
}).listen(8180);