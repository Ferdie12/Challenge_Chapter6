const supertest = require('supertest');
const app = require('../app');

const product = {
    id: "",
    name: 'samsung',
    quantity: 20
};

// create product
describe('TEST POST /products endpoint', () => {
    // positive
    test('create berhasil : product belum dibuat', () => {
        return supertest(app)
            .post('/products')
            .send(product)
            .then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('quantity');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('created product succes');

                product.id = res.body.data.id
            });
    });

    // negative
    test('create gagal : name dan quantity tidak di input', () => {
        return supertest(app)
            .post('/products')
            .send({})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("name or quantity is required!");
            });
    });

    test('create gagal : product sudah dibuat', () => {
        return supertest(app)
            .post('/products')
            .send(product)
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("product is already created!");
            });
    });
});

// getAll product
describe('TEST GET All /products endpoint', () => {
    // positive
    test('getAll berhasil : endpoint benar', () => {
        return supertest(app)
            .get('/products')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('Get All products succes');
                expect(res.body.data).toStrictEqual([
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        quantity: expect.any(Number)
                    }
                ]);
            });
    });
});


// getById product
describe('TEST GET BY ID /products/:id_product endpoint', () => {
    // positive
    test('getById berhasil : id_product benar', () => {
        return supertest(app)
            .get(`/products/` + product.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('quantity');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('Get By Id products succes');
            });
    });

    //negative
    test('getById gagal : id_product salah', () => {
        return supertest(app)
            .get('/products/900')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe(`cannot get product with product id not found`);
            });
    });
});

// update product
describe('TEST UPDATE /products/:id_product endpoint', () => {
    // positive
    test('update berhasil : id_product benar', () => {
        return supertest(app)
            .put(`/products/` + product.id)
            .send({ quantity : 35})
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('updated succes');
            });
    });

    //negative
    test('update gagal : id_product salah', () => {
        return supertest(app)
            .put('/products/900')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("cannot update product with product id not found");
            });
    });
});

// delete
describe('TEST DELETE /products/:id_product endpoint', () => {
    // positive
    test('delete berhasil : id_product benar', () => {
        return supertest(app)
            .delete(`/products/` + product.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('deleted succes');
            });
    });

    //negative
    test('delete gagal : id_product salah', () => {
        return supertest(app)
            .delete('/products/900')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("cannot delete product with product id not found");
            });
    });
});