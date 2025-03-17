import mongoose from "mongoose"
import { autorSchema } from "./autor.js"

const livroSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  titulo :{ type : String, required : [true, "o titulo do livro e obrigatorio"]},
  editora : { type : String, required : [true, "a editora do livro e obrigatorio"], 
    enum: {
      values : ["Alura","Casa do codigo"],
      message : "Editora {VALUE} nao e valida"
    }
  },
  preco : { type : Number, },
  paginas : { type : Number,
    validate : {
      validator:(valor)=>{
      return valor >= 10 && valor <= 5000;
    },
    message : "O numero de paginas deve estar entre 10 e 5000, {VALUE} nao e valido" 
  }
 },

  autor : {type : autorSchema}
}, {versionKey : false})

const livro = mongoose.model("livros", livroSchema)
export default livro