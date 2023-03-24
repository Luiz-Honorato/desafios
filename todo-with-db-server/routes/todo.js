function addTodo(req, res, url, connection) {
    res.statusCode = 201;
    let data = "";
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        let task = JSON.parse(data);
        //TODOS:Checar se categoria existe na tabela categoria;
        if (task.title && task.description && task.category_id) {
            connection.query(`INSERT INTO todo (title, description, category_id) VALUES ('${task.title}', '${task.description}', ${task.category_id} )`
                , (error, result) => {
                    if (error) {
                        res.statusCode = 500;
                        res.end("SERVER ERROR" + error);
                    } else {
                        res.statusCode = 201;
                        res.end("CREATED.")
                    }
                })

        } else {
            res.statusCode = 400;
            res.end("BAD REQUEST")
        }
    });
}

function listTodos(req, res, url, connection) {
    res.setHeader('Content-type', 'application/json');
    let query = `SELECT * FROM todo`;
    if (url.query.id) {
        query += ` WHERE id=${url.query.id}`
        if (url.query.showDeleted != "1") {
            query += ` AND delete_at IS NULL`;
        }

    } else if (url.query.categoryId) {
        query += ` WHERE category_id=${url.query.categoryId}`;
        if (url.query.showDeleted != "1") {
            query += ` AND delete_at IS NULL`;
        }
    } else {
        if (url.query.showDeleted != "1") {
            query += ` WHERE delete_at IS NULL`;
        }
    }
    connection.query(query, (error, result) => {
        if (error) {
            res.statusCode = 404;
            res.end("NOT FOUND" + error);
        } else {
            res.end(JSON.stringify(result))
        }
    })
    console.log(query);
}
function deleteTodo(req, res, url, connection) {
    if (url.query.id) {
        let delete_at = (new Date()).toISOString().slice(0, 19).replace('T', ' '); 
       connection.query(`UPDATE todo SET delete_at='${delete_at}' WHERE id=${url.query.id}`
       , (error, result) => {
            if (error) {
                console.log(error);
                res.statusCode= 500;
                res.end("SERVER ERROR");
            } else {
                res.statusCode = 200;
                res.end();
            }
       })
    } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
    }
}
function updateTodo(req, res, url, connection) {
    if (url.query.id) {
        let data = "";
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on("end", () => {
            let task = JSON.parse(data);
            if (task.title && task.description && task.category_id) {
                task.update_at = (new Date()).toISOString().slice(0, 19).replace('T', ' ');
                connection.query(`UPDATE todo SET title='${task.title}', description='${task.description}', 
                category_id=${task.category_id}, update_at='${task.update_at}' WHERE id=${url.query.id}`, (error, result) => {
                    if (error) {
                        console.log(error);
                        res.statusCode = 500;
                        res.end("SERVER ERROR.");
                    } else {
                        res.statusCode = 200;
                        res.end()
                    }
                });
                res.end();
            } else {
                res.statusCode = 400;
                res.end("BAD REQUEST");
            }
        });

    } else {
        res.statusCode = 400;
        res.end("BAD REQUEST");
    }
}

module.exports = {
    addTodo, listTodos, deleteTodo, updateTodo
}