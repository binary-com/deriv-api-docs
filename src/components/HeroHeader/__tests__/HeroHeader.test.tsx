import React from 'react';
import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import { HeroHeader } from "../HeroHeader";

jest.mock('@linaria/core', () => ({
    css: () => jest.fn(),
}))

describe('HeroHeader', () => {
    it('should render properly', () => {
        render(<HeroHeader />)
        const hero_header = screen.getByTestId('hero-header');
        expect(hero_header).toBeInTheDocument();
    })
    it('should render "Deriv API" text properly', () => {
        render(<HeroHeader />)
        const hero_title = screen.getByRole('heading', {level: 2});
        expect(hero_title).toBeInTheDocument();
    })
    it("should render 'use our powerful, ....' text properly", () => {
        render(<HeroHeader />)
        const hero_subtitle = screen.getByRole('heading', {level: 7});
        expect(hero_subtitle).toBeInTheDocument();
    })
})
