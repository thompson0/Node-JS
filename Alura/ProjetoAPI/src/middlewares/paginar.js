import RequisaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req,res,next) {
    try {
        let {limite = 5  , paginas = 1, ordenacao = "_id:-1"} = req.query;

        let [campoOrdenacao, ordem] =  ordenacao.split(":");
    
        limite = parseInt(limite);
        paginas = parseInt(paginas);  
        ordem = parseInt(ordem);
    
        const resultado = req.resultado;

        if(limite >0 && paginas>0){
          const resultadoPaginado = await resultado.find()
          .sort({ [campoOrdenacao] : ordem })
          .skip((paginas -1 ) * limite)
          .limit(limite)
          .exec();
          
          res.status(200).json(resultadoPaginado);
        } else{
          next(new RequisaoIncorreta())
        }
    } catch (erro) {
        next(erro);
    }
   
}

export default paginar




