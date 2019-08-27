const request = require('supertest');

const db = require('../config/config');
const server = require('../server');

describe('server setup test', () => {
  it('tests if we are running DB_ENV as "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  it('returns 200 OK', () => {
    return request(server).get('/api/posts')
          .then( res => {
            expect(res.status).toBe(200);
          });
  });

  it('returns 200 OK', () => {
    return request(server).get('/api/posts/1')
          .then( res => {
            expect(res.status).toBe(200);
          });
  });

  it('returns 200 OK', () => {
    return request(server).get('/api/user/1')
          .then( res => {
            expect(res.status).toBe(200);
          });
  });
}); 