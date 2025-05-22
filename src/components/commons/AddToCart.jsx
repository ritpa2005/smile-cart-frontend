import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Toastr } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./ProductQuantity";

const AddToCart = ({ slug }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: product = {} } = useShowProduct(slug);
  const { available_quantity: availableQuantity } = product;

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

  return <ProductQuantity {...{ slug }} />;
};

export default AddToCart;
