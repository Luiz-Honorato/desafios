class Feed {
    posts = [{
        photo: "https://www.maceioalagoas.com/wp-content/uploads/2016/07/Praia-do-Patacho_Itawi-Albuquerque_Sedetur_5.jpg",
        description: "Maceio-Alagoas, que venhaaa mais hahahah!!#sol#paraia#ferias!",
        timestamp:  () => {
            let data = new Date();
            let hora = data.getHours();
            let minut = data.getMinutes()
            const formathora = minut < 10 ? `0${hora}`:hora;
            const formatminut = minut < 10 ? `0${minut}`: minut;
            return `Postada as: ${formathora}:${formatminut}.`
        },
        autor: {
            name: "Luiz Roberto",
            username: "luizroberto.h",
            photo: "./img/2.png"
        }
    }]
    
    constructor () {
        this.feed()
    }
    
    feed () {
        for (let i in this.posts) {
            let name = document.querySelector("h6")
            let post = document.createElement("div")
            let sec = document.createElement("section")
            let username = document.createElement("span")
            let linkfoto = document.createElement("a")
            let autorfoto = document.createElement("img")
            let foto = document.createElement("img")
            let descricao = document.createElement("p")
            let hourpostada = document.createElement("span")
            
            autorfoto.className = "autorfoto"
            autorfoto.src = this.posts[i].autor.photo;
            
            linkfoto.href = "./img/2.png";
            
            name.innerText = this.posts[i].autor.name
            username.innerText = "@"+this.posts[i].autor.username
            username.className = "username"
            
            descricao.innerText = this.posts[i].description
           
            foto.src = this.posts[i].photo
            foto.className = "post-img"
            
            hourpostada.innerText = this.posts[i].timestamp()
            hourpostada.className = "horapostada";
            
            //colocando elementos dentro de elementos html
            linkfoto.appendChild(autorfoto)
            sec.appendChild(linkfoto)
            sec.appendChild(username)
            post.appendChild(sec)
            post.appendChild(foto)
            post.appendChild(descricao)
            post.appendChild(hourpostada)
            
            document.querySelector("#posts").appendChild(post)

        }
    }
}

new Feed()