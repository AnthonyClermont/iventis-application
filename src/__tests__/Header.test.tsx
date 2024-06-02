import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header component', () => {
    test('renders header with image, title, and toggles', () => {
        render(
            <Header />
        );
    
        const image = screen.getByAltText('Pokemon Logo');
        expect(image).toBeInTheDocument();

        const title = screen.getByText('Iventis Assignment');
        expect(title).toBeInTheDocument();

        const toggleDiv = screen.getByTestId('toggle-div');
        expect(toggleDiv).toBeInTheDocument();
    });
});
