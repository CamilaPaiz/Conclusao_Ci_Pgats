export default class ServicoDePagamento {
  #pagamentos;

  constructor() {
    this.#pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    this.#pagamentos.push({
      codigoBarras,
      empresa,
      valor,
      categoria: valor > 100.0 ? 'cara' : 'padrão'
    });
  }

  consultarUltimoPagamento() {
    return this.#pagamentos;
  }
}


