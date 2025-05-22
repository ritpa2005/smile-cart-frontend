import { Button, Toastr } from "neetoui";
import { isNil } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ availableQuantity, slug }) => {
  const [selectedQuantity, setQuantity] = useCartItemsStore(
    state => [state.cartItems[slug], state.setSelectedQuantity],
    shallow
  );

  const setSelectedQuantity = q => setQuantity(slug, String(q));

  const handleClick = () => {
    if (availableQuantity >= 1) setSelectedQuantity(1);
    else {
      Toastr.error(`No units are available`, { autoClose: 2000 });
      setSelectedQuantity(0);
    }
  };

  if (isNil(selectedQuantity)) {
    return (
      <Button
        className="flex-shrink-0"
        label="Add to cart"
        size="medium"
        onClick={handleClick}
      />
    );
  }

  return <ProductQuantity {...{ slug, availableQuantity }} />;
};

export default AddToCart;
