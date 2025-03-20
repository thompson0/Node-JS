const Controller = require('./Controller.js')
const PessoasServices = require('../services/PessoasServices.js')
const pessoaService = new PessoasServices()
class PessoaController  extends Controller {
    constructor(){
        super(pessoaService)
    }
 

    async  pegaMatriculas(req,res) {
     const {estudanteid}  = req.params;
        
        try {
            const listaMatriculas = await pessoaService.pegaMatriculasPorEstudante(Number (estudanteid))
            return res.status(200).json(listaMatriculas)
        } catch (error) {
            
        }
    }
};

module.exports = PessoaController;