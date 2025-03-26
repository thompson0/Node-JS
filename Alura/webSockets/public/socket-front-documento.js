import { atualizaTextoEditor } from "./documento.js";

const socket = io()

function selecionar_documento(nome) {
    
    socket.emit("selecionar_documento", nome, (texto)=>{
        atualizaTextoEditor(texto)
    })
}

function emitirTextoEditor(dados) {
    socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes",(texto)=>{
    atualizaTextoEditor(texto)
});
export {emitirTextoEditor , selecionar_documento}