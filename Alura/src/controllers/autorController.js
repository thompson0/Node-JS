import NaoEncotrado from "../erros/NaoEncotrado.js"
import { autor } from "../models/index.js"

class AutorController {

  static async listarAutors (req,res,next){
    try{
      const listaautores =  autor.find()

      req.resultado = listaautores
      next()
      
    } catch(erro){
      res.status(500).json({message: "erro interno do servidor"})
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
        next(new NaoEncotrado("falha na requicao do autor"));
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
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body)
      if (autorEncontrado !== null) {
        res.status(200).json({message: "autor atualizado"})
      }
      else{
        next(new NaoEncotrado("falha na requicao do autor"));
      }
      
      
    } catch(erro){
      next(erro)
    }
  };

  static async deletarAutor (req,res,next){
    try{
      const id = req.params.id
      const autorEncontrado = await autor.findByIdAndDelete(id, req.body)
      if (autorEncontrado !== null) {
        res.status(200).json({message: "autor atualizado"})
      }
      else{
        next(new NaoEncotrado("falha na requicao do autor"));
      }
      res.status(200).json({message: "autor deletado"})
    } catch(erro){
      next(erro)
    }
  };

};



export default AutorController