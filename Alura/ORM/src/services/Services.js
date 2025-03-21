const dataSource = require ('../database/models/index.js')

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;

    }
    async pegaTodosOsRegistro(){
        return dataSource[this.model].findAll()
    }
    async pegaRegistrosPorEscopo(escopo){
      return dataSource[this.model].scope(escopo).findAll()
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

    async atualizaRegistro(dadosAtualizado, where){
        const listadeRegistroAtualizado = dataSource[this.model].update(dadosAtualizado, {where:{...where}
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
