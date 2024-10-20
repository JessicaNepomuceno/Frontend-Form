import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "./page";
import { it, } from "node:test";
import "@testing-library/jest-dom";

it.only('renders the component', () => {
  render(<Home />);
  const linkElement = screen.getByText("Hello Word");
  console.log(linkElement);
  // expect(linkElement).toBeInTheDocument();
});
