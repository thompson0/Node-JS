const { where } = require('sequelize');
const converteIds = require('../utils/conversorDeStringHelper.js');
const { param } = require('../routes/pessoasRoutes.js');
class Controller {
  constructor(entidadeService) {
      this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
      try {
          const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistro();
          return res.status(200).json(listaDeRegistro);
      } catch (erro) {
        return res.status(500).json({erro : erro.message})
      }
  }

  async pegaUmPorId(req, res) {
      const { id } = req.params;
      const idNum = Number(id);
      try {
          const umRegistro = await this.entidadeService.pegaUmRegistroPorId(idNum);
          return res.status(200).json(umRegistro);
      } catch (erro) {
        return res.status(500).json({erro : erro.message})
      }
  }
  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params)    
     try {
         const umRegistro = await this.entidadeService.pegaUmRegistro(where);
         return res.status(200).json(umRegistro);
     } catch (erro) {
       return res.status(500).json({erro : erro.message})
     }
}

  async criaNovo(req, res) {
      const dadosParaCriacao = req.body;
      try {
          const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
          return res.status(201).json(novoRegistroCriado);
      } catch (erro) {
        return res.status(500).json({erro : erro.message})
      }
  }

  async atualiza(req, res) {
      const { ...params } = req.params;
      const where = converteIds(params)
      const dadosAtualizados = req.body;
      try {
          const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, where);
          if (foiAtualizado) {
            return res.status(200).json({ message: 'Atualizado com sucesso' });
          }
          
      } catch (erro) {
        return res.status(500).json({erro : erro.message})
      }
  }

  async exclui(req, res) {
      const { id } = req.params;
     
      try {
       
         await this.entidadeService.excluiRegistro(Number(id));
          return res.status(200).json({mensagem: `id ${id} deletado com sucesso`}); 
      } catch (erro) {
          return res.status(500).json({ 
              erro: erro.message 
          });
      }
  }
}

module.exports = Controller;