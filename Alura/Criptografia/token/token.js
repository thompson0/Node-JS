import jwt from 'jsonwebtoken'
const chaveSecreta = 'chaveSuperSecreta'

const token = jwt.sign(
    {
        apelido: 'jv',
        curso: 'seguranca e node.js'
    },chaveSecreta
)

console.log(token)

const tokeDecodificado = jwt.verify(token, chaveSecreta)

console.log(tokeDecodificado)