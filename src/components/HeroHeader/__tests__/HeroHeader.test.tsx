import React from 'react';
import { render, screen } from "@testing-library/react";
import { HeroHeader } from "../HeroHeader";
import '@testing-library/jest-dom'

describe('homepage HeroHeader', () => {
    it('should render HeroHeader', async () => {
        render(<HeroHeader />)
        const hero_header = screen.getByTestId('hero-header');
        expect(hero_header).toBeInTheDocument();
    })
})