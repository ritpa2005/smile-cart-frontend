import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Toastr } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ availableQuantity, slug }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = () => {
    if (availableQuantity >= 1) setSelectedQuantity(1);
    else {
      Toastr.error(`No units are available`, { autoClose: 2000 });
      setSelectedQuantity(0);
    }
  };

  if (isNil(selectedQuantity)) {
    return <Button label="Add to cart" size="large" onClick={handleClick} />;
  }

  return <ProductQuantity {...{ slug, availableQuantity }} />;
};

export default AddToCart;
