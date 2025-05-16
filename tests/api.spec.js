import { test, expect } from '@playwright/test';
import { getApiContext } from '../pages/utils.js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

test('Search API', async () => {
    const now = Date.now() * 1000;
    const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000 * 1000; //Hardcoding 2 days

    const api = await getApiContext();

    const encoded = Buffer.from(`${process.env.USER_NAME}:${process.env.PASSWORD}`).toString('base64');

  const res = await api.post('/api/default/_search', {
    data: {
        query: {
        sql: 'SELECT * FROM default',
        start_time: twoDaysAgo,
        end_time: now,
        from: 0,
        size: 10,
        },
        search_type: 'ui',
        timeout: 0,
    },
  });

  //Assertions
    expect(res.status()).toBe(200);
    const body = await res.json();
    
    expect(body).toMatchObject({
    took: expect.any(Number),
    took_detail: {
        total: expect.any(Number),
        cache_took: expect.any(Number),
        file_list_took: expect.any(Number),
        wait_in_queue: expect.any(Number),
        idx_took: expect.any(Number),
        search_took: expect.any(Number),
    },
    hits: expect.any(Array),
    });
    
    console.log(body);

});
