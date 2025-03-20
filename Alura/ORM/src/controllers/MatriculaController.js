const Controller = require('./Controller.js')
const MatriculasServices = require('../services/MatriculasServices.js')
const matriculasService = new MatriculasServices()
class MatriculaController  extends Controller {
    constructor(){
        super(matriculasService)
    }
 
};

module.exports = MatriculaController;