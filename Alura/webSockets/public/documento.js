import { emitirTextoEditor, selecionar_documento } from "./socket-front-documento.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumentos = parametros.get("nome")

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");

tituloDocumento.textContent = nomeDocumentos || "Documento sem titulo"

selecionar_documento(nomeDocumentos)

textoEditor.addEventListener("keyup",()=>{
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumentos,});
});

function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
};
export {atualizaTextoEditor};

