import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database/';

describe('Survey tests', () => {
	beforeAll(async () => {
		const connection = await createConnection();
		await connection.runMigrations();
	});

	afterAll(async () => {
		const connection = getConnection();
		await connection.dropDatabase();
		await connection.runMigrations();
	});

	it('Should be able to create a new survey', async () => {
		const response = await request(app).post('/surveys').send({
			title: 'Title example',
			name: 'Description example',
			description: 'A greate description'
		});

		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty('id');
	});

	it('Should be able to get all surveys', async () => {
		const response = await request(app).get('/surveys');

		expect(response.body.length).toBe(1);
	});
});
