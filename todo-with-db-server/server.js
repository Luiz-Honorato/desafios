const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'L128738r%',
    database: 'task-list'
})
const listTodos = require("./routes/todo").listTodos;
const addTodo = require("./routes/todo").addTodo;
const updateTodo = require("./routes/todo").updateTodo;
const deleteTodo = require("./routes/todo").deleteTodo;


const { listCategories, addCategory, updateCategory, deleteCategory } = require("./routes/category.js");



connection.query("SELECT 5", (error, result) => {
    if(error) {
        console.log("Erro na conecção")
    } else {
        console.log("conectado com sucesso")
    }
})


function processRequest(req, res) {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == "/todo") {
        switch (req.method) {
            case "GET":
                listTodos(req, res, reqUrl, connection);
                break;
            case "POST":
                addTodo(req, res, reqUrl, connection);
                break;
            case "PUT":
                updateTodo(req, res, reqUrl, connection);
                break;
            case "DELETE":
                deleteTodo(req, res, reqUrl, connection);
                break;
        }
    } else if (reqUrl.pathname == "/category") {
        switch (req.method) {
            case "GET":
                listCategories(req, res, reqUrl, connection);
                break;
            case "POST":
                addCategory(req, res, reqUrl, connection);
                break;
            case "PUT":
                updateCategory(req, res, reqUrl, connection);
                break;
            case "DELETE":
                deleteCategory(req, res, reqUrl, connection);
                break;
        }
    }

}

const server = http.createServer(processRequest);
server.listen(8180);
