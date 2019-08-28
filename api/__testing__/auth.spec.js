const request = require('supertest');

const db = require('../config/config');

const server = require('../server');

describe('server login & register tests', () => {
  beforeEach( async () => {
    let dbTest = await db('users');
    if(dbTest.length > 2) {
      for( let i = dbTest.length - 1; i > dbTest.length-2; i-- ) {
        let id = dbTest[i].id;
        await db('users').where('id','=',id).del();
      };
    }
  });
  let token;
  const testObj = {
    username: 'John',
    password: 'pass'
  },
  regObj01 = {
    username: 'Jane1',
    email: 'Jane@gmail.com',
    password: 'pass'
  },
  regObj02 = {
    username: 'Janey1',
    email: 'Janey@gmail.com',
    password: 'pass'
  };

  describe('POST /auth/users/login', () => {
    
    it('returns 401 unauthorize', () => {
      return request(server).post('/auth/users/login')
      .send({
        username: 'bhla',
        password: 'blah'
      })
      .then( res => {
        expect(res.status).toBe(401);
      });
    });
    
    it('returns 200 OK', () => {
      return request(server).post('/auth/users/login')
      .send(testObj)
      .then( res => {
        expect(res.status).toBe(200);
      });
    });
    
    it('returns an object with a token', () => {
      return request(server).post('/auth/users/login')
      .send(testObj)
      .then( res => {
        let temp = JSON.parse(res.text);
        expect(typeof temp).toBe('object');
        expect(typeof temp.token).toBe('string');
      });
    });

  });

  describe('POST /auth/users/register', () => {
    
    it('returns 201 OK', () => {
      return request(server).post('/auth/users/register')
      .send(regObj01)
      .then( res => {
        expect(res.status).toBe(201);
      });
    });
    
    it('returns an object with a token', () => {
      return request(server).post('/auth/users/register')
      .send(regObj02)
      .then( res => {
        let temp = JSON.parse(res.text);
        expect(typeof temp).toBe('object');
        expect(typeof temp.id).toBe('number');
        expect(typeof temp.username).toBe('string');
      });
    });

  });

});