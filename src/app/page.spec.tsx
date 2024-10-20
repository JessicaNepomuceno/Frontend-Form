import { render} from "@testing-library/react";
import Home from "./page";
import "@testing-library/jest-dom";

test('renders learn react link', () => {
  const { getByText } = render(<Home />);
  const linkElement = getByText(/Deploy now/i);
  expect(linkElement).toBeInTheDocument();
});
