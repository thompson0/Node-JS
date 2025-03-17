import express from "express"
import routes from "./routes/index.js"
import db from "./config/dbconnect.js"
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js"
import manipulador404 from "./middlewares/manipulador404.js"

const conexao = db

conexao.on("error", (erro)=>{
  console.error("erro de conexao \n", erro)
})

conexao.once("open", ()=>{
  console.log("conexao feita com sucesso")
})

const app = express()
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros)

export default app



