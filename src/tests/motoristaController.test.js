const motoristaController = require('../controllers/motoristaController');

describe('Motorista Controller', () => {
  let req, res;

  beforeEach(() => {
    // Simula os objetos req e res
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    // Limpa o banco em memória
    motoristaController.__setMotoristas([]);
  });

  test('Deve criar um novo motorista com sucesso', () => {
    req.body = { nome: 'João Silva' };

    motoristaController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(Number),
      nome: 'João Silva',
    }));
  });

  test('Deve retornar erro ao criar motorista sem campo obrigatório', () => {
    req.body = {};

    motoristaController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'O campo "nome" é obrigatório!' });
  });

  test('Deve retornar erro ao buscar motorista com ID inválido', () => {
    req.params = { id: 'abc' };

    motoristaController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'ID inválido!' });
  });

  test('Deve retornar erro ao buscar motorista inexistente', () => {
    req.params = { id: '99' };

    motoristaController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Motorista não encontrado!' });
  });

  test('Deve atualizar motorista com sucesso', () => {
    motoristaController.__setMotoristas([{ id: 1, nome: 'João Silva' }]);
    req.params = { id: '1' };
    req.body = { nome: 'João Carlos Silva' };

    motoristaController.update(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      nome: 'João Carlos Silva',
    }));
  });

  test('Deve remover motorista com sucesso', () => {
    motoristaController.__setMotoristas([{ id: 1, nome: 'João Silva' }]);
    req.params = { id: '1' };

    motoristaController.remove(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});


