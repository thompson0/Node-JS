import livro from "../models/livro.js";
import { autor } from "../models/autor.js";
class LivroController {

  static async listarLivros (req,res){
    try{
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha na requicao`})
    }
  };

  static async listaLivroPorId (req,res){
    try{
      const id = req.params.id
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha na requicao do livro`})
    }
  };

  static async cadastrarLivro (req, res) {
    const novolivro = req.body
    try {
      const autorEncontrado = await autor.findById(novolivro.autor);
      const livroCompleto = { ...novolivro, autor: { ...autorEncontrado._doc }};
      const livroCriado =  await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: novolivro})
    } catch (erro) {
      res.status(500).json({message : `${erro.message} - Falha ao cadastrar livro`})
    }
    
  }

//67d5eb901e6bf966ce932550

  static async atualizarLivro (req,res){
    try{
      const id = req.params.id
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "livro atualizado"});
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha na atualizao do livro`})
    }
  };

  static async deletarlivro (req,res){
    try{
      const id = req.params.id
      await livro.findByIdAndDelete(id, req.body);
      res.status(200).json({message: "livro deletado"});
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha em deletar o livro`})
    }
  };


static async listarLivrosPorEditora(req,res){
   const editora = req.query.editora;
   try{
    const livrosPorEditora = await livro.find({editora : editora});
    res.status(200).json(livrosPorEditora)
   } catch(erro){
    res.status(500).json({message: `${erro.message}-falha na busca`})
   }
}  
};



export default LivroController;