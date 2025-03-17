import {autor, livro} from "../models/index.js";
import NaoEncotrado from "../erros/NaoEncotrado.js";

class LivroController {
  
  static async listarLivros(req, res, next) {
    try {
   
    const buscalivros = livro.find()

    req.resultado = buscalivros;

    next();
    

     
    } catch (erro) {
      next(erro);
    }
  }

  static async listaLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
         if (livroEncontrado !== null) {
              res.status(200).json(livroEncontrado)
            }
            else{
              next(new NaoEncotrado("falha na requicao do livro"));
            }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novolivro = req.body;
    try {
      const autor = await autor.findById(novolivro.autor);
      if (!autor) {
        return res.status(404).json({ message: "Autor não encontrado" });
      }
      const livroCompleto = { ...novolivro, autor: { ...autor._doc } };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Livro criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if (livroEncontrado !== null) {
        res.status(200).json({message:"livro atualizado"})
      }
      else{
        next(new NaoEncotrado("falha na requicao do livro"));
      }

    } catch (erro) {
      next(erro);
    }
  }

  static async deletarlivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id, req.body);
      if (livroEncontrado !== null) {
        res.status(200).json({message:"livro deletado"})
      }
      else{
        next(new NaoEncotrado("falha na requicao do livro"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

       if (busca !== null) {
        const livrosPorResultado =  livro
        .find(busca)
        .populate("autores");  

        req.resultado = livrosPorResultado;
        next() 
       }
       else {
       res.status(200).send([]);
       }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas; 

  if (nomeAutor) {
    const autores = await autor.findOne({nome: nomeAutor });

    if (autores !==null){
      busca.autores = autores._id;
    }
    else {
      busca = null
    }


 
  }

  return busca;
}

export default LivroController;