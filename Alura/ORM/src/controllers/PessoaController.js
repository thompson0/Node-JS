const Controller = require('./Controller.js')
const PessoasServices = require('../services/PessoasServices.js')
const pessoaService = new PessoasServices()
class PessoaController  extends Controller {
    constructor(){
        super(pessoaService)
    }
 
};

module.exports = PessoaController;