const { expect } = require("chai");
const sinon = require("sinon");
const connection = require('../../../src/models/connection');
const { productModel } = require("../../../src/models");
const { listProduct, newProduct } = require("./mocks/product.model.mock");

describe("Product Model", function () {
  it("Recuperando a lista de produtos", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([listProduct]);
    // Act
    const result = await productModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(listProduct);
  });

  it("Recuperando um produto a partir do seu id", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([[listProduct[0]]]);
    // Act
    const result = await productModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(listProduct[0]);
  });

 it("Cadastrando um produto", async function () {
   // Arrange
   sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
   // Act
   const result = await productModel.insert(newProduct);
   // Assert
   expect(result).to.equal(1);
 });

  afterEach(function () {
    sinon.restore();
  });
});
