import classNames from "classnames";
import BuyNow from "components/commons/BuyNow";
import { t } from "i18next";
import { Typography } from "neetoui";
import { keys } from "ramda";
import { Trans } from "react-i18next";
import useCartItemsStore from "stores/useCartItemsStore";

const PriceCard = ({ totalMrp, totalOfferPrice }) => {
  const totalDiscounts = totalMrp - totalOfferPrice;
  const isDiscountPresent = totalDiscounts > 0;
  const discountPercentage = ((totalDiscounts / totalMrp) * 100).toFixed(1);

  const itemsCount = useCartItemsStore(store => keys(store.cartItems).length);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black space-y-2 border p-3">
      <Typography
        className={classNames("flex justify-between", {
          "line-through": isDiscountPresent,
        })}
      >
        <Trans i18nKey="totalMrp" />
      </Typography>
      {isDiscountPresent && (
        <>
          <Typography className="flex justify-between text-green-700">
            <Trans
              components={{ span: <span /> }}
              i18nKey="totalDiscounts"
              values={{ discounts: totalDiscounts, discountPercentage }}
            />
          </Typography>
          <Typography className="flex justify-between">
            <Trans
              components={{ span: <span /> }}
              i18nKey="offerPrice"
              values={{ offerPrice: totalOfferPrice }}
            />
          </Typography>
          <span className="neeto-ui-text-gray-500 text-sm">
            {t("itemCount", { count: itemsCount })}
          </span>
        </>
      )}
      <div className="flex flex-col items-center pt-4">
        <BuyNow />
      </div>
    </div>
  );
};
export default PriceCard;
