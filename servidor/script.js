const http = require("http");
const url = require("url");
    

http.createServer((req,res) =>{
    const reqUrl = url.parse(req.url, true);
    console.log("rodando", reqUrl.pathname);
    res.setHeader('Content-Type', 'html');
    
    if(reqUrl.pathname == "/home") {
        let nome = reqUrl.query.nome;
        if(nome == null) {
            res.end("<h1>Home</h1>");
        } else {
            res.write("<h1>Bem vindo a pagina inicial " + nome);
            res.end();
        }
    } else if(reqUrl.pathname == "/feed") {
        if(reqUrl.query.order == "asc") {
            res.write("<html><ul><li>1</li> <li>2</li> <li>3</li></ul></html>");
            res.end();
        } else if(reqUrl.query.order == "desc") {
            res.end("<html><ul><li>3</li> <li>2</li> <li>1</li></ul></html>")
        } else{
            res.end("<h1>Bem vindo ao feed</h1>");
        }
    } else if(reqUrl.pathname == "/settings") {
        if(reqUrl.query.senha == "0101") {
            res.end("<h1>Acesso.</h1>")
        } else {
            res.statusCode = 403;
            res.end();
        }
    } else {
        res.end();
    }
}).listen(8000);

//rota settings, senhas