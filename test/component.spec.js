const supertest = require('supertest');
const app = require('../app');

const component = {
    id: "",
    name: 'lcd samsung',
    description: "ini adalah lcd untuk brand samsung"
};

// create component
describe('TEST POST /components endpoint', () => {
    // positive
    test('create berhasil : component belum dibuat', () => {
        return supertest(app)
            .post('/components')
            .send(component)
            .then(res => {
                expect(res.statusCode).toBe(201);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('description');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('created component succes');

                component.id = res.body.data.id
            });
    });

    // negative
    test('create gagal : name dan description tidak di input', () => {
        return supertest(app)
            .post('/components')
            .send({})
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("name or description is required!");
            });
    });

    test('create gagal : component sudah dibuat', () => {
        return supertest(app)
            .post('/components')
            .send(component)
            .then(res => {
                expect(res.statusCode).toBe(400);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("component is already created!");
            });
    });
});

// getAll component
describe('TEST GET All /components endpoint', () => {
    // positive
    test('getAll berhasil : endpoint benar', () => {
        return supertest(app)
            .get('/components')
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('Get All Components succes');
                expect(res.body.data).toStrictEqual([
                    {
                        id: expect.any(Number),
                        name: expect.any(String),
                        description: expect.any(String)
                    }
                ]);
            });
    });
});


// getById component
describe('TEST GET BY ID /components/:id_component endpoint', () => {
    // positive
    test('getById berhasil : id_component benar', () => {
        return supertest(app)
            .get(`/components/` + component.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body).toHaveProperty('data');
                expect(res.body.data).toHaveProperty('id');
                expect(res.body.data).toHaveProperty('name');
                expect(res.body.data).toHaveProperty('description');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('Get By Id Components succes');
            });
    });

    //negative
    test('getById gagal : id_component salah', () => {
        return supertest(app)
            .get('/components/900')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe(`cannot get component with component id not found`);
            });
    });
});

// update component
describe('TEST UPDATE /components/:id_component endpoint', () => {
    // positive
    test('update berhasil : id_component benar', () => {
        return supertest(app)
            .put(`/components/` + component.id)
            .send({ description : "ini adalah lcd samsung original dengan kualitas terbaik"})
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('updated succes');
            });
    });

    //negative
    test('update gagal : id_component salah', () => {
        return supertest(app)
            .put('/components/900')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("cannot update component with component id not found");
            });
    });
});

// delete
describe('TEST DELETE /components/:id_component endpoint', () => {
    // positive
    test('delete berhasil : id_component benar', () => {
        return supertest(app)
            .delete(`/components/` + component.id)
            .then(res => {
                expect(res.statusCode).toBe(200);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(true);
                expect(res.body.message).toBe('deleted succes');
            });
    });

    //negative
    test('delete gagal : id_component salah', () => {
        return supertest(app)
            .delete('/components/900')
            .then(res => {
                expect(res.statusCode).toBe(404);
                expect(res.body).toHaveProperty('status');
                expect(res.body).toHaveProperty('message');
                expect(res.body.status).toBe(false);
                expect(res.body.message).toBe("cannot delete component with component id not found");
            });
    });
});