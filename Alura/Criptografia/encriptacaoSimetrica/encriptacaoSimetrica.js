import { createCipheriv, randomBytes , createDecipheriv } from "crypto";

const mensagem = 'Demonstracao Do curso';
const chave = randomBytes(32);
const vi = randomBytes(16);

const cifra = createCipheriv('aes256', chave, vi);
const mensagemCifrada = cifra.update(mensagem, 'utf-8', 'hex') + cifra.final('hex')

console.log(mensagemCifrada)

// Transmissão --------chave, vi, mensagem 

// Decifrar mensagem

const decifra = createDecipheriv('aes256',chave, vi)

const mensagemDecifrada = decifra.update(mensagemCifrada, 'hex', 'utf-8') + decifra.final('utf-8')
console.log(`Decifrando: ${mensagemDecifrada.toString('utf-8')}`)