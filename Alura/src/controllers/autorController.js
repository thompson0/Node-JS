import app from "../app.js"
import { autor } from "../models/autor.js"

class AutorController {

  static async listarAutors (req,res){
    try{
      const listaautores = await autor.find({})
      res.status(200).json(listaautores)
    } catch(erro){
      res.status(500).json({message: `${erro.message}-falha na requicao`})
    }
  };

  static async listaAutorPorId (req,res,next) {
    try{
      const id = req.params.id
      const autorEncontrado = await autor.findById(id)
      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado)
      }
      else{
        res.status(404).json({message: "falha na requicao do autor"})
      }

    } catch(erro){
      next(erro)
    }
  };

  static async cadastrarAutor (req, res, next) {
    try {
      const novoautor = await autor.create(req.body)
      res.status(201).json({ message: "criado com sucesso", autor: novoautor})
    } catch (erro) {
      next(erro)
    }
    
  }

  static async atualizarAutor (req,res,next){
    try{
      const id = req.params.id
      await autor.findByIdAndUpdate(id, req.body)
      res.status(200).json({message: "autor atualizado"})
    } catch(erro){
      next(erro)
    }
  };

  static async deletarAutor (req,res,next){
    try{
      const id = req.params.id
      await autor.findByIdAndDelete(id, req.body)
      res.status(200).json({message: "autor deletado"})
    } catch(erro){
      next(erro)
    }
  };

};



export default AutorController