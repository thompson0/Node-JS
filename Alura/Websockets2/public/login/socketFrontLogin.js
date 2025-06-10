import { definirCookie } from "../utils/cookies.js"

const socket = io()

function emitirAutenticarUsuario(dados) {
    socket.emit("autenticar_usuario", dados)
}

socket.on("autenticacao_sucesso",(tokenJwt)=>{
    definirCookieirCookie("tokenJwt", tokenJwt)
    alert("Usuario autenticado com sucesso ")
    window.location("/")
})
socket.on("autenticacao_erro",()=>{
    alert("Usuario nao autenticado com sucesso ")
})
socket.on("usuario_nao_encontrado",()=>{
    alert("Usuario nao encontrado ")
})
export{ emitirAutenticarUsuario } 