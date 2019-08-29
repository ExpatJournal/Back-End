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
                };
              });
    });

  });

  describe('POST /:id/comments', () => {
    let token;
  
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

    it('returns 401 UNAUTHORIZED', () => {
      return request(server).post('/auth/journal/1/comments')
                .send({
                  "post_id" : 1,
                  "author_id" : 1, 
                  "comment" : "hello, world"
                })
                .then( res => {
                  expect(res.status).toBe(401);
                });
    });

    it('returns 201 CREATED', () => {
      return request(server).post('/auth/journal/1/comments')
                .set('Authorization', token)
                .send({
                  "post_id" : 1,
                  "author_id" : 1, 
                  "comment" : "hello, world"
                })
                .then( res => {
                  expect(res.status).toBe(201);
                });
    });

    it('returns an object', () => {
      return request(server).post('/auth/journal/1/comments')
                .set('Authorization', token)
                .send({
                  "post_id" : 1,
                  "author_id" : 1, 
                  "comment" : "hello, world"
                })
                .then( res => {
                  let temp = JSON.parse(res.text);
                  expect(typeof temp).toBe('object');
                });
    });

  });

  describe('POST /:id/comments', () => {
    let token;
  
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

    it('returns 401 UNAUTHORIZED', () => {
      return request(server).put('/auth/journal/1/comments/1')
                .send({
                  "post_id" : 1,
                  "author_id" : 1, 
                  "comment" : "hello, world"
                })
                .then( res => {
                  expect(res.status).toBe(401);
                });
    });

    it('returns 200 OK', () => {
      return request(server).put('/auth/journal/1/comments/1')
                .set('Authorization', token)
                .send({
                  "post_id" : 1,
                  "author_id" : 1, 
                  "comment" : "hello, world"
                })
                .then( res => {
                  expect(res.status).toBe(200);
                });
    });

    it('returns an object', () => {
      return request(server).put('/auth/journal/1/comments/1')
                .set('Authorization', token)
                .send({
                  "post_id" : 1,
                  "author_id" : 1, 
                  "comment" : "hello, world"
                })
                .then( res => {
                  let temp = JSON.parse(res.text);
                  expect(typeof temp).toBe('object');
                });
    });

  });

  describe('deletes a comment', () => {
    let token;
  
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

    it('deletes a comment', async () => {
      let before = await db('comments');
      let id = before[before.length-1].id;
      await request(server).delete(`/auth/journal/1/comments/${id}`)
              .set("Authorization", token)
              .then( res => {
                expect(res.status).toBe(204);
              });
      let after = await db('comments');
  
      
      expect(before.length - after.length).toBe(1);
    });

  });

});