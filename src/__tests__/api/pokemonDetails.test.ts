/**
 * @jest-environment node
 */

import * as appHandler from '@/app/api/pokemon-details/route';
import { testApiHandler } from 'next-test-api-route-handler';

const expectedResponseBody = {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    stats: {
        hp: 45,
        attack: 49,
        defense: 49
    },
    abilities: [
        {
            name: "overgrow",
            effect: "When this Pokémon has 1/3 or less of its HP remaining, its grass-type moves inflict 1.5× as much regular damage.",
            rateLimited: false
        },
        {
            name: "chlorophyll",
            effect: /This Pokémon's Speed is doubled during strong sunlight\..*This bonus does not count as a stat modifier\./,
            rateLimited: false
        }
    ]
};

describe('Pokemon Details', () => {
    test('returns expected data when pokemon details call is successful in English', async () => {
        await testApiHandler({
            url: 'http://localhost:3000/api/pokemon-details?url=https%3A%2F%2Fpokeapi.co%2Fapi%2Fv2%2Fpokemon%2F1%2F&language=English',
            appHandler,
            test: async ({ fetch }) => {
                const res = await fetch({ method: 'GET' });
                const body = await res.json();
        
                expect(res.status).toBe(200);
                expect(res.headers.get('Cache-Control')).toBe('public, s-maxage=3600, stale-while-revalidate=59');
                expect(body).toMatchObject(expectedResponseBody);
            }
        });
    });
});
