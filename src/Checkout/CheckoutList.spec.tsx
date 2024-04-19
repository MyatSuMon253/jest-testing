import { render } from "@testing-library/react";
import { Product } from "../shared/types";
import { CheckoutList } from "./CheckoutList";

describe("CheckoutList", () => {
  it("renders the list of products", () => {
    const procuts: Product[] = [
      {
        name: "Product foo",
        price: 10,
        image: "image.png",
      },
      {
        name: "Product bar",
        price: 10,
        image: "image.png",
      },
    ];

    const { container } = render(<CheckoutList products={procuts} />);
    expect(container.innerHTML).toMatch("Product foo");
  });
});
