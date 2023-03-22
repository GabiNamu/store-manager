const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { saleModel } = require("../../../src/models");
const {
  listSales, listSalesId,
} = require("./mocks/sale.model.mock");

describe("Sale Model", function () {
  it("Recuperando a lista de vendas", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([listSales]);
    // Act
    const result = await saleModel.findAll();
    // Assert
    expect(result).to.be.deep.equal(listSales);
  });

  it("Recuperando uma venda a partir do seu id", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([listSalesId]);
    // Act
    const result = await saleModel.findById(1);
    // Assert
    expect(result).to.be.deep.equal(listSalesId);
  });

  it("Cadastrando uma venda", async function () {
    // Arrange
    sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);
    // Act
    const result = await saleModel.insert();
    // Assert
    expect(result).to.equal(1);
  });

  afterEach(function () {
    sinon.restore();
  });
});
