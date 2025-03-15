import livro from "../models/livro.js"
import { autor } from "../models/autor.js"
class LivroController {

  static async listarLivros (req,res,next){
    try{
      const listaLivros = await livro.find({})
      res.status(200).json(listaLivros)
    } catch(erro){
      next(erro)
    }
  };

  static async listaLivroPorId (req,res,next){
    try{
      const id = req.params.id
      const livroEncontrado = await livro.findById(id)
      res.status(200).json(livroEncontrado)
    } catch(erro){
      next(erro)
    }
  };

  static async cadastrarLivro (req, res,next) {
    const novolivro = req.body
    try {
      const autorEncontrado = await autor.findById(novolivro.autor)
      const livroCompleto = { ...novolivro, autor: { ...autorEncontrado._doc }}
      const livroCriado =  await livro.create(livroCompleto)
      res.status(201).json({ message: "criado com sucesso", livro: novolivro})
    } catch (erro) {
      next(erro)
    }
    
  }

  //67d5eb901e6bf966ce932550

  static async atualizarLivro (req,res,next){
    try{
      const id = req.params.id
      await livro.findByIdAndUpdate(id, req.body)
      res.status(200).json({message: "livro atualizado"})
    } catch(erro){
      next(erro)
    }
  };

  static async deletarlivro (req,res,next){
    try{
      const id = req.params.id
      await livro.findByIdAndDelete(id, req.body)
      res.status(200).json({message: "livro deletado"})
    } catch(erro){
      next(erro)
    }
  };


  static async listarLivrosPorEditora(req,res,next){
    const editora = req.query.editora
    try{
      const livrosPorEditora = await livro.find({editora : editora})
      res.status(200).json(livrosPorEditora)
    } catch(erro){
      next(erro)
    }
  }  
};



export default LivroController