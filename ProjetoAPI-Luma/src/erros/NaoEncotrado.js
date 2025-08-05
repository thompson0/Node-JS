import ErroBase from "./ErroBase.js";

class NaoEncotrado extends ErroBase {
    constructor(mensagem="Pagina nao encontrada") {
        super(mensagem, 404);
    }
}
export default NaoEncotrado;