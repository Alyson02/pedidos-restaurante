const pratos = document.querySelector("#prato").children;
const bebidas = document.querySelector("#bebida").children;
const sobremesas = document.querySelector("#sobremesa").children;
const btn = document.querySelector(".btn");
const modal = document.querySelector(".wrap-modal");

ativaEvento(pratos);
ativaEvento(bebidas);
ativaEvento(sobremesas);

let itensSelecionados = 0;
let prato;
let bebida;
let sobremesa;
let total = 0;
let mensagem = "";
let nome;
let endereco;
while (nome == null || nome == "" || endereco == null || endereco == "") {
  nome = prompt("Digite seu nome");
  endereco = prompt("Digite seu endereço");
  if (nome == null || endereco == null) {
    alert("Nome ou endereço obrigatórios");
    continue;
  }
  alert("Ok, agora é só escolher os 3 itens");
}

function ativaEvento(divs) {
  for (let i = 0; i < divs.length; i++) {
    divs[i].addEventListener("click", (e) => {
      marcarEscolhido(divs[i]);
      if (itensSelecionados > 2) {
        habilitaBtn(btn);
      }
    });
  }
}

function marcarEscolhido(div) {
  const pai = div.parentElement;
  const filhos = pai.children;

  var elementoAnteriorEscolhido = verificaTemClasse("escolido", filhos);

  itensSelecionados++;
  console.log(itensSelecionados);

  if (elementoAnteriorEscolhido) {
    if (itensSelecionados > 2) {
      desabilitarBtn(btn);
    }
    itensSelecionados--;
    console.log(itensSelecionados);
  }

  if (elementoAnteriorEscolhido && elementoAnteriorEscolhido != div) {
    desmarcarEscolhido(elementoAnteriorEscolhido);
  }

  if (!div.classList.contains("escolido")) {
    div.classList.add("escolido");
    div.querySelector(".certim").style.display = "initial";
    return;
  }

  desmarcarEscolhido(elementoAnteriorEscolhido);
  itensSelecionados--;
}

function desmarcarEscolhido(elemento) {
  elemento.classList.remove("escolido");
  elemento.querySelector(".certim").style.display = "none";
}

function verificaTemClasse(nomeClasse, elementos) {
  for (let i = 0; i < elementos.length; i++) {
    const elemento = elementos[i];
    if (elemento.classList.contains(nomeClasse)) {
      return elemento;
    }
  }
}

function habilitaBtn(btn) {
  btn.classList.add("confirmar");
  btn.textContent = "Fechar pedido";
}

function desabilitarBtn(btn) {
  btn.classList.remove("confirmar");
  btn.textContent = "Selecione os 3 itens para fechar o pedido";
}

btn.addEventListener("click", (e) => {
  if (itensSelecionados > 2) {
    const divPedidos = Array.from(document.querySelectorAll(".escolido"));
    console.log(divPedidos);

    let valorPrato;
    let valorBebida;
    let valorSobremesa;

    divPedidos.forEach((pedido) => {
      if (pedido.parentElement.id == "prato") {
        prato = pedido.querySelector(".prato").innerHTML;
        valorPrato = pedido.querySelector(".valor").innerHTML;
      }
      if (pedido.parentElement.id == "bebida") {
        bebida = pedido.querySelector(".prato").innerHTML;
        valorBebida = pedido.querySelector(".valor").innerHTML;
      }
      if (pedido.parentElement.id == "sobremesa") {
        sobremesa = pedido.querySelector(".prato").innerHTML;
        valorSobremesa = pedido.querySelector(".valor").innerHTML;
      }

      var valor = pedido.querySelector(".valor").innerHTML;

      valor = valor.replace("R$ ", "");
      valor = valor.replace(",", ".");
      total += Number(valor);
    });

    mensagem = `Olá, gostaria de fazer o pedido:
                - Prato: ${prato}
                - Bebida: ${bebida}
                - Sobremesa: ${sobremesa}
                Total: R$ ${total.toFixed(2)}
                
                Nome: ${nome}
                Endereço: ${endereco}`;

    console.log(mensagem);
    console.log(valorPrato);
    console.log(valorBebida);

    modal.querySelector("#nomePrato").innerHTML = prato;
    modal.querySelector("#pratoModalValor").innerHTML = valorPrato;

    modal.querySelector("#nomeBebida").innerHTML = bebida;
    modal.querySelector("#bebidaModalValor").innerHTML = valorBebida;

    modal.querySelector("#nomeSobremesa").innerHTML = sobremesa;
    modal.querySelector("#sobremesaModalValor").innerHTML = valorSobremesa;

    modal.querySelector("#modalTotal").innerHTML = total.toFixed(2);

    modal.style.display = "flex";
  }
});

const btnFecharPedido = document.querySelector("#fecharPedido");
const btnCancelar = document.querySelector(".cancelar");

btnFecharPedido.addEventListener("click", (e) => {
  e.preventDefault();
  window.location = encodeURI(`https://wa.me/5511933647274?text=${mensagem}`);
});

btnCancelar.addEventListener("click", (e) => {
  e.preventDefault();
  location.reload();
});
