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


const usuario = new Usuario('NomeUsuario1', 'senha123');

const senhasComuns = ['123','321','ARROZ','blink123','brasil','oi','senha123','casas bahia'];

senhasComuns.map( senha=>{
    if(usuario.autentica('NomeUsuario1',senha)){
        console.log(`A senha do usuario e ${senha}`)
    }
} )