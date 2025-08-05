import mongoose from "mongoose"

const pecasSchema = new mongoose.Schema({
  nome : {type : String, required : [true, "o nome da peca e obrigatorio "]},
  descricao : {type : String,},
  criadora : {type : String, required : [true, "o nome do criador e obrigatorio "]},
  codigo : {type : Number, required : [true, "o codigo da peca e obrigatorio "]},
},{versionKey : false})

const pecas = mongoose.model("pecas", pecasSchema)

export {pecas , pecasSchema}
