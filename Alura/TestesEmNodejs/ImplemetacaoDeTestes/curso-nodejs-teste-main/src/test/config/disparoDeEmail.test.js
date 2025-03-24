import { describe, expect } from "@jest/globals";
import nodemailer from 'nodemailer'
import 'dotenv/config'
const transporter = nodemailer.createTransport({
    host: process.env.HOST_EMAIL,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS_EMAIL,
    },
  });
const verificarConexao = ()=> new Promise((resolver,reject)=>{
    transporter.verify((error, success)=> {
        if (error) {
          reject(error);
        } else {
         resolver(success);
        }
      });
})
describe('Testando Disparo de email',()=>{
    it('o sistema deve validar se a conexao com o disparo de email',async()=>{
        const estaConectado = true

        const validarConexao = await verificarConexao()

        expect(validarConexao).toStrictEqual(estaConectado)
    })
})