import express from "express";
import routes from "./routes/index.js";
import db from "./config/dbconnect.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const conexao = db;

conexao.on("error", (erro) => {
  console.error("erro de conexao \n", erro);
});

conexao.once("open", () => {
  console.log("conexao feita com sucesso");
});

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
routes(app);

app.get("/", (req, res) => {
  res.send("API Luma");
});

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cadastro.html'));
});
app.get('/deletar', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'deletar.html'));
});


app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
