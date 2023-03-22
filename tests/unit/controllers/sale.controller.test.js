const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { saleService } = require("../../../src/services");
const { saleController } = require("../../../src/controllers");
const { listSales, listSalesId } = require("./mocks/sale.controller.mock");

describe('Teste de unidade do saleController', function () {
  describe('Listando vendas', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, 'findAll')
        .resolves({ type: null, message: listSales });

      // act
      await saleController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listSales);
    });
  });

  describe("Buscando uma venda", function () {
    it("deve responder com 200 e os dados do banco quando existir", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(saleService, "findById")
        .resolves({ type: null, message: [listSalesId] });

      // Act
      await saleController.findById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith([listSalesId]);
    });

    it("ao passar um id inválido deve retornar um erro", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: "abc" }, // passamos aqui um id inválido para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido.
      sinon
        .stub(saleService, "findById")
        .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });

      // Act
      await saleController.findById(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 422
      expect(res.status).to.have.been.calledWith(422);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({
        message: '"id" must be a number',
      });
    });

    it("ao passar um id que não existe no banco deve retornar um erro", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 9999 }, // passamos aqui um id fictício para forçar o erro esperado
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // Definimos o dublê do service retornando o contrato definido para esse cenário
      sinon.stub(saleService, "findById").resolves({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });

      // Act
      await saleController.findById(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});
