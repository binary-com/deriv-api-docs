import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { HeroHeader } from "../HeroHeader";

jest.mock('@linaria/core', () => ({
    css: () => jest.fn(),
}))

describe('homepage HeroHeader', () => {
    it('should render HeroHeader', async () => {
        render(<HeroHeader />)
        const hero_header = screen.getByTestId('hero-header');
        expect(hero_header).toBeInTheDocument();
    })
})
