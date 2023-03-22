const { expect } = require("chai");
const sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { saleModel, saleProductModel } = require("../../../src/models");
const { listSales, listSalesId, listSaleProducts } = require("./mocks/sale.model.mock");

describe("SaleProduct Model", function () {
   it("Recuperando uma venda a partir do seu id", async function () {
     // Arrange
     sinon.stub(connection, "execute").resolves([listSaleProducts]);
     // Act
     const result = await saleProductModel.findById(1);
     // Assert
     expect(result).to.be.deep.equal(listSaleProducts);
   });
});