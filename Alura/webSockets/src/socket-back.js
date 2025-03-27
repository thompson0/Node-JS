import { adicionarDocumento, atualizaDocumento, encontrarDocumento, excluirDocumento, obterDocumentos } from "./documentosDb.js";
import io from "./servidor.js";



io.on("connection", (socket) => {
    socket.on("obter_documentos",async(devolverDocumentos)=>{
      const documentos = await obterDocumentos()

     devolverDocumentos(documentos)
    })
    
    socket.on("adicionar_documento", async (nome)=>{
      const documentoExiste = (await encontrarDocumento(nome)) !== null;

      if(documentoExiste){
        socket.emit("documento_existente", nome)
      }
      else{
        const resultado = await adicionarDocumento(nome)

        if(resultado.acknowledged){
          io.emit("adicionar_documento_inferface",nome)
        }
      }

      
    });

    socket.on("selecionar_documento", async (nomeDocumento, devolverTexto)=>{
      socket.join(nomeDocumento);
      
      const documento = await encontrarDocumento(nomeDocumento);
      if(documento){
        devolverTexto(documento.texto)

      }
    });

    socket.on("texto_editor", async ({texto, nomeDocumentos})=>{
      const atualizacao = await atualizaDocumento(nomeDocumentos,texto)
       if(atualizacao){
         socket.to(nomeDocumentos).emit("texto_editor_clientes",texto)
       }

    });
    socket.on("excluir_documento", async (nome)=>{
      const resultado = await excluirDocumento(nome)

      if(resultado.deletedCount){
        io.emit("excluir_documento_sucesso",nome)
      }
  }); 
});
