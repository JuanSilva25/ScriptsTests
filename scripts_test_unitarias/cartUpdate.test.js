// Simulando jQuery en un entorno de prueba usando jsdom
const $ = require('jquery');

// Función a probar
function cartUpdate(element) {
    if ($(element).val() > 0) {
        if ($(element).val() !== '') {
            updateCart(element);
        }
    } else {
        $(element).val(1);
    }
}

// Simulando la función updateCart
const updateCart = jest.fn();

describe('cartUpdate', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Caso 1: $(element).val() > 0 y no es una cadena vacía', () => {
        // Simulando un input con valor mayor a 0
        const element = $('<input>').val(2); // Valor mayor a 0
        cartUpdate(element);
        
        // Verifica que se haya llamado a updateCart
        expect(updateCart).toHaveBeenCalledWith(element);
    });

    test('Caso 2: $(element).val() <= 0', () => {
        const element = $('<input>').val(0); // Valor igual a 0
        cartUpdate(element);
        
        // Verifica que el valor se establezca en 1
        expect($(element).val()).toBe(1);
        expect(updateCart).not.toHaveBeenCalled();
    });

    test('Caso 3: $(element).val() > 0 pero es una cadena vacía', () => {
        const element = $('<input>').val(''); // Cadena vacía
        cartUpdate(element);
        
        // Verifica que no se llame a updateCart
        expect(updateCart).not.toHaveBeenCalled();
    });

    test('Caso 4: $(element).val() > 0 y no es una cadena vacía (otro valor)', () => {
        const element = $('<input>').val(5); // Otro valor mayor a 0
        cartUpdate(element);
        
        // Verifica que se haya llamado a updateCart
        expect(updateCart).toHaveBeenCalledWith(element);
    });
});