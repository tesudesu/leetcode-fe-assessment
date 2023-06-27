import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Telephone from './Telephone.js';

// 1
test('Input element in the document', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    expect(teleElement).toBeInTheDocument(); // passed
});

// 2
test('Contains non-numeric characters', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '12g3fw,-');
    expect(teleElement).toHaveValue('123'); // passed
});

// 3
test('Contains non-numeric characters, longer string', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '12g3fw,-45p6');
    expect(teleElement).toHaveValue('(123)456'); // passed
});

// 4
test('Fewer than 3 numeric characters', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '12');
    expect(teleElement).toHaveValue('12'); // passed
});

// 5
test('3 numeric characters', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '123');
    expect(teleElement).toHaveValue('123'); // passed
});

// 6
test('6 numeric characters', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '123456');
    expect(teleElement).toHaveValue('(123)456'); // passed
});

// 7
test('7 numeric characters', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '1234567');
    expect(teleElement).toHaveValue('(123)456-7'); // passed
});

// 8
test('10 numeric characters', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '1234567890');
    expect(teleElement).toHaveValue('(123)456-7890'); // passed
});

// 9
test('More than 10 numeric characters', () => {
    render(<Telephone />);
    const teleElement = screen.getByTestId('tele');
    userEvent.type(teleElement, '12345678901234');
    expect(teleElement).toHaveValue('(123)456-7890'); // passed
});

// 9 out of 9 tests passed