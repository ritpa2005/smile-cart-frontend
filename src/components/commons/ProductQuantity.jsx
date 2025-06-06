import { useRef } from "react";

import { TooltipWrapper } from "components/commons";
import { VALID_COUNT_REGEX } from "components/constants";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Input, Toastr } from "neetoui";

const ProductQuantity = ({ slug }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { data: product = {} } = useShowProduct(slug);
  const { available_quantity: availableQuantity } = product;

  const countInputFocus = useRef(null);
  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  const isNotValidQuantity = parsedSelectedQuantity >= availableQuantity;
  // const preventNavigation = e => {
  //   e.stopPropagation();
  //   e.preventDefault();
  // };

  const handleSetCount = event => {
    const value = event.target.value;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;
    console.log(localStorage.getItem("cart-items-store"));
    if (isNotValidInputQuantity) {
      Toastr.error(`Only ${availableQuantity} units are available`, {
        autoClose: 2000,
      });
      setSelectedQuantity(availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center justify-between border">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={() => {
          setSelectedQuantity(parsedSelectedQuantity - 1);
        }}
      />
      <Input
        nakedInput
        className="ml-2 text-center"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
      />
      <TooltipWrapper
        content="Reached maximum units"
        position="top"
        showTooltip={isNotValidQuantity}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={() => {
            setSelectedQuantity(parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};

export default ProductQuantity;
