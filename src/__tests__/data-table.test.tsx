import { DataTable } from '@/components/ui/data-table';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Pokemon } from '@/app/api/pokemon/route';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Pokemon>[] = [
    {
        accessorKey: "index",
        header: "#",
        cell: (cell) => cell.row.index + 1,
        size: 1 
    },
    {
        accessorKey: "name",
        header: "name",
    },
];

const data: Pokemon[] = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4' },
];

const onUrlClickMock = jest.fn();

describe('DataTable', () => {
    test('renders table content correctly', () => {
        render(
            <DataTable
                columns={columns}
                data={data}
                onUrlClick={onUrlClickMock}
            />
        );

        const searchInput = screen.getByPlaceholderText('Search pokemons...');
        expect(searchInput).toBeInTheDocument();

        const nameHeader = screen.getByText('name');
        expect(nameHeader).toBeInTheDocument();

        const urlHeader = screen.queryByText('url');
        expect(urlHeader).not.toBeInTheDocument();

        const urlExample = screen.queryByText('https://pokeapi.co/api/v2/pokemon/25');
        expect(urlExample).not.toBeInTheDocument();

        const pikachuRow = screen.getByText('Pikachu');
        expect(pikachuRow).toBeInTheDocument();

        const charmanderRow = screen.getByText('Charmander');
        expect(charmanderRow).toBeInTheDocument();

        fireEvent.click(charmanderRow);

        expect(onUrlClickMock).toHaveBeenCalledWith({
            name: 'Charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4',
        });
    });

    test('should disable both pagination controls', () => {
        render(
            <DataTable
                columns={columns}
                data={data}
                onUrlClick={onUrlClickMock}
            />
        );

        const backButton = screen.getByText('Previous');
        expect(backButton).toBeDisabled();
    
        const nextButton = screen.getByTestId('next-button');
        expect(nextButton).toBeDisabled();
    });

    test('should filter down results when search input givne', () => {
        render(
            <DataTable
                columns={columns}
                data={data}
                onUrlClick={onUrlClickMock}
            />
        );

        const inputElement = screen.getByPlaceholderText('Search pokemons...');
        fireEvent.change(inputElement, { target: { value: 'Pikachu' } });
      
        const filteredPokemon = screen.getByText('Pikachu');
        expect(filteredPokemon).toBeInTheDocument();

        const filteredOutPokemon = screen.queryByText('Charmander');
        expect(filteredOutPokemon).not.toBeInTheDocument();
    });

    test('should display no results when filter returns empty', () => {
        render(
            <DataTable
                columns={columns}
                data={data}
                onUrlClick={onUrlClickMock}
            />
        );

        const inputElement = screen.getByPlaceholderText('Search pokemons...');
        fireEvent.change(inputElement, { target: { value: 'ReturnsNoResults' } });
      
        const filteredPokemon = screen.getByText('No results.');
        expect(filteredPokemon).toBeInTheDocument();
    });
});
