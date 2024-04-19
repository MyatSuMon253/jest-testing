import { App } from "./App";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";

// mocking component
jest.mock("./Home", () => ({ Home: () => <div>Home</div> }));

jest.mock("./OrderSummary", () => ({
  OrderSummary: () => <div>Order Summary</div>,
}));

jest.mock("./OrderSummary", () => ({
  Checkout: () => <div>Check Out</div>,
}));

describe("App", () => {
  it("renders successfully", () => {
    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(container.innerHTML).toMatch("Goblin Store");
  });

  describe("routing", () => {
    it("renders Home component on root route", () => {
      const { container } = renderWithRouter(() => <App />, "/");
      expect(container.innerHTML).toMatch("Home");
    });

    it("renders Checkout page on '/checkout' route", () => {
      const { container } = renderWithRouter(() => <App />, "/checkout");
      expect(container.innerHTML).toMatch("Check Out");
    });

    it("renders Order Summary page on '/order' route", () => {
      const { container } = renderWithRouter(() => <App />, "/order");
      expect(container.innerHTML).toMatch("Order Summary");
    });

    it("renders 'page not found' message on non-exist route", () => {
      const { container } = renderWithRouter(
        () => <App />,
        "/this-route-does-not-exist"
      );
      expect(container.innerHTML).toMatch("Page not found");
    });
  });

  // testing home component
  it("renders Home component on root route", () => {
    const history = createMemoryHistory();
    history.push("/");
    const { container } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(container.innerHTML).toMatch("Home");
  });
});
