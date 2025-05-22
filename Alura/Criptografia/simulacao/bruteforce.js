import { createHash } from 'crypto'

class Usuario{
    constructor(nome,senha){
        this.nome = nome,
        this.hash = this.criaHash(senha)
    }
     criaHash(senha) {
        return createHash('sha256').update(senha).digest('hex')
    }
    autentica(nome, senha){
        if(nome === this.nome && this.hash === this.criaHash(senha)){
            console.log('usuario autenticado com sucesso')
            return true
        }
        // console.log('Usuario ou senha incorretos ')
        return false
    }
}

export default  Usuario


const usuario = new Usuario('NomeUsuario1', '1337')

for(let senhasTeste =0 ;senhasTeste <10000 ; senhasTeste++){
    if(usuario.autentica("NomeUsuario1", senhasTeste.toString())){

         console.log(`A senha do usuario e ${senhasTeste}`)
    }
    console.log(senhasTeste.map())
}
