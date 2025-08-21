const request = require('supertest');
const app = require('../src/app');

describe('Basic API', () => {
  it('health route', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
