// Supongamos que tenemos la función getSort() y una función mock para getConfig().
const getConfig = jest.fn();

const getSort = () => {
    const config = getConfig();
    let sortOrder = -1;
    if(config.productOrder === 'ascending'){
        sortOrder = 1;
    }
    let sortField = 'productAddedDate';
    if(config.productOrderBy === 'title'){
        sortField = 'productTitle';
    }

    return {
        [sortField]: sortOrder
    };
};

// Casos de prueba en Jest

describe('getSort function', () => {
    test('should return ascending order when productOrder is "ascending"', () => {
        // Mock de getConfig para simular un "ascending"
        getConfig.mockReturnValue({
            productOrder: 'ascending',
            productOrderBy: 'title'
        });

        const result = getSort();
        expect(result).toEqual({ productTitle: 1 });  // Orden ascendente por título
    });

    test('should return descending order when productOrder is not "ascending"', () => {
        // Mock de getConfig para simular un "descending" (por defecto)
        getConfig.mockReturnValue({
            productOrder: 'descending',
            productOrderBy: 'title'
        });

        const result = getSort();
        expect(result).toEqual({ productTitle: -1 });  // Orden descendente por título
    });

    test('should return ascending order when productOrder is "ascending" and order by "productAddedDate"', () => {
        // Mock de getConfig para simular un "ascending" y ordenar por fecha de adición
        getConfig.mockReturnValue({
            productOrder: 'ascending',
            productOrderBy: 'productAddedDate'
        });

        const result = getSort();
        expect(result).toEqual({ productAddedDate: 1 });  // Orden ascendente por fecha de adición
    });

    test('should return descending order when productOrder is not "ascending" and order by "productAddedDate"', () => {
        // Mock de getConfig para simular un "descending" y ordenar por fecha de adición
        getConfig.mockReturnValue({
            productOrder: 'descending',
            productOrderBy: 'productAddedDate'
        });

        const result = getSort();
        expect(result).toEqual({ productAddedDate: -1 });  // Orden descendente por fecha de adición
    });

    test('should return descending order when productOrder is "descending" and order by "title"', () => {
        // Mock de getConfig para simular un "descending" y ordenar por título
        getConfig.mockReturnValue({
            productOrder: 'descending',
            productOrderBy: 'title'
        });

        const result = getSort();
        expect(result).toEqual({ productTitle: -1 });  // Orden descendente por título
    });
});
