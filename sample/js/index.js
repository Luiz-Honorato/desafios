const samples = [
    {
        title: "Guitar",
        src: "./audio/0.mp3"
    },
    {
        title: "Piano",
        src: "./audio/1.mp3"
    },
    {
        title: "String",
        src: "./audio/3.mp3"

    },
    {
        title: "Piano",
        src: "./audio/2.mp3"
    }
]




    let currentAudio = null;




for (let i in samples) {
    let btn = document.createElement('button');
    btn.innerText = samples[i].title;
    document.querySelector('#sample').appendChild(btn);
    
    
    btn.addEventListener('click', function () {
        if (currentAudio != null) {
            currentAudio.pause();
            currentAudio = null;
            
        }
        const audio = new Audio(samples[i].src)
        audio.play();
        currentAudio = audio;
    })

}




