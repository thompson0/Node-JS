import express from "express"
import AutorController from "../controllers/autorController.js"
import paginar from "../middlewares/paginar.js"

const routes = express.Router()

routes.get("/autores", AutorController.listarAutors, paginar)
routes.get("/autores/:id", AutorController.listaAutorPorId)
routes.post("/autores", AutorController.cadastrarAutor)
routes.put("/autores/:id", AutorController.atualizarAutor)
routes.delete("/autores/:id", AutorController.deletarAutor)

export default routes