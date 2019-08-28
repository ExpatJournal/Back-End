const request = require('supertest');

const server = require('../server');

describe('server setup test', () => {
  
  describe('GET /api/posts', () => {
    it('returns 200 OK', () => {
      return request(server).get('/api/posts')
            .then( res => {
              expect(res.status).toBe(200);
            });
    });
  
    it('returns an Array containing at an object', () => {
      return request(server).get('/api/posts')
            .then( res => {
              let temp = JSON.parse(res.text);
              expect(Array.isArray(temp)).toBe(true);
              expect(typeof temp[0]).toBe('object');
            });
    });
  });

  describe('GET /api/posts/:id', () => {
    it('returns 200 OK', () => {
      return request(server).get('/api/posts/1')
            .then( res => {
              expect(res.status).toBe(200);
            });
    });
  
    it('returns an object', () => {
      return request(server).get('/api/posts/1')
            .then( res => {
              let temp = JSON.parse(res.text);
              expect(typeof temp).toBe('object');
            });
    });
  });

  describe('GET /api/user/:id', () => {
    it('returns 200 OK', () => {
      return request(server).get('/api/user/1')
            .then( res => {
              expect(res.status).toBe(200);
            });
    });
  
    it('returns an Array containing at least one object', () => {
      return request(server).get('/api/user/1')
            .then( res => {
              let temp = JSON.parse(res.text);
              expect(Array.isArray(temp)).toBe(true);
              expect(typeof temp[0]).toBe('object');
            });
    });
  });

}); 