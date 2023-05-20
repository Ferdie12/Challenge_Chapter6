const supertest = require('supertest');
const app = require('../app');

const supplier = {
    id: "",
    name: 'ferdie',
    address: "pekanbaru"
};

// create supplier
describe('TEST POST /suppliers endpoint', () => {
    // positive
    test('create berhasil : supplier belum dibuat', () => {
        return supertest(app)
            .post('/suppliers')
            .send(supplier)
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('address');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('created supplier succes');

                supplier.id = res.body.data.id
            });
    });

    // negative
    test('create gagal : name dan address tidak di input', () => {
        return supertest(app)
            .post('/suppliers')
            .send({})
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("name or address is required!");
            });
    });

    test('create gagal : supplier sudah dibuat', () => {
        return supertest(app)
            .post('/suppliers')
            .send(supplier)
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("supplier is already created!");
            });
    });
});

// getAll supplier
describe('TEST GET All /suppliers endpoint', () => {
    // positive
    test('getAll berhasil : endpoint benar', () => {
        return supertest(app)
            .get('/suppliers')
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('Get All suppliers succes');
                expect(res.body.data).toStrictEqual([
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        address: expect.any(String)
                    }
                ]);
            });
    });
});


// getById supplier
describe('TEST GET BY ID /suppliers/:id_supplier endpoint', () => {
    // positive
    test('getById berhasil : id_supplier benar', () => {
        return supertest(app)
            .get(`/suppliers/` + supplier.id)
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('address');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('Get By Id suppliers succes');
            });
    });

    //negative
    test('getById gagal : id_supplier salah', () => {
        return supertest(app)
            .get('/suppliers/900')
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe(`cannot get supplier with supplier id not found`);
            });
    });
});

// update supplier
describe('TEST UPDATE /suppliers/:id_supplier endpoint', () => {
    // positive
    test('update berhasil : id_supplier benar', () => {
        return supertest(app)
            .put(`/suppliers/` + supplier.id)
            .send({ address : "dumai"})
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('updated succes');
            });
    });

    //negative
    test('update gagal : id_supplier salah', () => {
        return supertest(app)
            .put('/suppliers/900')
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("cannot update supplier with supplier id not found");
            });
    });
});

// delete
describe('TEST DELETE /suppliers/:id_supplier endpoint', () => {
    // positive
    test('delete berhasil : id_supplier benar', () => {
        return supertest(app)
            .delete(`/suppliers/` + supplier.id)
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('deleted succes');
            });
    });

    //negative
    test('delete gagal : id_supplier salah', () => {
        return supertest(app)
            .delete('/suppliers/900')
            .then(res => {
                console.log(res.body);
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("cannot delete supplier with supplier id not found");
            });
    });
});