'use strict';

require('../test-utils/index').loadTestDatabase();
const { expect } = require('chai');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const supertest = require('supertest');
const server = require('../api/server');
const knex = require('../data/dbConfig');
const app = supertest(server);

describe('POST /api/auth/login', function () {
    it('Testing a non-existent user', async function () {
        await app.post('/api/auth/login')
            .send({
                username: 'derfdfgdgtertuyjgbnmvbndxfsdgtdfhvbbxdfvsdfgfgnvbnxfg',
                password: 'bhjbxdfvsdrghftuykhkldfdferdfgdfgcvbndfgbsdfgbfgbxfgb'
            })
            .expect('Content-Type', /json/)
            .expect(401, {
                'message': 'Invalid Credentials'
            });
    });

    it('Testing a existent user', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        await knex('users').insert({
            username,
            password: bcrypt.hashSync(password, 10)
        });

        const response = await app.post('/api/auth/login')
            .send({
                username: username,
                password: password
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.message).to.equal(`Welcome ${username}!`);
        expect(response.body.token).to.be.string;
    });
});

describe('POST /api/auth/register', function () {
    it('Existent and non-existent user', async function () {
        const username = crypto.randomBytes(10).toString('hex');
        const password = crypto.randomBytes(10).toString('hex');

        const response = await app.post('/api/auth/register')
            .send({
                username,
                password
            })
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body.message).to.equal(`welcome ${username}`);
        expect(response.body.token).to.be.string;

        await app.post('/api/auth/register')
            .send({
                username,
                password
            })
            .expect('Content-Type', /json/)
            .expect(505, {
                errno: 19,
                code: 'SQLITE_CONSTRAINT'
            });
    });
});