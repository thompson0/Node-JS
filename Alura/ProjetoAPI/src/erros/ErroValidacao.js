import RequisaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisaoIncorreta {
    constructor(erro) {
        const mensagensErro= Object.values(erro.errors)
        .map(erro => erro.message)
        .join("; ")
        super(`Os seguintes erros foram encontrados ${mensagensErro}`);
    }
}
export default ErroValidacao;