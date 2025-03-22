const { Transaction } = require('sequelize');
const dataSource = require ('../database/models/index.js')

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;

    }
    async pegaTodosOsRegistro(where = {}){
        return dataSource[this.model].findAll({where:{...where}})
    }
    async pegaRegistrosPorEscopo(escopo){
      return dataSource[this.model].scope(escopo).findAll()
    }
    async pegaEContaRegistro(options) {
      try {
          const { where, attributes, group, having } = options;
          return await dataSource[this.model].findAndCountAll({
              where,
              attributes,
              group,
              having
          });
      } catch (erro) {
          throw new Error(`Erro ao buscar registros: ${erro.message}`);
      }
  }
       async pegaUmRegistroPorId(id) {
     return dataSource[this.model].findByPk(id);
   }
   async pegaUmRegistro(where) {
    return dataSource[this.model].findOne({where:{...where}});
  }
   async criaRegistro(dadosDoRegistro) {
     return dataSource[this.model].create(dadosDoRegistro);
   }

    async atualizaRegistro(dadosAtualizado, where, transacao = {}){
        const listadeRegistroAtualizado = dataSource[this.model]
        .update(dadosAtualizado, 
          {where:{...where},
          Transactionon: transacao
        });
        if (listadeRegistroAtualizado[0] === 0) {
            return false;
        }
        else{
            return true
        }
    };

       async excluiRegistro(id) {
     return dataSource[this.model].destroy({ where: { id: id } });
   }
    
}

module.exports = Services
