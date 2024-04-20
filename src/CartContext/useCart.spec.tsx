import { act } from "@testing-library/react";
import { Product } from "../shared/types";
import { useCart } from "./useCart";

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    clear: () => {
      store = {};
    },
    getItem: (key: string) => {
      return store[key] || null;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    setItem: (key: string, value: string) => {
      store[key] = value ? value.toString() : "";
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useCart", () => {
  afterEach(() => {
    localStorageMock.clear();
    jest.restoreAllMocks();
  });

  describe("on mount", () => {
    it("it loads the data from the localStorage", () => {
      const products: Product[] = [
        {
          name: "Product foo",
          price: 10,
          image: "image.png",
        },
      ];
      localStorageMock.setItem("products", JSON.stringify(products));

      const { result } = renderHook(() => useCart());
      expect(result.current.products).toEqual(products);
    });
  });

  describe("#addToCart", () => {
    it("adds the item to the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 0,
        image: "image.png",
      };

      const { result } = renderHook(() => useCart());
      const setItemSpy = jest.spyOn(localStorageMock, "setItem");

      act(() => {
        result.current.addToCart(product);
      });

      expect(result.current.products).toEqual([product]);
      expect(setItemSpy).toHaveBeenCalledWith(
        "products",
        JSON.stringify([product])
      );
      setItemSpy.mockRestore();
    });
  });

  describe("#removeFromCart", () => {
    it("removes the item from the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 0,
        image: "image.jpg",
      };

      localStorageMock.setItem("products", JSON.stringify([product]));

      const { result } = renderHook(() => useCart());
      const setItemSpy = jest.spyOn(localStorageMock, "setItem");

      act(() => {
        result.current.removeFromCart(product);
      });

      expect(result.current.products).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]");
      setItemSpy.mockRestore();
    });
  });

  describe("#totalPrice", () => {
    it("returns the total products price", () => {
      const product: Product = {
        name: "Product foo",
        price: 21,
        image: "image.png",
      };

      localStorageMock.setItem("products", JSON.stringify([product, product]));

      const { result } = renderHook(() => useCart());

      expect(result.current.totalPrice).toEqual(42);
    });
  });

  describe("#clearCart", () => {
    it("removes all the products from the cart", () => {
      const product: Product = {
        name: "Product foo",
        price: 0,
        image: "image.png",
      };

      localStorageMock.setItem("products", JSON.stringify([product, product]));

      const { result } = renderHook(() => useCart());
      const setItemSpy = jest.spyOn(localStorageMock, "setItem");

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.products).toEqual([]);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]");
      setItemSpy.mockRestore();
    });
  });
});
