const _ = require('lodash');

// Mocks de base de datos y getMenu
const mockDb = {
  menu: {
    updateOne: jest.fn()
  }
};

const getMenu = jest.fn();

const orderMenu = (req, res) => {
  const db = req.app.db;
  return getMenu(db)
    .then((menu) => {
      const menuOrder = req.body['order[]'];
      // Actualizar el orden en base al arreglo menuOrder
      for (let i = 0; i < menuOrder.length; i++) {
        const item = _.find(menu.items, ['title', menuOrder[i]]);
        if (item) item.order = i;
      }
      return db.menu.updateOne({}, { $set: { items: menu.items } }, { upsert: true })
        .then(() => true)
        .catch(() => false);
    })
    .catch(() => false);
};

describe('orderMenu function', () => {
  let req;
  let res;

  beforeEach(() => {
    req = { app: { db: mockDb }, body: {} };
    res = {};
    jest.clearAllMocks();
  });

  test('Cero iteraciones - menuOrder vacío', async () => {
    // Simular un menú con items pero un arreglo order vacío
    req.body['order[]'] = [];
    getMenu.mockResolvedValue({ items: [{ title: 'item1' }, { title: 'item2' }] });
    mockDb.menu.updateOne.mockResolvedValue({});

    const result = await orderMenu(req, res);

    expect(getMenu).toHaveBeenCalledWith(mockDb);
    expect(mockDb.menu.updateOne).toHaveBeenCalledWith(
      {},
      { $set: { items: [{ title: 'item1' }, { title: 'item2' }] } },
      { upsert: true }
    );
    expect(result).toBe(true);
  });

  test('Una iteración - menuOrder con un solo elemento', async () => {
    // Simular un menú con un solo item en order
    req.body['order[]'] = ['item1'];
    getMenu.mockResolvedValue({ items: [{ title: 'item1' }, { title: 'item2' }] });
    mockDb.menu.updateOne.mockResolvedValue({});

    const result = await orderMenu(req, res);

    expect(getMenu).toHaveBeenCalledWith(mockDb);
    expect(mockDb.menu.updateOne).toHaveBeenCalledWith(
      {},
      { $set: { items: [{ title: 'item1', order: 0 }, { title: 'item2' }] } },
      { upsert: true }
    );
    expect(result).toBe(true);
  });

  test('Más de una iteración - menuOrder con varios elementos', async () => {
    // Simular un menú con múltiples elementos en order
    req.body['order[]'] = ['item1', 'item2'];
    getMenu.mockResolvedValue({ items: [{ title: 'item1' }, { title: 'item2' }] });
    mockDb.menu.updateOne.mockResolvedValue({});

    const result = await orderMenu(req, res);

    expect(getMenu).toHaveBeenCalledWith(mockDb);
    expect(mockDb.menu.updateOne).toHaveBeenCalledWith(
      {},
      { $set: { items: [{ title: 'item1', order: 0 }, { title: 'item2', order: 1 }] } },
      { upsert: true }
    );
    expect(result).toBe(true);
  });

  test('Título no encontrado en menu.items', async () => {
    // Simular un caso donde un elemento en order no está en menu.items
    req.body['order[]'] = ['item3'];  // 'item3' no existe en items
    getMenu.mockResolvedValue({ items: [{ title: 'item1' }, { title: 'item2' }] });
    mockDb.menu.updateOne.mockResolvedValue({});

    const result = await orderMenu(req, res);

    expect(getMenu).toHaveBeenCalledWith(mockDb);
    expect(mockDb.menu.updateOne).toHaveBeenCalledWith(
      {},
      { $set: { items: [{ title: 'item1' }, { title: 'item2' }] } },
      { upsert: true }
    );
    expect(result).toBe(true);
  });

  test('Menú vacío - menu.items vacío', async () => {
    // Simular un caso donde menu.items está vacío
    req.body['order[]'] = ['item1', 'item2'];
    getMenu.mockResolvedValue({ items: [] });
    mockDb.menu.updateOne.mockResolvedValue({});

    const result = await orderMenu(req, res);

    expect(getMenu).toHaveBeenCalledWith(mockDb);
    expect(mockDb.menu.updateOne).toHaveBeenCalledWith(
      {},
      { $set: { items: [] } },
      { upsert: true }
    );
    expect(result).toBe(true);
  });
});
