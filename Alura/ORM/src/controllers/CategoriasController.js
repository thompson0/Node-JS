const Controller = require('./Controller.js')
const CategoriasServices = require('../services/CategoriasServices.js')
const categoriasService = new CategoriasServices()
class CategoriaController  extends Controller {
    constructor(){
        super(categoriasService)
    }
 
};

module.exports = CategoriaController;