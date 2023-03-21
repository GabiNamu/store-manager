const { expect } = require("chai");
const sinon = require("sinon");
const { productService } = require("../../../src/services");
const { productModel } = require("../../../src/models");

const { listProduct } = require("./mocks/product.service.mock");

describe("Verificando service de produtos", function () {
  describe("listagem de produtos", function () {
    it("retorna a lista completa de produtos", async function () {
      // arrange
      sinon.stub(productModel, "findAll").resolves(listProduct);

      // act
      const result = await productService.findAll();

      // assert
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(listProduct);
    });
  });

  describe("busca de um produto", function () {
    it("retorna um erro caso receba um ID inválido", async function () {
      // arrange: Especificamente nesse it não temos um arranjo pois nesse fluxo o model não é chamado!

      // act
      const result = await productService.findById("a");

      // assert
      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"id" must be a number');
    });

    it("retorna um erro caso o produto não exista", async function () {
      // arrange
      sinon.stub(productModel, "findById").resolves(undefined);

      // act
      const result = await productService.findById(1);

      // assert
      expect(result.type).to.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.equal("Product not found");
    });

    it("retorna o produto caso o ID existenta", async function () {
      // arrange
      sinon.stub(productModel, "findById").resolves(listProduct[0]);

      // act
      const result = await productService.findById(1);

      // assert
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(listProduct[0]);
    });
  });


  afterEach(function () {
    sinon.restore();
  });
});