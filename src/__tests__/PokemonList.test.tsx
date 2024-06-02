import { render, screen, waitFor } from '@testing-library/react';
import PokemonList from '@/components/PokemonList';
import '@testing-library/jest-dom'

const mockPokemonData = [
    { index: 1, name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
];

const mockPokemonDetails = {
    name: 'Bulbasaur',
    height: 7,
    weight: 69,
    stats: {},
    abilities: [],
};

const fetchMock = jest.fn().mockImplementation((input: RequestInfo) => {
    if (input === '/api/pokemon') {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockPokemonData),
        });
    } 
    
    else if (input === '/api/pokemon-details?url=https%3A%2F%2Fpokeapi.co%2Fapi%2Fv2%2Fpokemon%2F1%2F&language=English') {
        return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockPokemonDetails),
        });
    } 
    
    else {
        return Promise.reject(new Error('Unexpected fetch call'));
    }
});

Object.defineProperty(global, 'fetch', {
    writable: true,
    value: fetchMock,
});

describe('PokemonList component', () => {
    test('renders loading state when pokemonData is null', async () => {
        render(<PokemonList />);

        expect(screen.getByText('Loading...')).toBeInTheDocument();
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith('/api/pokemon');
        });
    });

    test('renders Pokemon list when pokemonData is not null', async () => {
        render(<PokemonList />);

        await waitFor(() => {
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        });
        expect(fetchMock).toHaveBeenCalledWith('/api/pokemon');
    });

    test('fetches Pokemon details when a Pokemon is clicked', async () => {
        render(<PokemonList />);

        await waitFor(() => {
            expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        });

        screen.getByText('Bulbasaur').click();
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith('/api/pokemon-details?url=https%3A%2F%2Fpokeapi.co%2Fapi%2Fv2%2Fpokemon%2F1%2F&language=English');
        });
    });
});
