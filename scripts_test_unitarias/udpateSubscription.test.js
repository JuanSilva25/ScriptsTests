const updateSubscriptionCheck = (req, res) => {
    if (!req.session.cart || req.session.cart.length === 0) {
        req.session.cartSubscription = null;
        return;
    }

    Object.keys(req.session.cart).forEach((item) => {
        if (req.session.cart[item].productSubscription) {
            req.session.cartSubscription = req.session.cart[item].productSubscription;
        } else {
            req.session.cartSubscription = null;
        }
    });
};

// Casos de prueba en Jest para cobertura de decisión
describe('updateSubscriptionCheck ', () => {
    let req, res;

    beforeEach(() => {
        req = { session: { cart: null, cartSubscription: null } };
        res = {};
    });
//PRIMER IF
    //(!req.session.cart || req.session.cart.length === 0)
    test('Caso 1: Carrito inexistente - Primera decisión verdadera', () => {
        req.session.cart = null;
        updateSubscriptionCheck(req, res);
        expect(req.session.cart).toEqual({});
    });

    test('Caso 2: Carrito vacío - Primera decisión verdadera', () => {
        req.session.cart = [];
        updateSubscriptionCheck(req, res);
        expect(req.session.cart).toBeNull();
    });

    test('Caso 3: Carrito con productos y suscripcion', () => {
        req.session.cart = [
            { productSubscription: 'sub1'}
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cart).not.toBeNull();
    });

    //(req.session.cart[item].productSubscription)
    test('Caso 4: Carrito con productos - Segunda decisión falsa', () => {
        req.session.cart = [
            { productSubscription: null }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBeNull();
    });


    test('Caso 5: Carrito con varios productos - Segunda decisión verdadera y falsa en la misma ejecución', () => {
        req.session.cart = [
            { productSubscription: 'sub3' },
            { productSubscription: null }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBe('sub2');
    });
    test('Caso 6: Carrito con varios productos - Segunda decisión verdadera y falsa en la misma ejecución', () => {
        req.session.cart = [
            { productSubscription: null },
            { productSubscription: 'sub2' }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBe('sub2');
    });
    test('Caso 7: Carrito con múltiples productos con suscripciones - Debería tomar la última suscripción', () => {
        req.session.cart = [
            { productSubscription: 'sub5' },
            { productSubscription: 'sub6' },
            { productSubscription: 'sub7' }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBe('sub7');
    });
    test('Caso 8: Carrito con varios productos sin suscripción - Segunda decisión verdadera y falsa en la misma ejecución', () => {
        req.session.cart = [
            { productSubscription: null },
            { productSubscription: null },
            { productSubscription: null }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBe('sub1');
    });
//SEGUNDO IF
/**YA TIENEN CASO DE PRUEBA
    test('Caso 9: Carrito con múltiples productos con suscripciones', () => {
        req.session.cart = [
            { productSubscription: 'sub5' },
            { productSubscription: 'sub6' },
            { productSubscription: 'sub7' }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBe('sub7');
    });

    test('Caso 10: Un producto sin suscripción', () => {
        req.session.cart = [
            { productSubscription: null },
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBe('sub9');
    });
    test('Caso 11: Carrito con productos - Segunda decisión falsa', () => {
        req.session.cart = [
            { productSubscription: null }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBeNull();
    });
    test('Caso 12: Carrito con varios productos sin suscripción - Segunda decisión verdadera y falsa en la misma ejecución', () => {
        req.session.cart = [
            { productSubscription: null },
            { productSubscription: null },
            { productSubscription: null }
        ];
        updateSubscriptionCheck(req, res);
        expect(req.session.cartSubscription).toBe('sub1');
    });
    **/

});