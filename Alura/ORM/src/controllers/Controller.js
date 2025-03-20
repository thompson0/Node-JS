class Controller {
  constructor(entidadeService) {
      this.entidadeService = entidadeService;
  }

  async pegaTodos(req, res) {
      try {
          const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistro();
          return res.status(200).json(listaDeRegistro);
      } catch (error) {
          console.error('Erro ao listar registros:', error);
          return res.status(500).json({ 
              message: 'erro interno do servidor',
              error: error.message 
          });
      }
  }

  async pegaUmPorId(req, res) {
      const { id } = req.params;
      const idNum = Number(id);
      try {
          if (isNaN(idNum)) {
              return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
          }
          const umRegistro = await this.entidadeService.pegaUmRegistroPorId(idNum);
          if (!umRegistro) {
              return res.status(404).json({ message: 'Registro não encontrado' });
          }
          return res.status(200).json(umRegistro);
      } catch (error) {
          console.error('Erro ao buscar registro por ID:', error);
          return res.status(500).json({ 
              message: 'erro interno do servidor',
              error: error.message 
          });
      }
  }

  async criaNovo(req, res) {
      const dadosParaCriacao = req.body;
      try {
          const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao);
          return res.status(201).json(novoRegistroCriado);
      } catch (error) {
          console.error('Erro ao criar registro:', error);
          return res.status(500).json({ 
              message: 'erro interno do servidor',
              error: error.message 
          });
      }
  }

  async atualiza(req, res) {
      const { id } = req.params;
      const idNum = Number(id);
      const dadosAtualizados = req.body;
      try {
          if (isNaN(idNum)) {
              return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
          }
          const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, idNum);
          if (!foiAtualizado) {
              return res.status(404).json({ message: 'Registro não encontrado ou não atualizado' });
          }
          return res.status(200).json({ message: 'Atualizado com sucesso' });
      } catch (error) {
          console.error('Erro ao atualizar registro:', error);
          return res.status(500).json({ 
              message: 'erro interno do servidor',
              error: error.message 
          });
      }
  }

  async exclui(req, res) {
      const { id } = req.params;
      const idNum = Number(id);
      try {
          if (isNaN(idNum)) {
              return res.status(400).json({ message: 'ID inválido. Deve ser um número.' });
          }
          const resultado = await this.entidadeService.excluiRegistro(idNum);
          if (!resultado) {
              return res.status(404).json({ message: 'Registro não encontrado' });
          }
          return res.status(204).send(); // No content
      } catch (error) {
          console.error('Erro ao excluir registro:', error);
          return res.status(500).json({ 
              message: 'erro interno do servidor',
              error: error.message 
          });
      }
  }
}

module.exports = Controller;