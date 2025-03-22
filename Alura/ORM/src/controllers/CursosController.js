const {Op} = require('sequelize')

const Controller = require('./Controller.js')
const CursoServices = require('../services/CursosServices.js')
const cursoService = new CursoServices()
class CursoController  extends Controller {
    constructor(){
        super(cursoService)
    }
 
    async pegaCursos(req,res){
        const {data_inicio , data_final } = req.query;
        const where = {}
        data_inicio || data_final? where.data_inicio = {} :null
        data_inicio? where.data_inicio[Op.gte] = data_inicio : null
        data_final? where.data_final[Op.lte] = data_final : null
        try {
            const listaCursos = await cursoService.pegaTodosOsRegistro(where);
            return res.status(200).json(listaCursos)
        } catch (erro) {
            res.status(500).json({erro: erro.message})
        }
    }

};

module.exports = CursoController;