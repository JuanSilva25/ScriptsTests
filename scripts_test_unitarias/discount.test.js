const calculateDiscount = (discount, req) => {
    let discountAmount = 0;
    if (req.session.discountCode) {
        if (discount.type === 'amount') {
            discountAmount = discount.value;
        }
        if (discount.type === 'percent') {
            discountAmount = (discount.value / 100) * req.session.totalCartNetAmount;
        }
    }

    req.session.totalCartDiscount = discountAmount;
};

describe('calculateDiscount', () => {
    let req;

    beforeEach(() => {
        req = { session: {} };
    });

    test('(1) No hay código de descuento en la sesión', () => {
        req.session.discountCode = undefined;
        req.session.totalCartNetAmount = 1000;

        calculateDiscount({ type: 'amount', value: 100 }, req);

        expect(req.session.totalCartDiscount).toBe(0);
    });

    test('(2) Descuento de tipo monto fijo', () => {
        req.session.discountCode = 'DISCOUNT10';
        req.session.totalCartNetAmount = 1000;

        calculateDiscount({ type: 'amount', value: 100 }, req);

        expect(req.session.totalCartDiscount).toBe(100);
    });

    test('(3) Descuento de tipo porcentaje', () => {
        req.session.discountCode = 'DISCOUNT20';
        req.session.totalCartNetAmount = 1000;

        calculateDiscount({ type: 'percent', value: 20 }, req);

        expect(req.session.totalCartDiscount).toBe(200);  // 20% de 1000 es 200
    });

    test('(4) Descuento con tipo desconocido', () => {
        req.session.discountCode = 'DISCOUNTUNK';
        req.session.totalCartNetAmount = 1000;

        calculateDiscount({ type: 'unknown', value: 100 }, req);

        expect(req.session.totalCartDiscount).toBe(0);
    });

    test('(5) Sin código de descuento en la sesión (descuento no aplicado)', () => {
        req.session.discountCode = null;
        req.session.totalCartNetAmount = 1000;

        calculateDiscount({ type: 'amount', value: 100 }, req);

        expect(req.session.totalCartDiscount).toBe(0);
    });

    test('(6) Descuento fijo de monto, aplica valor fijo', () => {
        req.session.discountCode = 'FIXEDAMOUNT';
        req.session.totalCartNetAmount = 1000;

        calculateDiscount({ type: 'amount', value: 150 }, req);

        expect(req.session.totalCartDiscount).toBe(150);
    });

    test('(7) Aplica descuento de monto fijo', () => {
        req.session.discountCode = 'FIXED';
        req.session.totalCartNetAmount = 1000;

        calculateDiscount({ type: 'amount', value: 300 }, req);

        expect(req.session.totalCartDiscount).toBe(300);
    });

    test('(8) Aplica descuento de porcentaje', () => {
        req.session.discountCode = 'PERCENT20';
        req.session.totalCartNetAmount = 500;

        calculateDiscount({ type: 'percent', value: 20 }, req);

        expect(req.session.totalCartDiscount).toBe(100);  // 20% de 500 es 100
    });

    test('(9) Descuento no reconocido, no se aplica', () => {
        req.session.discountCode = 'UNKNOWN';
        req.session.totalCartNetAmount = 500;

        calculateDiscount({ type: 'other', value: 50 }, req);

        expect(req.session.totalCartDiscount).toBe(0);
    });

    test('(10) Aplica el descuento sobre el monto del carrito', () => {
        req.session.discountCode = 'PERCENT10';
        req.session.totalCartNetAmount = 2000;

        calculateDiscount({ type: 'percent', value: 10 }, req);

        expect(req.session.totalCartDiscount).toBe(200);  // 10% de 2000 es 200
    });

    test('(11) Monto del carrito no definido, no se aplica descuento', () => {
        req.session.discountCode = 'PERCENT10';
        req.session.totalCartNetAmount = undefined;

        calculateDiscount({ type: 'percent', value: 10 }, req);

        expect(req.session.totalCartDiscount).toBe(0);
    });
});
