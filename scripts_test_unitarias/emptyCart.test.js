const emptyCart = async (req, res, type, customMessage) => {
    const db = req.app.db;

    // Remove from session
    delete req.session.cart;
    delete req.session.shippingAmount;
    delete req.session.orderId;
    delete req.session.cartSubscription;
    delete req.session.discountCode;

    // Remove cart from DB
    await db.cart.deleteOne({ sessionId: req.session.id });

    // update total cart
    await updateTotalCart(req, res);

    // Update checking cart for subscription
    updateSubscriptionCheck(req, res);

    // Set returned message
    let message = 'Cart successfully emptied';
    if(customMessage){
        message = customMessage;
    }

    if(type === 'function'){
        return;
    }

    // If POST, return JSON else redirect nome
    if(type === 'json'){
        res.status(200).json({ message: message, totalCartItems: 0 });
        return;
    }

    req.session.message = message;
    req.session.messageType = 'success';
    res.redirect('/');
};


describe(' emptyCart', () => {
    let req, res;

    beforeEach(() => {
        req = {
            session: { id: 'testSessionId' },
            app: { db: { cart: { deleteOne: jest.fn().mockResolvedValue(true) } } },
            session: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            redirect: jest.fn()
        };
    });

    test('(1) Se pasa un mensaje personalizado', async () => {
        const customMessage = 'Mensaje personalizado';
        await emptyCart(req, res, 'json', customMessage);

        expect(res.json).toHaveBeenCalledWith({
            message: customMessage,
            totalCartItems: 0
        });
    });

    test('(2) No se pasa un mensaje personalizado', async () => {
        await emptyCart(req, res, 'json');

        expect(res.json).toHaveBeenCalledWith({
            message: 'Cart successfully emptied',
            totalCartItems: 0
        });
    });

    test('(3) type === "function", sin redirección o respuesta JSON', async () => {
        await emptyCart(req, res, 'function');

        expect(res.json).not.toHaveBeenCalled();
        expect(res.redirect).not.toHaveBeenCalled();
    });

    test('(4) type !== "function", procede a evaluar JSON o redirección', async () => {
        await emptyCart(req, res, 'json');

        expect(res.json).toHaveBeenCalled(); // Asegura que se llama al siguiente flujo, no es una prueba completa
    });

    test('(5) type === "json", retorna JSON con éxito y total de artículos 0', async () => {
        await emptyCart(req, res, 'json');

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Cart successfully emptied',
            totalCartItems: 0
        });
    });

    test('(6) type !== "json", redirige al usuario a la página principal', async () => {
        await emptyCart(req, res, 'html');

        expect(req.session.message).toBe('Cart successfully emptied');
        expect(req.session.messageType).toBe('success');
        expect(res.redirect).toHaveBeenCalledWith('/');
    });
});