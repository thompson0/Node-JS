import NaoEncotrado from "../erros/NaoEncotrado.js"
import { pecas } from "../models/index.js"

class PecasController {

  static async listarPecas (req,res){
    try{
      const listapecases = await pecas.find()
      req.resultado = listapecases
      res.status(200).json(listapecases)
    } catch(erro){
      res.status(500).json({message: "erro interno do servidor"})
    }
  };

  static async listarPecasPorId (req,res,next) {
    try{
      const id = req.params.id
      const pecasEncontrado = await pecas.findById(id)
      if (pecasEncontrado !== null) {
        res.status(200).json(pecasEncontrado)
      }
      else{
        next(new NaoEncotrado("falha na requicao do pecas"));
      }

    } catch(erro){
      next(erro)
    }
  };

  static async cadastrarPecas (req, res, ) {
    console.log(req.body)
    try {
      const novopecas = await pecas.create(req.body)
      res.status(201).json({ message: "criado com sucesso", pecas: novopecas})
    } catch (erro) {
      console.log(erro)
    }
    
  }

  static async atualizarPecas (req,res,next){
    try{
      
      const id = req.params.id
      const pecasEncontrado = await pecas.findByIdAndUpdate(id, req.body)
      if (pecasEncontrado !== null) {
        res.status(200).json({message: "pecas atualizado"})
      }
      else{
        next(new NaoEncotrado("falha na requicao do pecas"));
      }
      
      
    } catch(erro){
      next(erro)
    }
  };

  static async deletarPecas(req, res) {
    try {
      console.log("req.params.codigo:", req.params.codigo);
      const codigo = Number(req.params.codigo);
         if (isNaN(codigo)) {
           return res.status(400).json({ message: "Código inválido" });
         }
      const resultado = await pecas.deleteOne({ codigo: codigo });
      
      if (resultado.deletedCount > 0) {
        return res.status(200).json({ message: "Peça deletada com sucesso" });
      } else {
        return res.status(404).json({ message: "Peça não encontrada" });
      }
    } catch (erro) {
      console.log(erro);
      return res.status(500).json({ message: "Erro interno no servidor" });
    }
  }

};



export default PecasController