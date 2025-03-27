import { emitirTextoEditor, selecionar_documento } from "./socket-front-documento.js";
import { emitirExcluriDocumento } from "./socket-front-index.js";

const parametros = new URLSearchParams(window.location.search);
const nomeDocumentos = parametros.get("nome")

const textoEditor = document.getElementById("editor-texto");
const tituloDocumento = document.getElementById("titulo-documento");
const botaoExcluir = document.getElementById("excluir-documento")

tituloDocumento.textContent = nomeDocumentos || "Documento sem titulo"

selecionar_documento(nomeDocumentos)

textoEditor.addEventListener("keyup",()=>{
    emitirTextoEditor({
        texto: textoEditor.value, 
        nomeDocumentos,});
});

botaoExcluir.addEventListener("click",()=>{
    emitirExcluriDocumento(nomeDocumentos)
})

function atualizaTextoEditor(texto) {
    textoEditor.value = texto;
};
function alertarERedirecionar(nome) {
    if(nome === nomeDocumentos){
        alert(`${nome} excluido`);
    window.location.href = "/"
    }
   
}
export {atualizaTextoEditor, alertarERedirecionar};

