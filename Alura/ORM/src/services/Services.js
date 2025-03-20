const { where } = require('sequelize');
const dataSource = require ('../models/index.js')

class Services {
    constructor(nomeDoModel) {
        this.model = nomeDoModel;

    }
    async pegaTodosOsRegistro(){
        return dataSource[this.model].findAll()
    }
       async pegaUmRegistroPorId(id) {
     return dataSource[this.model].findByPk(id);
   }

   async criaRegistro(dadosDoRegistro) {
     return dataSource[this.model].create(dadosDoRegistro);
   }

    async atualizaRegistro(dadosAtualizado, id){
        const listadeRegistroAtualizado = dataSource[this.model].update(dadosAtualizado, {where:{id:id}
        })
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
