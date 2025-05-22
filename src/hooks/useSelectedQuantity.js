import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

const useSelectedQuantity = slug => {
  const [selectedQuantity, setSelectedQuantity] = useCartItemsStore(
    state => [state.cartItems[slug], state.setSelectedQuantity],
    shallow
  );

  const updateSelectedQuantity = quantity =>
    setSelectedQuantity(slug, quantity);

  return { selectedQuantity, setSelectedQuantity: updateSelectedQuantity };
};

export default useSelectedQuantity;
