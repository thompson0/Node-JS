import "./socket-front-index.js";
import { emitirAdicionarDocumento, inicializarSocket } from "./socket-front-index.js";

let listaDocumentos;

console.log('Script starting...');

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM loaded');
  
  listaDocumentos = document.getElementById("lista-documentos");
  console.log('Lista documentos:', listaDocumentos);
  
  const form = document.getElementById("form-adiciona-documento");
  console.log('Form:', form);
  
  const inputDocumento = document.getElementById("input-documento");
  console.log('Input:', inputDocumento);

  if (!form) {
    console.error("Form element not found");
    return;
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    emitirAdicionarDocumento(inputDocumento.value);
    inputDocumento.value = "";
  });

  inicializarSocket();
});

function inserirLinkDocumento(nomeDocumento) {
  if (!listaDocumentos) {
    console.error("Lista de documentos not found");
    return;
  }
  
  listaDocumentos.innerHTML += `<a href="documento.html?nome=${nomeDocumento}" class="list-group-item list-group-item-action"
    id="documento-${nomeDocumento}">
    ${nomeDocumento}
  </a>`;
}
function removerLinkDocumento(nomeDocumento) {
  const documento = document.getElementById(`documento-${nomeDocumento}`)

  listaDocumentos.removeChild(documento)
}

export { inserirLinkDocumento, removerLinkDocumento };