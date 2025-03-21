const Services = require('./Services.js');

class PessoasServices extends Services{
    constructor() {
        super('Pessoa')
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
    
}
module.exports = PessoasServices;
