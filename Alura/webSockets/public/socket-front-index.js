import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";

const socket = io();

function inicializarSocket() {
  socket.emit("obter_documentos", (documentos) => {
    documentos.forEach(documento => {
      inserirLinkDocumento(documento.nome);
    });
  });
}

function emitirAdicionarDocumento(nomeDocumento) {
  socket.emit("adicionar_documento", nomeDocumento);
}

socket.on("adicionar_documento_inferface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

function emitirExcluriDocumento(nome) {
  socket.emit("excluir_documento", nome);
}
socket.on("excluir_documento_sucesso",()=>{
   removerLinkDocumento(nome)
})  

export { emitirAdicionarDocumento, emitirExcluriDocumento, inicializarSocket };