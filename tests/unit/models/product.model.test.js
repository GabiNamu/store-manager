const { expect } = require("chai");
const sinon = require("sinon");
const connection = require('../../../src/models/connection');
const { productModel } = require("../../../src/models");
const { listProduct, newProduct, getProductByName } = require("./mocks/product.model.mock");

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
  
  it("Atualizando um produto", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    // Act
    const result = await productModel.update(newProduct.name, newProduct.id);
    // Assert
    expect(result).to.equal(1);
  });

  it("Recuperando um produto a partir do seu nome", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([getProductByName]);
    // Act
    const result = await productModel.findByName('marte');
    // Assert
    expect(result).to.be.deep.equal(getProductByName);
  });

  // it("deletando um produto", async function () {
  //   // Arrange
  //   sinon.stub(connection, "execute").resolves([getProductByName]);
  //   // Act
  //   const result = await productModel.findByName("marte");
  //   // Assert
  //   expect(result).to.be.deep.equal(getProductByName);
  // });

  afterEach(function () {
    sinon.restore();
  });
});
