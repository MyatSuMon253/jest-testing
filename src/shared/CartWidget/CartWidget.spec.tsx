import { fireEvent } from "@testing-library/react";
import { useCartContext } from "../../CartContext";
import { CartWidget } from "./CartWidget";

jest.mock("../../CartContext", () => ({
  useCartContext: jest.fn(),
}));

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>;

describe("CartWidget", () => {
  it.todo("shows the amount of products in the cart", () => {
    useCartContextMock.mockReturnValue({
        products: [{
            name: "Product foo",
            price: 0,
            image: "image.png",
        }]
    })

    const {container} = renderWithRouter(() => <CartWidget/>);
    expect(container.innerHTML).toMatch("1")
  });

  it.todo("navigate to cart summary page on click", () => {
    useCartContextMock.mockReturnValue({
      products: [],
    });
    const { getByRole, history } = renderWithRouter(() => CartWidget);
    fireEvent.click(getByRole("link"));
    expect(history.location.pathname).toEqual("/cart");
  });
});
