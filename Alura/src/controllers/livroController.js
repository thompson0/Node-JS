import livro from "../models/livro.js";

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
    try {
      const novolivro = await livro.create(req.body);
      res.status(201).json({ message: "criado com sucesso", livro: novolivro})
    } catch (erro) {
      res.status(500).json({message : `${erro.message} - Falha ao cadastrar livro`})
    }
    
  }

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

};



export default LivroController