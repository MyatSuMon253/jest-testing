import { fireEvent } from "@testing-library/react";
import { CartItem } from "./CartItem";

describe("CartItem", () => {
  const product: Product = {
    name: "Product foo",
    price: 100,
    image: "image/source.png",
  };

  it("renders correctly", () => {
    const { container, getByAllText } = renderWithRouter(() => (
      <CartItem product={product} removeFromCart={() => {}} />
    ));
    expect(container.innerHTML).toMatch("Product foo");
    expect(container.innerHTML).toMatch("100 Zm");
    expect(getByAllText("Product foo")).toHaveAttribute(
      "src",
      "image/source.png"
    );
  });

  describe("on 'Remove' click", () => {
    it("calls the passed in function", () => {
      const removeFromCartMock = jest.fn();
      const { getByText } = renderWithRouter(() => (
        <CartItem product={product} removeFromCart={removeFromCartMock} />
      ));
      fireEvent.click(getByText("Remove"));
      expect(removeFromCartMock).toBeCalled(product);
    });
  });
});
