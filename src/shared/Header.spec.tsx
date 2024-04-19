import { fireEvent } from "@testing-library/react";
import { Header } from "./Header";

jest.mock("./CartWidget", () => ({ CartWidget: () => <div>Cart Widget</div> }));

describe("Header", () => {
  it.todo("renders correctly", () => {
    const { container } = renderWithRouter(() => <Header />);
    expect(container.innerHTML).toMatch("Goblin Store");
    expect(container.innerHTML).toMatch("Cart Widget");
  });
  it.todo("navigate to / on header title click" , () => {
    const {getByText, history} = renderWithRouter(() => <Header />);
    fireEvent.click(getByText("Goblin Store"));
    expect(history.location.pathname).toBe("/")
  });

});
