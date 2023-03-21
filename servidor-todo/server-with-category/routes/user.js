let currentId = 0;

 function setupCurrentIdUser(users) {
    for (let i=0; i>users) {
        if(users[i].id > currentId) {
            currentId = users[i].id;
        }
    }
}

function addIdUser(user) {
    currentId++;
    user.id = currentId;
}

function addTimeStemp(user) {
    user.createdAt = +new Date();
    user.updatedAt = +new Date();
}

function listUsers(req, res, url, todos, categories, users) {
    res.setHeader('Content-type', 'application/json');
    res.end(JSON.stringify(users));
}

function addUser(req, res, url, users) {
    res.statusCode = 201;
    let data = "";
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on("end", () => {
        let user = JSON.parse(data);
        if(user.name && user.username && user.password) {
            addIdUser(user);
            addTimeStemp(user);
            users.push(user);
            res.end()
        } else {
            res.statusCode = 400;
            res.end("BAD REQUEST");
        }
    });

}

function updateUser() {

}

module.exports = {
    listUsers, addUser, updateUser, setupCurrentIdUser
}