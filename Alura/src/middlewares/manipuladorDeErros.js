import mongoose from "mongoose"
import ErroBase from "../erros/ErroBase.js"
import RequisaoIncorreta from "../erros/RequisicaoIncorreta.js"
import ErroValidacao from "../erros/ErroValidacao.js"
import NaoEncotrado from "../erros/NaoEncotrado.js"

function manipuladorDeErros(erro,req,res,next) {
  if (erro instanceof mongoose.Error.CastError) {
    new RequisaoIncorreta().enviarResposta(res)
  }
  else if (erro instanceof mongoose.Error.ValidationError) {
   new ErroValidacao(erro).enviarResposta(res)
  }
  else if(erro instanceof NaoEncotrado){
    erro.enviarResposta(res)
  }
  else{
    new ErroBase().enviarResposta(res)
  }
}
export default manipuladorDeErros