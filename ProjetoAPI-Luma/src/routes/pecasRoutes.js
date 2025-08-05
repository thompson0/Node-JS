import express from "express";
import PecasController from "../controllers/pecasController.js";

const routes = express.Router();

routes.get("/pecas", PecasController.listarPecas);
routes.get("/pecas/:codigo", PecasController.listarPecasPorId);
routes.post("/pecas", PecasController.cadastrarPecas);
routes.put("/pecas/:codigo", PecasController.atualizarPecas);
routes.delete("/pecas/:codigo", PecasController.deletarPecas);

export default routes;
