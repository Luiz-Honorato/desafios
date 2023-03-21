const http = require("http");
const url = require("url");

const path = require("path");
const fs = require("fs");

//readFile ler o arquivo => ob:ecoding: uft-8 transforma os dados em string.

/*fs.readFile("./senha.txt", {encoding: "utf-8"}, (err, data) =>{
    console.error(err);
    console.log(data);
})*/
// save arquive
/*fs.writeFile(path.join('.', 'primeiro.txt'), "console.log('Isso é um código malicioso')", (error) => {
    console.log(error);
})*/
const listTodos = require("./routes/todo").listTodos;
const addTodo = require("./routes/todo").addTodo;
const updateTodo = require("./routes/todo").updateTodo;
const deleteTodo = require("./routes/todo").deleteTodo;
const setupCurrentIdTodos = require("./routes/todo").setupCurrentIdTodos;

const { listCategories, addCategory, updateCategory, deleteCategory, setupCurrentIdCategories } = require("./routes/category.js");

let todos = [];

let categories = [];

fs.readFile(path.join("data-base", "category.json"), { encoding: "utf-8" }, (error, data) => {
    if (!error) {
        categories = JSON.parse(data);
        setupCurrentIdCategories(categories);
    } else {
        console.error(error);
    }
})

fs.readFile(path.join("data-base", "todo.json"), { encoding: "utf-8" }, (error, data) => {
    if (!error) {
        todos = JSON.parse(data);
        setupCurrentIdTodos(todos)
    } else {
        console.error(error);
    }
})

const writeTODOtoFile = () => {
    fs.writeFile(path.join("data-base", "todo.json"), JSON.stringify(todos), (err) => {
        if (err) {
            console.error(err);
        }
    })
}

const writeCATEGORYtoFile = () => {
    fs.writeFile(path.join("data-base", "category.json"), JSON.stringify(categories), (err) => {
        if (err) {
            console.error(err);
        }
    })
}

function processRequest(req, res) {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == "/todo") {
        switch (req.method) {
            case "GET":
                listTodos(req, res, reqUrl, todos, categories);
                break;
            case "POST":
                addTodo(req, res, reqUrl, todos, categories, writeTODOtoFile);
                break;
            case "PUT":
                updateTodo(req, res, reqUrl, todos, categories, writeTODOtoFile);
                break;
            case "DELETE":
                deleteTodo(req, res, reqUrl, todos, categories, writeTODOtoFile);
                break;
        }
    } else if (reqUrl.pathname == "/category") {
        switch (req.method) {
            case "GET":
                listCategories(req, res, reqUrl, todos, categories);
                break;
            case "POST":
                addCategory(req, res, reqUrl, todos, categories, writeCATEGORYtoFile);
                break;
            case "PUT":
                updateCategory(req, res, reqUrl, todos, categories, writeCATEGORYtoFile);
                break;
            case "DELETE":
                deleteCategory(req, res, reqUrl, todos, categories, writeCATEGORYtoFile)
                break;
        }
    }

}

const server = http.createServer(processRequest);
server.listen(8180);
