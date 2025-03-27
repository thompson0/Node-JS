import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://admin:admin@aluracluster.ahfeoxq.mongodb.net/")

let documentosColecao

try {
    await client.connect()

    const db = client.db("alura-websockets")
    documentosColecao = db.collection("documentos")

    console.log("conectado ao banco com sucesso")
} catch (erro) {
    console.log(erro)
}

export {documentosColecao};