import { fireEvent, render } from "@testing-library/react";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("renders correctly", () => {
    const { getByLabelText } = render(
      <FormField label="Foo label" name="foo" />
    );
    const input = getByLabelText("Foo label:");
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveClass("is-error");
    expect(input).toHaveAttribute("name", "foo");
  });

  describe("with errors", () => {
    it("renders error message", () => {
      const { getByText } = render(
        <FormField
          label="Foo label"
          name="foo"
          errors={{ message: "Example error" }}
        />
      );
      expect(getByText("Error: Example error")).toBeInTheDocument();
    });
  });

  describe("on change", () => {
    it("normalize the input", () => {
      const { getByLabelText } = render(
        <FormField
          label="Foo label"
          name="foo"
          normalize={(value: string) => value.toUpperCase()}
        />
      );
      const input = getByLabelText("Foo label:") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "test" } });

      expect(input.value).toEqual("TEST");
    });
  });
});
