import { PokemonDetails } from '@/app/api/pokemon-details/route';
import PokemonDetailsDraw from '@/components/PokemonDraw';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

describe('PokemonDetailsDraw component', () => {
  test('renders loading state when pokemonDetails is null', () => {
    render(<PokemonDetailsDraw pokemonDetails={null} isOpen={true} onOpenChange={() => {}} />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders Pokemon details when pokemonDetails is not null', () => {
    const pokemonDetails: PokemonDetails = {
      id: 1,
      name: 'Bulbasaur',
      height: 7,
      weight: 69,
      stats: {
        hp: 45,
        attack: 49,
        defense: 50
      },
      abilities: [
        { name: 'Overgrow', effect: 'Powers up Grass-type moves when the Pokémon has less than 1/3 of its maximum HP.', rateLimited: false },
        { name: 'Chlorophyll', effect: 'Boosts the Pokémon\'s Speed stat in harsh sunlight.', rateLimited: false }
      ]
    };

    render(<PokemonDetailsDraw pokemonDetails={pokemonDetails} isOpen={true} onOpenChange={() => {}} />);
    
    expect(screen.getByText('#1')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByAltText('pokemon image')).toBeInTheDocument();
    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('Weight:')).toBeInTheDocument();
    expect(screen.getByText('69')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('49')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('Overgrow')).toBeInTheDocument();
    expect(screen.getByText('Powers up Grass-type moves when the Pokémon has less than 1/3 of its maximum HP.')).toBeInTheDocument();
    expect(screen.getByText('Chlorophyll')).toBeInTheDocument();
    expect(screen.getByText('Boosts the Pokémon\'s Speed stat in harsh sunlight.')).toBeInTheDocument();
  });
});
