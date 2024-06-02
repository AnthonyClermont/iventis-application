import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from '@/app/page';

jest.mock('../components/PokemonList', () => () => <div data-testid="pokemon-list">Mocked PokemonList</div>);

describe('Home', () => {
    test('renders the main element', () => {
        render(<Home />);
        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();
    });
  
    test('renders the PokemonList component', () => {
        render(<Home />);
        const pokemonList = screen.getByTestId('pokemon-list');
        expect(pokemonList).toBeInTheDocument();
    });
});