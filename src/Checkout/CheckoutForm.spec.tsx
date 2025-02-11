import { fireEvent, render, waitFor } from "@testing-library/react";
import { CheckoutForm } from "./CheckoutForm";
import { act } from "react-dom/test-utils";

describe("Checkout Form", () => {
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />);
    expect(container.innerHTML).toMatch("Cardholders Name");
    expect(container.innerHTML).toMatch("Card Number");
    expect(container.innerHTML).toMatch("Expiration Date");
    expect(container.innerHTML).toMatch("CVV");
  });

  describe("with initial inputs", () => {
    it("shows error", async () => {
      const { container, getByText } = render(<CheckoutForm />);
      await act(async () => {
        fireEvent.click(getByText("Place order"));
      });
      expect(container.innerHTML).toMatch("Error: ");
    });
  });

  describe("with valid input", () => {
    describe("on 'place order' button click", () => {
      it("calls submit function with form data", async () => {
        const mockSubmit = jest.fn();
        const { getByLabelText, getByText } = render(
          <CheckoutForm submit={mockSubmit} />
        );
        fireEvent.change(getByLabelText("Cardholders Name:"), {
          target: { value: "Bibo Bobbins" },
        });
        fireEvent.change(getByLabelText("Card Number:"), {
          target: { value: "0000 0000 0000 0000" },
        });
        fireEvent.change(getByLabelText("Expiration Date:"), {
          target: { value: "3020-05" },
        });
        fireEvent.change(getByLabelText("CVV:"), {
          target: { value: "123" },
        });
        fireEvent.click(getByText("Place order"));

        await waitFor(() => expect(mockSubmit).toHaveBeenCalled());
      });
    });
  });
});
