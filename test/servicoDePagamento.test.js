import ServicoDePagamento from '../src/ServicoDePagamento.js'; 
import assert from 'node:assert';

describe('Classe de Servico De Pagamento', function () {
  it('Validar registro de um pagamento com categoria cara quando valor for maior que 100', function () {
    // Arrange
    const servicoDePagamento = new ServicoDePagamento();
   
    //Act
    servicoDePagamento.pagar('0987-8656-3475', 'Xis', 187.87);
    const pagamento = servicoDePagamento.consultarUltimoPagamento();
    const meuUltimoPagamento = pagamento.at(-1);

    //Assert
    assert.equal(meuUltimoPagamento.codigoBarras, '0987-8656-3475');
    assert.equal(meuUltimoPagamento.empresa, 'Xis');
    assert.equal(meuUltimoPagamento.valor, 187.87);
    assert.equal(meuUltimoPagamento.categoria, 'cara');
  });

  it('Validar registro de um pagamento com categoria padrão quando valor for igual a 100', function () {
    //Arrange
    const servicoDePagamento = new ServicoDePagamento();

    //Act
    servicoDePagamento.pagar('1234-5678-9012', 'Empresa Y', 100.0);
    const pagamento = servicoDePagamento.consultarUltimoPagamento();
    const meuUltimoPagamento = pagamento.at(-1);
    
    //Assert
    assert.equal(meuUltimoPagamento.codigoBarras, '1234-5678-9012');
    assert.equal(meuUltimoPagamento.empresa, 'Empresa Y');
    assert.equal(meuUltimoPagamento.valor, 100.0);
    assert.equal(meuUltimoPagamento.categoria, 'padrão');
  });

   it('Validar registro de um pagamento com categoria padrão quando valor for menor que 100', function () {
    //Arrange
    const servicoDePagamento = new ServicoDePagamento();

    //Act
    servicoDePagamento.pagar('1234-5678-9512', 'Empresa X', 50.0);
    const pagamento = servicoDePagamento.consultarUltimoPagamento();
    const meuUltimoPagamento = pagamento.at(-1);

    //Assert
    assert.equal(meuUltimoPagamento.codigoBarras, '1234-5678-9512');
    assert.equal(meuUltimoPagamento.empresa, 'Empresa X');
    assert.equal(meuUltimoPagamento.valor, 50.0);
    assert.equal(meuUltimoPagamento.categoria, 'padrão');
  });
});
