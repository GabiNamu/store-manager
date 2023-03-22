const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = chai;
chai.use(sinonChai);

const { productService } = require("../../../src/services");
const { productController } = require("../../../src/controllers");
const { listProduct } = require("./mocks/prouct.controller.mock");

describe('Teste de unidade do passengerController', function () {
  describe('Listando produtos', function () {
    it('Deve retornar o status 200 e a lista', async function () {
      // arrange
      const res = {};
      const req = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, 'findAll')
        .resolves({ type: null, message: listProduct });

      // act
      await productController.findAll(req, res);

      // assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listProduct);
    });
  });

  describe("Buscando um produto", function () {
    it("deve responder com 200 e os dados do banco quando existir", async function () {
      // Arrange
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productService, "findById")
        .resolves({ type: null, message: listProduct[0] });

      // Act
      await productController.findById(req, res);

      // Assert
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(listProduct[0]);
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
        .stub(productService, "findById")
        .resolves({ type: "INVALID_VALUE", message: '"id" must be a number' });

      // Act
      await productController.findById(req, res);

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
      sinon
        .stub(productService, "findById")
        .resolves({
          type: "PRODUCT_NOT_FOUND",
          message: "Product not found",
        });

      // Act
      await productController.findById(req, res);

      // Assert
      // Avaliamos se chamou `res.status` com o valor 404
      expect(res.status).to.have.been.calledWith(404);
      // Avaliamos se chamou `res.status` com a mensagem esperada
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });
  });

  describe("Cadastrando um novo produto", function () {
    it("ao enviar dados válidos deve salvar com sucesso!", async function () {
      // Arrange
      const res = {};
      // Aqui o mock do objeto req, atribui o objeto `passengerMock` ao atributo body
      const req = {
        body: {
          name: "Martelo de Thor",
        },
      };

      /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      /* Definimos um dublê para `passengerService.createPassenger` para retornar o objeto
      de uma pessoa passageira com o id. */
      sinon
        .stub(productService, "insert")
        .resolves({ type: null, message: listProduct[0] });

      // Act
      await productController.insert(req, res);

      // Assert
      /* Fazemos a asserção para garantir que o status retornado vai ser 201
      e que o json é o objeto newPassengerMock. */
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(listProduct[0]);
    });

    it("ao enviar um nome com menos de 5 caracteres deve retornar um erro!", async function () {
      // Arrange
      const res = {};
      /* Aqui mudamos o dublê de req.body com um valor inválido para o campo name */
      const req = {
        body: {
          name: "Zé",
        },
      };

      /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      /* Definimos um dublê para `passengerService.createPassenger` para retornar o erro
      no contrato estabelecido na camada Service */
      sinon
        .stub(productService, "insert")
        .resolves({
          type: "INVALID_VALUE",
          message: '"name" length must be at least 5 characters long',
        });

      // Act
      await productController.insert(req, res);

      // Assert
      /* O status HTTP retornado deve ser 422 */
      expect(res.status).to.have.been.calledWith(422);
      /* Ajustamos a mensagem de erro esperada para ser a mensagem gerada pelo service */
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long',
      });
    });
  });

    describe("atualizando um novo produto", function () {
      it("ao enviar dados válidos deve salvar com sucesso!", async function () {
        // Arrange
        const res = {};
        // Aqui o mock do objeto req, atribui o objeto `passengerMock` ao atributo body
        const req = {
          body: {
            name: "Martelo de Thor",
          },
          params: {
            id: 1,
          }
        };

        /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        /* Definimos um dublê para `passengerService.createPassenger` para retornar o objeto
      de uma pessoa passageira com o id. */
        sinon
          .stub(productService, "update")
          .resolves({ type: null, message: listProduct[0] });

        // Act
        await productController.update(req, res);

        // Assert
        /* Fazemos a asserção para garantir que o status retornado vai ser 201
      e que o json é o objeto newPassengerMock. */
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(listProduct[0]);
      });

      it("ao enviar um nome com menos de 5 caracteres deve retornar um erro!", async function () {
        // Arrange
        const res = {};
        /* Aqui mudamos o dublê de req.body com um valor inválido para o campo name */
        const req = {
          body: {
            name: "Zé",
          },
          params: {
            id: 1,
          },
        };

        /* O dublê de `res.status` e `res.json` é o mesmo padrão que já fizemos anteriormente */
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        /* Definimos um dublê para `passengerService.createPassenger` para retornar o erro
      no contrato estabelecido na camada Service */
        sinon.stub(productService, "update").resolves({
          type: "INVALID_VALUE",
          message: '"name" length must be at least 5 characters long',
        });

        // Act
        await productController.update(req, res);

        // Assert
        /* O status HTTP retornado deve ser 422 */
        expect(res.status).to.have.been.calledWith(422);
        /* Ajustamos a mensagem de erro esperada para ser a mensagem gerada pelo service */
        expect(res.json).to.have.been.calledWith({
          message: '"name" length must be at least 5 characters long',
        });
      });
    });
  afterEach(function () {
    sinon.restore();
  });
});