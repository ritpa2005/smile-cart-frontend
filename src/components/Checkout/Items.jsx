import { cartTotalOf } from "components/utils";
import { useFormikContext } from "formik";
import { useFetchCartProducts } from "hooks/reactQuery/useProductsApi";
import { Button } from "neetoui";
import { keys } from "ramda";
import { useTranslation } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import PriceEntry from "./PriceEntry";
import Product from "./Product";

const Items = ({ isSubmitDisabled }) => {
  const { t } = useTranslation();

  const slugs = useCartItemsStore(store => keys(store.cartItems), shallow);

  const { data: products = [] } = useFetchCartProducts(slugs);

  const totalCheckoutPrice = cartTotalOf(products, "offer_price");

  const { isValid, isSubmitting } = useFormikContext();

  return (
    <div className="flex h-full flex-col p-10">
      {products.map(product => (
        <Product
          imageUrl={product.image_url}
          key={product.slug}
          offerPrice={product.offer_price}
          {...product}
        />
      ))}
      <div className="mt-5 w-3/4 space-y-3">
        <PriceEntry i18nKey="subtotal" totalPrice={totalCheckoutPrice} />
        <PriceEntry className="text-green-700" i18nKey="deliveryCharges" />
        <div className="neeto-ui-border-black border-t border-dashed" />
        <PriceEntry
          i18nKey="totalPayablePrice"
          totalPrice={totalCheckoutPrice}
        />
      </div>
      <div className="mt-auto flex justify-center">
        <Button
          className="bg-neutral-800 w-1/3 justify-center"
          disabled={isSubmitDisabled || !isValid || isSubmitting}
          label={t("confirmOrder")}
          type="submit"
        />
      </div>
    </div>
  );
};

export default Items;
