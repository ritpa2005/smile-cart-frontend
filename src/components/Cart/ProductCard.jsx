import { memo, useState } from "react";

import ProductQuantity from "components/commons/ProductQuantity";
import { Delete } from "neetoicons";
import { Typography, Alert } from "neetoui";
import { prop } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

const ProductCard = ({ slug, imageUrl, offerPrice, mrp, name }) => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  const removeCartItem = useCartItemsStore(prop("removeCartItem"));

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-4">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer price: ${offerPrice}</Typography>
        </div>
        <div className="flex flex-shrink-0 items-center space-x-2">
          <ProductQuantity {...{ slug }} />
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel="Yes, remove"
            title="Remove item?"
            message={
              <Typography>
                You are removing <strong>{name}</strong> from cart. Do you want
                to continue?
              </Typography>
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => {
              removeCartItem(slug);
              console.log(localStorage.getItem("cart-items-store"));
              setShouldShowDeleteAlert(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
