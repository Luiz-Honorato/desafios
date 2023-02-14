
function gerar() {
    let inicio = Math.floor(Math.random() * (255 - 0) + 1)
    let meio = Math.floor(Math.random() * (255 - 0) + 1)
    let fim = Math.floor(Math.random() * (255 - 0) + 1)
    
    document.getElementById('container').style.backgroundColor = `rgb(${inicio},${meio},${fim})`;
    document.querySelector('button').style.backgroundColor = `rgb(${inicio},${meio},${fim})`;
    
    document.querySelector('span').innerHTML = `rgb(${inicio},${meio},${fim})`;
}