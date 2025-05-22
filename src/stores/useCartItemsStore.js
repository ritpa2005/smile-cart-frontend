import { assoc, dissoc, evolve } from "ramda";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartItemsStore = create(
  persist(
    set => ({
      cartItems: {},
      hasHydrated: false,
      setSelectedQuantity: (slug, quantity) =>
        set(({ cartItems }) => {
          if (Number(quantity) <= 0) {
            return { cartItems: dissoc(slug, cartItems) };
          }

          return { cartItems: assoc(slug, String(quantity), cartItems) };
        }),
      removeCartItem: slug =>
        set(state => evolve({ cartItems: dissoc(slug) }, state)),
      setHasHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: "cart-items-store",
      onRehydrateStorage: () => state => {
        state.setHasHydrated();
      },
    }
  )
);

export default useCartItemsStore;
