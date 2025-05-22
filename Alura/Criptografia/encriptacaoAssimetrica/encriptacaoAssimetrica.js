import { generateKeyPairSync, publicEncrypt , privateDecrypt } from "crypto";

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

// console.log(publicKey)
// console.log(privateKey)

const dadosCriptografados = publicEncrypt(publicKey , Buffer.from('Mensagem secreta'))
console.log(dadosCriptografados.toString('hex'))

// ------------ Transimissao ------------

const dadosDecifrados = privateDecrypt({
    key:privateKey,
    passphrase: 'top secret',

},
dadosCriptografados)

console.log(`Dados decifrados ${dadosDecifrados}`.toString('utf-8'))