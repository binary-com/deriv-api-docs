import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { Benefits } from "../Benefits";

// jest.mock('@linaria/react', () => ({
//     styled: () => jest.fn(),
// }))

describe('Benefits', () => {
    it.only('Should render the component', () => {
        render(<Benefits />);
        const benefits = screen.getByTestId('benefits');
        expect(benefits).toBeInTheDocument();
    })
})