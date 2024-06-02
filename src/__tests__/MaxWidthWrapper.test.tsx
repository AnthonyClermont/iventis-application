import { render, screen } from '@testing-library/react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import '@testing-library/jest-dom'

describe('MaxWidthWrapper component', () => {
    test('renders children', () => {
        render(
            <MaxWidthWrapper>
                <div>Child Component</div>
            </MaxWidthWrapper>
        );

        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });

    test('applies correct CSS classes', () => {
        render(
            <MaxWidthWrapper className="custom-class">
                <div>Child Component</div>
            </MaxWidthWrapper>
        );

        expect(screen.getByTestId('max-width-wrapper'))
        .toHaveClass('mx-auto w-full max-w-screen-xl px-2.5 md:px-20 custom-class');
    });
});
