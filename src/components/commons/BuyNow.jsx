import { Button } from "neetoui";
import { useTranslation } from "react-i18next";
import routes from "routes";

const BuyNow = () => {
  const { t } = useTranslation();

  return (
    <Button
      className="bg-neutral-800 hover:bg-neutral-950"
      label={t("buyNow")}
      size="large"
      to={routes.checkout}
    />
  );
};

export default BuyNow;
