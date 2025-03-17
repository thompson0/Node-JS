import ErroBase from "./ErroBase.js";

class RequisaoIncorreta extends ErroBase {
    constructor(mensagem ="Um ou mais dados estao incorretos" ) {
        super(mensagem, 400)
    }
}
export default RequisaoIncorreta;