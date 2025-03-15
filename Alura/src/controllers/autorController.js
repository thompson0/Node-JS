import { autor } from "../models/autor.js";

class AutorController {

  static async listarAutors (req,res){
    try{
      const listaautores = await autor.find({});
      res.status(200).json(listaautores);
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha na requicao`})
    }
  };

  static async listaAutorPorId (req,res){
    try{
      const id = req.params.id
      const autorEncontrado = await autor.findById(id);
      res.status(200).json(autorEncontrado);
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha na requicao do autor`})
    }
  };

  static async cadastrarAutor (req, res) {
    try {
      const novoautor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoautor})
    } catch (erro) {
      res.status(500).json({message : `${erro.message} - Falha ao cadastrar autor`})
    }
    
  }

  static async atualizarAutor (req,res){
    try{
      const id = req.params.id
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({message: "autor atualizado"});
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha na atualizao do autor`})
    }
  };

  static async deletarAutor (req,res){
    try{
      const id = req.params.id
      await autor.findByIdAndDelete(id, req.body);
      res.status(200).json({message: "autor deletado"});
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha em deletar o autor`})
    }
  };

};



export default AutorController