import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},
      setSelectedQuantity: (slug, quantity) =>
        set(({ cartItems }) => {
          if (Number(quantity) <= 0) {
            return { cartItems: dissoc(slug, cartItems) };
          }

          return { cartItems: assoc(slug, String(quantity), cartItems) };
        }),
      removeCartItem: slug =>
        set(state => evolve({ cartItems: dissoc(slug) }, state)),
      clearCart: () => set({ cartItems: {} }),
    }),
    {
      name: "cart-items-store",
    }
  )
);

export default useCartItemsStore;
