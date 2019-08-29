const request = require('supertest');

const db = require('../config/config');
const server = require('../server');

describe('media routes', () => {

  describe('GET /auth/media', () => {

    it('returns a status of 200 OK', () => {
      return request(server).get('/auth/media')
              .then( res => {
                expect(res.status).toBe(200);
              });
    });

    it('returns an array of objects', () => {
      return request(server).get('/auth/media')
              .then( res => {
                let temp = JSON.parse(res.text);
                expect(Array.isArray(temp)).toBe(true);
                expect(temp.length > 0).toBe(true);
                for(obj of temp) {
                  expect(typeof obj).toBe('object');
                };
              });
    });

  });

  describe('GET /auth/media/:id', () => {

    it('returns a status 200 OK', () => {
      return request(server).get('/auth/media/1')
              .then( res => {
                expect(res.status).toBe(200);
              });
    });

    it('returns an object', () => {
      return request(server).get('/auth/media/1')
              .then( res => {
                let temp = JSON.parse(res.text);
                expect(typeof temp).toBe('object');
              });
    });

  });

});