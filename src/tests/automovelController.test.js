const automovelController = require('../controllers/automovelController');

describe('Automóvel Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    automovelController.__setAutomoveis([]);
  });

  test('Deve criar um novo automóvel com sucesso', () => {
    req.body = { placa: 'ABC1234', cor: 'Preto', marca: 'Ford' };

    automovelController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      id: expect.any(Number),
      placa: 'ABC1234',
      cor: 'Preto',
      marca: 'Ford',
    }));
  });

  test('Deve retornar erro ao criar automóvel sem campos obrigatórios', () => {
    req.body = {};

    automovelController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Todos os campos são obrigatórios!' });
  });
});

