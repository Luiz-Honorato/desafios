let currentId = null;

function setupCurrentIdTodos(todos) {
    for (let i in todos) {
        if (todos[i].id > currentId)
            currentId = todos[i].id;
    }
}

function addID(task) {
    currentId += 1;
    task.id = currentId;
}

function addTimeStemp(task) {
    task.createdAt = +new Date();
    task.updatedAt = +new Date();
}

function addTodo(req, res, url, todos, categories, writeTODOtoFile) {
    res.statusCode = 201;
    let data = "";
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        let task = JSON.parse(data);
        
        let containsCategory = false;
        for (let i in categories) {
            if(categories[i].id == task.categoryId) {
                containsCategory = true;
                break;
            }
        }
        
        if (task.title && task.description && task.categoryId && containsCategory) {
            addID(task);
            addTimeStemp(task);
            todos.push(task);
            writeTODOtoFile();
            res.end();
        } else {
            res.statusCode = 400;
            res.end("BAD REQUEST")
        }
    });
}

function findById(id, todos) {
    for (let i in todos) {
        if (todos[i].id == id) {
            return todos[i];
        }
    }
    return false;
}
function listTodos(req, res, url, todos, categories) {
    res.setHeader('Content-type', 'application/json');
    if (url.query.id) {
        let task = findById(url.query.id, todos);
        if (task && (!task.deletedAt || url.query.showDeleted == "true")) {
            res.end(JSON.stringify(task));
        } else {
            res.statusCode = 404;
            res.end("NOT FOUND");
        }
    } else if(url.query.categoryid) {
        let newTodos = [];
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].categoryId == url.query.categoryid && (!todos[i].deletedAt || url.query.showDeleted == "true")) {
                newTodos.push(todos[i]);
            }
        }
        res.end(JSON.stringify(newTodos));
    }   else {
        let newTodos = [];
        for (let i in todos) {
            if (!todos[i].deletedAt || url.query.showDeleted == "true") {
                newTodos.push(todos[i]);
            }
        }
        res.end(JSON.stringify(newTodos));
    }
}

function deleteTodo(req, res, url, todos, categories, writeTODOtoFile) {
    if (url.query.id) {
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id == url.query.id) {
                todos[i].deletedAt = +new Date();
                writeTODOtoFile();
            }
        }
        res.end();
    } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
    }
}

function updateTodo(req, res, url, todos, categories, writeTODOtoFile) {
    if (url.query.id) {
        for (let i in todos) {
            if (todos[i].id == url.query.id && !todos[i].deletedAt) {
                let data = "";
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on("end", () => {
                    let task = JSON.parse(data);
                    if (task.title && task.description) {
                        task.id = todos[i].id;
                        task.createdAt = todos[i].createdAt;
                        task.updatedAt = +new Date();
                        todos[i] = task;
                        writeTODOtoFile();
                        res.end();
                    } else {
                        res.statusCode = 400;
                        res.end("BAD REQUEST");
                    }
                });
                return;
            }
        }
        res.statusCode = 404;
        res.end("NOT FOUND");
    } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
    }
}

module.exports = {
    addTodo, listTodos, deleteTodo, updateTodo, setupCurrentIdTodos
}