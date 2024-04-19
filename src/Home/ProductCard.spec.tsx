import { fireEvent, render } from "@testing-library/react";
import { useCartContext } from "../CartContext";
import { Product } from "../shared/types";
import { ProductCard } from "./ProductCard";

jest.mock("../CartContext", () => ({
  useCartContext: jest.fn(),
}));

const useCartContextMock = useCartContext as unknown as jest.Mock<
  Partial<ReturnType<typeof useCartContext>>
>;

describe("ProductCard", () => {
  const product: Product = {
    name: "Product foo",
    price: 55,
    image: "/test.jpg",
  };
  it("renders correctly", () => {
    useCartContextMock.mockReturnValue({
      addToCart: () => {},
      products: [product],
    });
    const { container, getByRole } = render(<ProductCard data={product} />);
    expect(container.innerHTML).toMatch("Product foo");
    expect(container.innerHTML).toMatch("55 Zm");
    expect(getByRole("img")).toHaveAttribute("src", "/test.jpg");
  });

  describe("when product is in cart", () => {
    it("the `Add to cart` button is disabled", () => {
      useCartContextMock.mockReturnValue({
        addToCart: () => {},
        products: [product],
      });
      const { getByRole } = render(<ProductCard data={product} />);
      expect(getByRole("button")).toBeDisabled();
    });
  });

  describe("when product is not in cart", () => {
    describe("on `Add to cart` button click", () => {
      it("calls `addToCart` function with product data", () => {
        const addToCart = jest.fn();
        useCartContextMock.mockReturnValue({
          addToCart,
          products: [],
        });
        const { getByText } = render(<ProductCard data={product} />);
        fireEvent.click(getByText("Add to cart"));
        expect(addToCart).toHaveBeenCalledWith(product);
      });
    });
  });
});
