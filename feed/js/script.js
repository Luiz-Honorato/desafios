/*const posts = [
    {
        photo: "https://www.maceioalagoas.com/wp-content/uploads/2016/07/Praia-do-Patacho_Itawi-Albuquerque_Sedetur_5.jpg",
        description: "Maceio-Alagoas, que venhaaa mais hahahah!!#paraia#ferias#beach",
        timestamp:  () => {
            let data = new Date();
            let hora = data.getHours();
            let minut = data.getMinutes()
            if (hora < 10 || minut < 10) {
                return "postado as: 0" + hora + ": 0" + minut
            } else{
                return "Postado as: " + hora + ":"+ minut + "."
            } 
        },
        autor: {
            name: "Luiz Roberto",
            username: "luizroberto.h",
            photo: "./img/2.png"
        }
    }
]


for (let i in posts) {
    let section = document.createElement("section")
    let post = document.createElement("div");
    let username = document.createElement("span");
    let linkfoto = document.createElement("a")
    let foto = document.createElement("img");
    let autorfoto = document.createElement("img")
    let descricao = document.createElement("p")
    let datapostada = document.createElement("span")
    
    
    username.innerText = `@${posts[i].autor.username}`
    autorfoto.src = posts[i].autor.photo
    linkfoto.href = this.post[i].autor.photo
    foto.src = posts[i].photo
    
    descricao.innerText = `${posts[i].description}`
    
    datapostada.innerText = `${posts[i].timestamp()}`
    datapostada.className = "datapostada";

    //linkfoto.appendChild(autorfoto)
    section.appendChild(linkfoto)
    section.appendChild(username);
    post.appendChild(section)
    post.appendChild(foto)
    post.appendChild(descricao)
    post.appendChild(datapostada)
   
    post.className = "post";
    section.className = "section";
    document.querySelector('#posts').appendChild(post)

}*/

