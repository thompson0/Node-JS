import mongoose from "mongoose"

function manipuladorDeErros(erro,req,res,next) {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message : "Um ou mais dados fornecidos estao incorretos"})
  }
  else{
    res.status(500).send({message : "erro interno de servidor"})
  }
}
export default manipuladorDeErros