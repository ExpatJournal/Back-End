const request = require('supertest');

const db = require('../config/config');

const server = require('../server');

describe('journal enpoints', () => {
  let token;
  let testObj = {
    title: "test title",
    location: "test location",
    post: "This is some text to test the post functionality"
  };

  beforeAll((done) => {
    request(server).post('/auth/users/login')
      .send({
        username: 'john',
        password: 'pass'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('GET /auth/journal', () => {

    it('returns 401 Unauthorized', () => {
      return request(server).get('/auth/journal/')
              .then( res => {
                expect(res.status).toBe(401);
              });
    });

    it('returns 200 OK', () => {
      return request(server).get('/auth/journal/')
              .set('Authorization', token)
              .then( res => {
                expect(res.status).toBe(200);
              });
    });

    it('returns an array of objects', () => {
      return request(server).get('/auth/journal/')
              .set('Authorization', token)
              .then( res => {
                let temp = JSON.parse(res.text);
                expect(Array.isArray(temp)).toBe(true);
                for(obj of temp) {
                  expect(typeof obj).toBe('object');
                };
              });
    });

  });

  describe('GET /auth/journal/:id', () => {

    it('returns 401 Unauthorized', () => {
      return request(server).get('/auth/journal/1')
              .then( res => {
                expect(res.status).toBe(401);
              });
    });

    it('returns 200 OK', () => {
      return request(server).get('/auth/journal/1')
              .set('Authorization', token)
              .then( res => {
                expect(res.status).toBe(200);
              });
    });

    it('returns an object', () => {
      return request(server).get('/auth/journal/1')
              .set('Authorization', token)
              .then( res => {
                let temp = JSON.parse(res.text);
                expect(typeof temp).toBe('object');
              });
    });

  });

  describe('POST /auth/journal/', () => {

    it('returns 401 Unauthorized', () => {
      return request(server).post('/auth/journal/')
              .send(testObj)
              .then( res => {
                expect(res.status).toBe(401);
              });
    });

    it('returns 201 OK', () => {
      return request(server).post('/auth/journal/')
              .set('Authorization', token)
              .send(testObj)
              .then( res => {
                expect(res.status).toBe(201);
              });
    });

    it('returns an object', () => {
      return request(server).post('/auth/journal/')
              .set('Authorization', token)
              .send(testObj)
              .then( res => {
                let temp = JSON.parse(res.text);
                expect(typeof temp).toBe('object');
              });
    });

    it('adds to the database', async () => {
      let before = await db('journal');
      await request(server).post('/auth/journal/')
              .set('Authorization', token)
              .send(testObj);
      let after = await db('journal');
      expect(after.length - before.length).toBe(1);
    });

  });

  describe('PUT /auth/journal/:id', () => {

    it('returns 401 Unauthorized', () => {
      return request(server).put('/auth/journal/1')
              .send(testObj)
              .then( res => {
                expect(res.status).toBe(401);
              });
    });

    it('returns 200 OK', () => {
      return request(server).put('/auth/journal/1')
              .set('Authorization', token)
              .send(testObj)
              .then( res => {
                expect(res.status).toBe(200);
              });
    });

    it('returns an object', () => {
      return request(server).put('/auth/journal/1')
              .set('Authorization', token)
              .send(testObj)
              .then( res => {
                let temp = JSON.parse(res.text);
                expect(typeof temp).toBe('object');
              });
    });

  });

  describe('DELETE /auth/journal/:id', () => {

    it('returns 401 Unauthorized', async () => {
      let arr = await db('journal');
      let id = arr[arr.length-1].id;

      return request(server).delete(`/auth/journal/${id}`)
              .then( res => {
                expect(res.status).toBe(401);
              });
    });

    it('returns 204 No Content Success', async () => {
      let arr = await db('journal');
      let id = arr[arr.length-1].id;

      return request(server).delete(`/auth/journal/${id}`)
              .set('Authorization', token)
              .then( res => {
                expect(res.status).toBe(204);
              });
    });

    it('removes from the database', async () => {
      let arr = await db('journal');
      let id = arr[arr.length-1].id;

      let before = await db('journal');
      await request(server).delete(`/auth/journal/${id}`)
              .set('Authorization', token)
      let after = await db('journal');
      expect(before.length - after.length).toBe(1);
    });

  });

});