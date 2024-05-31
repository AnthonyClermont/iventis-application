import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageToggle } from '@/components/ui/language-toggle';
import '@testing-library/jest-dom';

describe('LanguageToggle component', () => {
    test('renders with English language by default', () => {
        render(<LanguageToggle />);
        const englishButton = screen.getByAltText('English');
        
        expect(englishButton).toBeInTheDocument();
    });
});
