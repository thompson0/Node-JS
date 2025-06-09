import { hash, scryptSync, timingSafeEqual } from "crypto"
import { buffer } from "stream/consumers"
function  autenticarUsuario(senhaDigita, usuario) {
     const hashTeste = scryptSync(senhaDigita, usuario.salSenha, 64)

     const hashReal = Buffer.from(usuario.hashSenha, "hex")

     const autenticado = timingSafeEqual(hashTeste, hashReal)

     return autenticado
}

export default autenticarUsuario