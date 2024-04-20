import { act, render } from "@testing-library/react";
import { getProducts } from "../utils/api";
import { useProducts } from "./useProducts";

jest.mock("../utils/api", () => ({
  getProducts: jest.fn(),
}));

const getProductsMock = getProducts as unknown as jest.Mock<
  Partial<ReturnType<typeof getProducts>>
>;

describe("useProducts", () => {
  it("fetches products on mount", async () => {
    await act(async () => {
      renderHook(() => useProducts());
    });
    expect(getProductsMock).toHaveBeenCalled();
  });

  describe("while waiting API response", () => {
    it("return correct loading state data", () => {
      getProductsMock.mockReturnValue(new Promise(() => {}));

      const { result } = renderHook(() => useProducts());
      expect(result.current.isLoading).toEqual(true);
      expect(result.current.error).toEqual(false);
      expect(result.current.categories).toEqual([]);
    });
  });

  describe("with error response", () => {
    it("return error state data", async () => {
      getProductsMock.mockReturnValue(
        new Promise((resolve, reject) => {
          reject("Error");
        })
      );

      const { result, waitForNextUpdate } = renderHook(() => useProducts());

      await act(() => waitForNextUpdate());
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.error).toEqual("Error");
      expect(result.current.categories).toEqual([]);
    });
  });

  describe("with successful response", () => {
    it("return successful state data", async () => {
      getProductsMock.mockReturnValue(
        new Promise((resolve, reject) => {
          resolve({
            categories: [
              {
                name: "Category",
                items: [],
              },
            ],
          });
        })
      );

      const { result, waitForNextUpdate } = renderHook(() => useProducts());

      await act(() => waitForNextUpdate());
      expect(result.current.isLoading).toEqual(false);
      expect(result.current.error).toEqual(false);
      expect(result.current.categories).toEqual([
        {
          name: "Category",
          items: [],
        },
      ]);
    });
  });
});
