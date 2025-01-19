const pegarValor = seletor => document.querySelector(seletor).value

const geraListaHTML = (listaObj, atribs) => {
    let resultadoHTML = listaObj.reduce(function(acum, elem) {
        if(atribs.length == 1){
            return acum + `<li>${elem[atribs[0]]} </li>`
            }
        else if(atribs.length == 2){
            return acum + `<li>${elem[atribs[0]]} ${elem[atribs[1]]} </li>`
            }
        else if(atribs.length == 3){
            return (acum + `<li>${elem[atribs[0]]} ${elem[atribs[1]]} <span class="nascimento">| Nascimento: ${elem[atribs[2]]}</span></li>`)
            }
        else if(atribs.length == 4){
            return (acum + `<li>${elem[atribs[0]]} ${elem[atribs[1]]} <span class="nascimento">| Idade: ${elem[atribs[3]]} anos</li>`)
            }
    },"<ul>")
    resultadoHTML += "</ul>"
    return resultadoHTML
}


function filtrarListaPorData(){
    let anoInicial = pegarValor("#ano-inicio")
    let anoFinal = pegarValor("#ano-fim")

    //filtrando a lista
    let listaResultado = inventors.filter( (inventor) =>{
        return inventor.year > anoInicial && inventor.year < anoFinal
    })
    return listaResultado
}

function listarNomes(){
    let listaCompleta = []
    for(let i = 0; i < inventors.length;i++){
        listaCompleta.push({
            first: inventors[i].first,
            last: inventors[i].last
        });
    }

    return listaCompleta
}

function listarPorDataDeNascimento(){
    let listaPDDN = inventors.sort(function(a, b){
        return a.year - b.year 
    })

    return listaPDDN
}

function SomarTempoVivoJunto(){
    let total = 0
    for(let i=0;i<inventors.length;i++){
        total += (inventors[i].passed - inventors[i].year)
    }
    return total
}


function OrdenarPorAnosVividos(){
    let listaAnos = inventors.sort(function(a,b){
        let AnosVividosA = a.passed - a.year
        let AnosVividosB = b.passed - b.year
        return AnosVividosB - AnosVividosA
    })
    listaAnos = listaAnos.map(inventor => {
        inventor.anosVividos = inventor.passed - inventor.year
        return inventor
    })

    return listaAnos
    
}

function RemoverRedundancia(){
    let ArrayLimpo = []
  
    for (let i = 0; i < data.length; i++) {
      if (!ArrayLimpo.includes(data[i])) {
        ArrayLimpo.push(data[i])
      }
    }
    
    return ArrayLimpo
}


const btn1 = document.querySelector("#exec1")
btn1.onclick = () => {
    document.querySelector("#result1").innerHTML = geraListaHTML(filtrarListaPorData(), ["first", "last"])
}

const btn2 = document.querySelector("#exec2")
btn2.onclick = () => {
    document.querySelector("#result2").innerHTML = geraListaHTML(listarNomes(), ["first", "last"])
}

const btn3 = document.querySelector("#exec3")
btn3.onclick = () => {
    document.querySelector("#result3").innerHTML = geraListaHTML(listarPorDataDeNascimento(), ["first", "last", "year"])
}

const btn4 = document.querySelector("#exec4")
btn4.onclick = () => {
    let resultado = SomarTempoVivoJunto()
    document.querySelector("#result4").innerHTML = `<p>O tempo vivo total dos inventores é: ${resultado}</p>`
}

const btn5 = document.querySelector("#exec5")
btn5.onclick = () => {
    document.querySelector("#result5").innerHTML = geraListaHTML(OrdenarPorAnosVividos(), ["first", "last", "year","anosVividos"])
}

const btn6 = document.querySelector("#exec6")
btn6.onclick = () => {
    document.querySelector("#result6").innerHTML = `<p>[${RemoverRedundancia()}]</p>`
}

document.querySelector("#data").innerHTML = `<p>[${data.join(', ')}]</p>`