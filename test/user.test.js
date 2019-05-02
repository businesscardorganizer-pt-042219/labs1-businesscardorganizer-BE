'use strict';

require('../test-utils/index').loadTestDatabase();
const { expect } = require('chai');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');
const server = require('../api/server');
const knex = require('../data/dbConfig');
const app = supertest(server);

describe('GET /api/users', function () {
    it('Test not authorized', async function () {
        await app.get('/api/users')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const expectedResult = await knex('users').select('id', 'username', 'password');

        await app.get('/api/users')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, expectedResult);
    });
});

describe('GET /api/users/mycard/:id', function () {
    it('Test not authorized', async function () {
        await app.get('/api/users/mycard/1')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const result1 = await knex.select('cards.id')
            .from('cards')
            .innerJoin('collections','collections.card_id','cards.id')
            .innerJoin('users','users.id','collections.user_id')
            .where('users.id', 1)
            .where('cards.own_flag', '1');

        const result2 = await knex.select('cards.id')
            .from('cards')
            .innerJoin('collections','collections.card_id','cards.id')
            .innerJoin('users','users.id','collections.user_id')
            .where('users.id', 2)
            .where('cards.own_flag', '1');

        await app.get('/api/users/mycard/1')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result1);

        await app.get('/api/users/mycard/2')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result2);
    });
});

describe('GET /api/users/mycards/:id', function () {
    it('Test not authorized', async function () {
        await app.get('/api/users/mycards/1')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const result1 = await knex.select('cards.id')
            .from('cards')
            .innerJoin('collections','collections.card_id','cards.id')
            .innerJoin('users','users.id','collections.user_id')
            .where('users.id', 1);

        const result2 = await knex.select('cards.id')
            .from('cards')
            .innerJoin('collections','collections.card_id','cards.id')
            .innerJoin('users','users.id','collections.user_id')
            .where('users.id', 2);

        await app.get('/api/users/mycards/1')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result1);

        await app.get('/api/users/mycards/2')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result2);
    });
});

describe('GET /api/users/cards', function () {
    it('Test not authorized', async function () {
        await app.get('/api/users/cards')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const result = await knex('cards');

        await app.get('/api/users/cards')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result);
    });
});

describe('GET /api/users/cards/:id', function () {
    it('Test not authorized', async function () {
        await app.get('/api/users/cards/1')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const result1 = await knex('cards').where({id: 1});
        const result2 = await knex('cards').where({id: 2});
        const result3 = await knex('cards').where({id: 3});

        await app.get('/api/users/cards/1')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result1);

        await app.get('/api/users/cards/2')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result2);

        await app.get('/api/users/cards/3')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result3);
    });
});

describe('POST /api/users/cards', function () {
    it('Test not authorized', async function () {
        await app.post('/api/users/cards')
            .send({})
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');
        const cardData = {
            initial: crypto.randomBytes(10).toString('hex'),
            first_name: crypto.randomBytes(10).toString('hex'),
            last_name: crypto.randomBytes(10).toString('hex'),
            work_title: crypto.randomBytes(10).toString('hex'),
            email: crypto.randomBytes(10).toString('hex'),
            address1: crypto.randomBytes(10).toString('hex'),
            address2: crypto.randomBytes(10).toString('hex'),
            city: crypto.randomBytes(10).toString('hex'),
            state: crypto.randomBytes(10).toString('hex'),
            zip: crypto.randomBytes(10).toString('hex'),
            country: crypto.randomBytes(10).toString('hex'),
            company_name: crypto.randomBytes(10).toString('hex'),
            cell_phone: crypto.randomBytes(10).toString('hex'),
            work_phone: crypto.randomBytes(10).toString('hex'),
            URL: crypto.randomBytes(10).toString('hex'),
            QR_code: crypto.randomBytes(10).toString('hex'),
            github: crypto.randomBytes(10).toString('hex'),
            linkedIn: crypto.randomBytes(10).toString('hex'),
            own_flag: crypto.randomBytes(10).toString('hex'),
        };

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        await app.post('/api/users/cards')
            .send(cardData)
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(201);

        expect(await knex('cards').where(cardData).first()).to.be.not.undefined;
    });
});

describe('DELETE /api/users/cards/:id', function () {
    it('Test not authorized', async function () {
        await app.delete('/api/users/cards/1')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');
        const cardData = {
            initial: crypto.randomBytes(10).toString('hex'),
            first_name: crypto.randomBytes(10).toString('hex'),
            last_name: crypto.randomBytes(10).toString('hex'),
            work_title: crypto.randomBytes(10).toString('hex'),
            email: crypto.randomBytes(10).toString('hex'),
            address1: crypto.randomBytes(10).toString('hex'),
            address2: crypto.randomBytes(10).toString('hex'),
            city: crypto.randomBytes(10).toString('hex'),
            state: crypto.randomBytes(10).toString('hex'),
            zip: crypto.randomBytes(10).toString('hex'),
            country: crypto.randomBytes(10).toString('hex'),
            company_name: crypto.randomBytes(10).toString('hex'),
            cell_phone: crypto.randomBytes(10).toString('hex'),
            work_phone: crypto.randomBytes(10).toString('hex'),
            URL: crypto.randomBytes(10).toString('hex'),
            QR_code: crypto.randomBytes(10).toString('hex'),
            github: crypto.randomBytes(10).toString('hex'),
            linkedIn: crypto.randomBytes(10).toString('hex'),
            own_flag: crypto.randomBytes(10).toString('hex'),
        };

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const [id] = await knex('cards').insert(cardData);

        expect(await knex('cards').where({id}).first()).to.be.not.undefined;

        await app.delete(`/api/users/cards/${id}`)
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, { message: 'The has been deleted' });

        expect(await knex('cards').where({id}).first()).to.be.undefined;
    });
});

describe('PUT /api/users/cards/:id', function () {
    it('Test not authorized', async function () {
        await app.put('/api/users/cards/1')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');
        const cardData1 = {
            initial: crypto.randomBytes(10).toString('hex'),
            first_name: crypto.randomBytes(10).toString('hex'),
            last_name: crypto.randomBytes(10).toString('hex'),
            work_title: crypto.randomBytes(10).toString('hex'),
            email: crypto.randomBytes(10).toString('hex'),
            address1: crypto.randomBytes(10).toString('hex'),
            address2: crypto.randomBytes(10).toString('hex'),
            city: crypto.randomBytes(10).toString('hex'),
            state: crypto.randomBytes(10).toString('hex'),
            zip: crypto.randomBytes(10).toString('hex'),
            country: crypto.randomBytes(10).toString('hex'),
            company_name: crypto.randomBytes(10).toString('hex'),
            cell_phone: crypto.randomBytes(10).toString('hex'),
            work_phone: crypto.randomBytes(10).toString('hex'),
            URL: crypto.randomBytes(10).toString('hex'),
            QR_code: crypto.randomBytes(10).toString('hex'),
            github: crypto.randomBytes(10).toString('hex'),
            linkedIn: crypto.randomBytes(10).toString('hex'),
            own_flag: crypto.randomBytes(10).toString('hex'),
        };
        const cardData2 = {
            initial: crypto.randomBytes(10).toString('hex'),
            first_name: crypto.randomBytes(10).toString('hex'),
            last_name: crypto.randomBytes(10).toString('hex'),
            work_title: crypto.randomBytes(10).toString('hex'),
            email: crypto.randomBytes(10).toString('hex'),
            address1: crypto.randomBytes(10).toString('hex'),
            address2: crypto.randomBytes(10).toString('hex'),
            city: crypto.randomBytes(10).toString('hex'),
            state: crypto.randomBytes(10).toString('hex'),
            zip: crypto.randomBytes(10).toString('hex'),
            country: crypto.randomBytes(10).toString('hex'),
            company_name: crypto.randomBytes(10).toString('hex'),
            cell_phone: crypto.randomBytes(10).toString('hex'),
            work_phone: crypto.randomBytes(10).toString('hex'),
            URL: crypto.randomBytes(10).toString('hex'),
            QR_code: crypto.randomBytes(10).toString('hex'),
            github: crypto.randomBytes(10).toString('hex'),
            linkedIn: crypto.randomBytes(10).toString('hex'),
            own_flag: crypto.randomBytes(10).toString('hex'),
        };

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const [id] = await knex('cards').insert(cardData1);

        expect(await knex('cards').where(cardData1).first()).to.be.not.undefined;
        expect(await knex('cards').where(cardData2).first()).to.be.undefined;

        await app.put(`/api/users/cards/${id}`)
            .send(cardData2)
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(201, '1');

        expect(await knex('cards').where(cardData1).first()).to.be.undefined;
        expect(await knex('cards').where(cardData2).first()).to.be.not.undefined;
    });
});

describe('GET /api/users/events/:id', function () {
    it('Test not authorized', async function () {
        await app.get('/api/users/events/1')
            .expect('Content-Type', /json/)
            .expect(401, {
                'err': 'user not verified'
            });
    });

    it('Test result', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            });

        const result1 = await knex.select('cards.initial', 'cards.id', 'cards.first_name', 'cards.last_name','cards.work_title', 'cards.email','cards.address1','cards.address2','cards.city','cards.state','cards.zip','cards.country','cards.company_name','cards.cell_phone','cards.work_phone','cards.URL','cards.QR_code','cards.github','cards.linkedIn','cards.own_flag')
            .from('cards')
            .innerJoin('collections','collections.card_id','cards.id')
            .innerJoin('users','users.id','collections.user_id')
            .innerJoin('events','events.id','collections.event_id')
            .where('events.id', 1);

        const result2 = await knex.select('cards.initial', 'cards.id', 'cards.first_name', 'cards.last_name','cards.work_title', 'cards.email','cards.address1','cards.address2','cards.city','cards.state','cards.zip','cards.country','cards.company_name','cards.cell_phone','cards.work_phone','cards.URL','cards.QR_code','cards.github','cards.linkedIn','cards.own_flag')
            .from('cards')
            .innerJoin('collections','collections.card_id','cards.id')
            .innerJoin('users','users.id','collections.user_id')
            .innerJoin('events','events.id','collections.event_id')
            .where('events.id', 2);

        await app.get('/api/users/events/1')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result1);

        await app.get('/api/users/events/2')
            .set('Authorization', response.body.token)
            .expect('Content-Type', /json/)
            .expect(200, result2);
    });
});