const mysql = require('mysql2');

/*const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'L128738r%',
    database: 'task-list'
})*/

//connection.query('INSERT INTO todo (title, description, category_id) VALUES ("boleto", "Pagar boleto referente ao mês 3", 2)')

/*connection.query('SELECT * FROM todo', (error, result, fields) => {
    console.log(error, result, fields);
})*/

for (let i = 1; i <= 500; i++) {
    if (i <= 100) {
        connection.query('INSERT INTO todo (title, description, category_id) VALUES ("Trabalho escolar", "Planejar e exucutar trabalho para entregar e apresentar no dia 25", 9)')
    } else if ( i <= 200) {
        connection.query('INSERT INTO todo (title, description, category_id) VALUES ("Análise de empresa", "Analisar balanços das empresas> wege3, taee11 e prio3", 3)')
    } else if ( i <= 300) {
        connection.query('INSERT INTO todo (title, description, category_id) VALUES ("Planejamento Viajem", "Analisar pacotes, preços e passeios da viajem dia 15/06", 10)')
    } else if (i <= 400) {
        connection.query('INSERT INTO todo (title, description, category_id) VALUES ("Curso", "Planejar o cronograma da semana. Conteúdos e execução", 8)')
    } else if (i > 400) {
        connection.query('INSERT INTO todo (title, description, category_id) VALUES ("Material", "Comprar material da casa.", 6)')
    }
}