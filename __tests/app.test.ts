import request from 'supertest';
import { app } from '../src/app';

jest.mock('../src/models/Book');

describe('App Test', () => {
  test('GET /random-url should return 404', done => {
    request(app).get('/reset')
      .expect(404, done);
  });

  test('GET /book/all should return 401', done => {
    request(app).get('/api/book/all').expect(401, done);
  });
});
