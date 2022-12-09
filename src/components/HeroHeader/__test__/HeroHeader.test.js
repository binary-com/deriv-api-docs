import React from 'react';
import { render } from "@testing-library/react";
import { HeroHeader } from "../HeroHeader";

describe('homepage HeroHeader', () => {
    it('should render HeroHeader', async () => {
        render(<HeroHeader />)
        const hero_header = screen.getByTestId('hero-header');
        expect(await hero_header).toBeInTheDocument();
    }) 
})