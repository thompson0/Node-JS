import { generateKeyPairSync, createSign, createVerify } from "crypto";

const { publicKey,privateKey,
} = generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: 'top secret',
  },
});

let dados = 'Essa string vai ser assinada'

//Assinatura 

const assinador = createSign('rsa-sha256');
assinador.update(dados);
const assinatura = assinador.sign({
    key:privateKey,
    passphrase:'top secret'
}, 'hex');

console.log(`Assinatura : ${assinatura}`)
//Intermediario 

//dados += 'Arquivo Alterado'

// Envio desse documento --------- Documento assinatura e a chave publica 

const verificador = createVerify('rsa-sha256');

verificador.update(dados)

const ehVerificado = verificador.verify(publicKey,assinatura,'hex')

console.log(ehVerificado)