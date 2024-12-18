const utilizacaoController = require('../controllers/utilizacaoController');

describe('Utilização Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    utilizacaoController.__setUtilizacoes([]);
  });

  test('Deve criar uma nova utilização com sucesso', () => {
    req.body = { motoristaId: 1, automovelId: 1, motivo: 'Viagem a trabalho' };

    utilizacaoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(Number),
      motoristaId: 1,
      automovelId: 1,
      motivo: 'Viagem a trabalho',
      dataFim: null,
    }));
  });

  test('Deve retornar erro ao tentar utilizar um automóvel já em uso', () => {
    utilizacaoController.__setUtilizacoes([
      { id: 1, motoristaId: 1, automovelId: 1, motivo: 'Uso existente', dataInicio: new Date(), dataFim: null },
    ]);

    req.body = { motoristaId: 2, automovelId: 1, motivo: 'Tentativa de uso' };

    utilizacaoController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'O automóvel já está em uso!' });
  });
});
