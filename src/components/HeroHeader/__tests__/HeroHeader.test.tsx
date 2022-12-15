import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { HeroHeader } from "../HeroHeader";

describe("HeroHeader", () => {
  it("should render properly", () => {
    render(<HeroHeader />);
    const hero_header = screen.getByTestId("hero-header");
    expect(hero_header).toBeInTheDocument();
  });

  it("should render hero title properly", () => {
    render(<HeroHeader />);
    const hero_title = screen.getByRole("heading", { level: 2 });
    expect(hero_title).toHaveTextContent("Deriv API");
  });

  it("should render hero subtitle text properly", () => {
    render(<HeroHeader />);
    const hero_subtitle = screen.getByRole("heading", { level: 7 });
    expect(hero_subtitle).toHaveTextContent(
      "Use our powerful, flexible, and free API to build a custom trading platform - for yourself or for your business."
    );
  });
});
