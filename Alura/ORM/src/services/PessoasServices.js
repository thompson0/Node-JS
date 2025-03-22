const dataSource = require('../database/models/index.js')
const Services = require('./Services.js');

class PessoasServices extends Services{
    constructor() {
        super('Pessoa')
        this.matriculaServices = new Services('Matriculas')
    }
    async pegaMatriculasPorEstudante(id){
        const estudante = await super.pegaUmRegistro(id);
        const listaMatriculas = await estudante.getAulasMatriculadas();
        return listaMatriculas;
    }

    async pegaMatriculasTodos(id){
        const estudante = await super.pegaUmRegistroPorId(id);
        const listaMatriculas = await estudante.getTodasAsMatriculas();
        return listaMatriculas;
    }
    
    async pegaPessoasEscopoTodos(){
        const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistro');
        return listaPessoas
    }
    async cancelaPessoasEMatriculas(estudanteid){
        return dataSource.sequelize.transaction(async (transacao)=>{
        await super.atualizaRegistro({ativo :false}, {id: estudanteid}, transacao)
        await this.matriculaServices.atualizaRegistro({ status:'cancelado' },
            {estudante_id: x }, {transacao});
        });
        
    }
    
}
module.exports = PessoasServices;
