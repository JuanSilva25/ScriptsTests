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

    test('(1) Es una suscripción (envío gratuito)', () => {
        req.session.cartSubscription = true;

        calculateShipping(400, config, req);

        expect(req.session.shippingMessage).toBe('FREE shipping');
        expect(req.session.totalCartShipping).toBe(0);
        expect(req.session.totalCartAmount).toBe(1000); // totalCartAmount no cambia
    });

    

    
    test('(3) Monto mayor o igual al umbral de envío gratuito', () => {
        req.session.cartSubscription = false;

        calculateShipping(600, config, req);

        expect(req.session.shippingMessage).toBe('FREE shipping');
        expect(req.session.totalCartShipping).toBe(0);
        expect(req.session.totalCartAmount).toBe(1000); // totalCartAmount no cambia
    });

    
    test('(5) No hay país configurado (estimación de envío)', () => {
        req.session.cartSubscription = false;
        req.session.customerCountry = undefined;

        calculateShipping(400, config, req);

        expect(req.session.shippingMessage).toBe('Estimated shipping');
        expect(req.session.totalCartShipping).toBe(config.domesticShippingAmount);
        expect(req.session.totalCartAmount).toBe(400 + config.domesticShippingAmount);
    });

    // test('(3) Monto mayor o igual al umbral de envío gratuito ', () => {
    //     req.session.cartSubscription = false;

    //     calculateShipping(600, config, req);


    //     expect(req.session.totalCartShipping).toBe(10); 
    // });

    test('(6) Envío internacional (país diferente)', () => {
        req.session.cartSubscription = false;
        req.session.customerCountry = 'CA';

        calculateShipping(400, config, req);

        expect(req.session.shippingMessage).toBe('International shipping');
        expect(req.session.totalCartShipping).toBe(config.internationalShippingAmount);
        expect(req.session.totalCartAmount).toBe(400 + config.internationalShippingAmount);
    });

    // test('(6) Envío internacional (país diferente) ', () => {
    //     req.session.cartSubscription = false;
    //     req.session.customerCountry = 'CA';

    //     calculateShipping(400, config, req);

    //     expect(req.session.totalCartAmount).toBe(500); 
    // });
});
