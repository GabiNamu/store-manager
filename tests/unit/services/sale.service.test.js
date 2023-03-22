const { expect } = require("chai");
const sinon = require("sinon");
const { saleService } = require("../../../src/services");
const { saleModel } = require("../../../src/models");
const { listSales, listSalesId } = require("./mocks/sale.service.mock");

describe("Sale service", function () {
  it("Recuperando a lista de vendas", async function () {
      sinon.stub(saleModel, "findAll").resolves(listSales);

      const result = await saleService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(listSales);
  });

  describe("busca de uma venda", function () {
    it("retorna um erro caso receba um ID inválido", async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await saleService.findById("a");

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("retorna um erro caso o produto não exista", async function () {
      // arrange
      sinon.stub(saleModel, "findById").resolves([]);

      // act
      const result = await saleService.findById(1);

      // assert
      expect(result.type).to.equal("SALE_NOT_FOUND");
      expect(result.message).to.equal("Sale not found");
    });

    it("Recuperando uma venda a partir do seu id", async function () {
      // arrange
      sinon.stub(saleModel, "findById").resolves([listSalesId]);

      // act
      const result = await saleService.findById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal([listSalesId]);
    });
  });

  describe("cadastro de uma venda com valores inválidos", function () {
    it("retorna um erro ao passar um nome inválido", async function () {
      // arrange: Novamente não precisamos de um arranjo pois esse é um fluxo que não chama o model!

      // act
      const result = await saleService.insert([
        {
          productId: 0,
          quantity: 1,
        },
      ]);

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal(
        '"productId" must be greater than or equal to 1'
      );
    });
  });

  describe("cadastro de um produto com valores válidos", function () {
    it("retorna o ID do produto cadastrada", async function () {
      // arrange
      sinon.stub(saleModel, "insert").resolves(1);
      sinon.stub(saleModel, "findById").resolves([
  {
    productId: 1,
    quantity: 1,
  },
]);

      // act
      const result = await saleService.insert([
        {
          productId: 1,
          quantity: 1,
        },
      ]);

      // assert
      expect(result.type).to.equal(null);
    //   expect(result.message).to.deep.equal(
    //     {
    //       id: 1,
    //     itemsSold: [{
    //       productId: 1,
    //       quantity: 1,
    //     },
    //   ]});
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});