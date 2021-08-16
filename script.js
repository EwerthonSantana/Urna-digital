let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-rigth');
let numeros = document.querySelector('.d-1-3');
let audio = document.querySelector('.audio');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += ' <div class="numero pisca"></div>'
        } else {
            numeroHtml += ' <div class="numero"></div>'

        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let canditado = etapa.canditados.filter((item) => {
        if (item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    if (canditado.length > 0) {
        canditado = canditado[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<strong>Nome: </strong> ${canditado.nome}<br/><strong>Partido: </strong>${canditado.partido}`;

        let fotosHtml = '';
        for (let i in canditado.fotos) {
            if (canditado.fotos[i].small) {
                fotosHtml += `<div class="d-1-image small"> <img src="assets/${canditado.fotos[i].url}" alt="img2"> ${canditado.fotos[i].legenda} </div>`;
            } else {
                fotosHtml += `<div class="d-1-image"> <img src="assets/${canditado.fotos[i].url}" alt="img2"> ${canditado.fotos[i].legenda} </div>`;
            }
        }

        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca');
    if (elnumero !== null) {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;
    }
    elnumero.classList.remove('pisca');
    if (elnumero.nextElementSibling !== null) {
        elnumero.nextElementSibling.classList.add('pisca');
    } else {
        atualizaInterface();
    }
}

function branco() {
    numero = '';
    votoBranco = true;
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';

}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
        console.log("Confirmando como BRANCO...");
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
        console.log("Confirmando como " + numero);
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        } else {
           document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
           console.log(votos);
           audio.play();
           
        }
    }
}

comecarEtapa();