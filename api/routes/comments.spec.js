const request = require('supertest');

const db = require('../config/config');

const server = require('../server');

describe('tests for comments', () => {

  describe('GET /auth/journal/:id/comments', () => {
    
    it('returns 200 OK', () => {
      return request(server).get('/auth/journal/1/comments')
            .then( res => {
              expect(res.status).toBe(200);
            });
    });

    it('returns an array of objects', () => {
      return request(server).get('/auth/journal/1/comments')
              .then( res => {
                let temp = JSON.parse(res.text);
                expect(Array.isArray(temp)).toBe(true);
                for( obj of temp) {
                  expect(typeof obj).toBe('object');
                }
              });
    });

  });

});