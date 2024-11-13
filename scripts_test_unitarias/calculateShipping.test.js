describe('calculateShipping ', () => {
    let req;
    let config;

    beforeEach(() => {
        req = { session: { totalCartAmount: 1000 } };
        config = {
            freeThreshold: 500,
            domesticShippingAmount: 50,
            internationalShippingAmount: 100,
            shippingFromCountry: 'US',
        };
    });

    // Prueba que debería pasar
    test('(1) Es una suscripción (envío gratuito)', () => {
        req.session.cartSubscription = true;

        calculateShipping(400, config, req);

        expect(req.session.shippingMessage).toBe('FREE shipping');
        expect(req.session.totalCartShipping).toBe(0);
        expect(req.session.totalCartAmount).toBe(1000); // totalCartAmount no cambia
    });

    // Prueba que debería fallar intencionalmente (mensaje incorrecto)
    test('(1) Es una suscripción (envío gratuito) - fallo intencional', () => {
        req.session.cartSubscription = true;

        calculateShipping(400, config, req);

        // Provocamos un fallo esperando un mensaje incorrecto
        expect(req.session.shippingMessage).toBe('Free Shipping'); // Debería ser 'FREE shipping'
    });

    // Prueba que debería pasar
    test('(3) Monto mayor o igual al umbral de envío gratuito', () => {
        req.session.cartSubscription = false;

        calculateShipping(600, config, req);

        expect(req.session.shippingMessage).toBe('FREE shipping');
        expect(req.session.totalCartShipping).toBe(0);
        expect(req.session.totalCartAmount).toBe(1000); // totalCartAmount no cambia
    });

    // Prueba que debería pasar
    test('(5) No hay país configurado (estimación de envío)', () => {
        req.session.cartSubscription = false;
        req.session.customerCountry = undefined;

        calculateShipping(400, config, req);

        expect(req.session.shippingMessage).toBe('Estimated shipping');
        expect(req.session.totalCartShipping).toBe(config.domesticShippingAmount);
        expect(req.session.totalCartAmount).toBe(400 + config.domesticShippingAmount);
    });

    // Prueba que debería fallar intencionalmente (totalCartShipping incorrecto)
    test('(3) Monto mayor o igual al umbral de envío gratuito - fallo intencional', () => {
        req.session.cartSubscription = false;

        calculateShipping(600, config, req);

        // Provocamos un fallo esperando un totalCartShipping incorrecto
        expect(req.session.totalCartShipping).toBe(10); // Debería ser 0
    });

    // Prueba que debería pasar
    test('(6) Envío internacional (país diferente)', () => {
        req.session.cartSubscription = false;
        req.session.customerCountry = 'CA';

        calculateShipping(400, config, req);

        expect(req.session.shippingMessage).toBe('International shipping');
        expect(req.session.totalCartShipping).toBe(config.internationalShippingAmount);
        expect(req.session.totalCartAmount).toBe(400 + config.internationalShippingAmount);
    });

    // Prueba que debería fallar intencionalmente (totalCartAmount incorrecto)
    test('(6) Envío internacional (país diferente) - fallo intencional', () => {
        req.session.cartSubscription = false;
        req.session.customerCountry = 'CA';

        calculateShipping(400, config, req);

        // Provocamos un fallo esperando un totalCartAmount incorrecto
        expect(req.session.totalCartAmount).toBe(500); // Debería ser 400 + config.internationalShippingAmount
    });
});
