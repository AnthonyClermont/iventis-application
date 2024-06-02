/**
 * @jest-environment node
 */

import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from '@/app/api/pokemon/route';

describe('DataTable', () => {
    test('returns expected data when API call is successful', async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const res = await fetch({ method: 'GET' });
                const body = await res.json();
        
                expect(res.status).toBe(200);
                expect(res.headers.get('Cache-Control')).toBe('public, s-maxage=3600, stale-while-revalidate=59');
            }
        });
    });
});