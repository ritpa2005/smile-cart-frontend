import { Button } from "neetoui";
import routes from "routes";

const BuyNow = onClick => (
  <Button
    className="bg-neutral-800 hover:bg-neutral-950"
    label="Buy now"
    size="large"
    to={routes.checkout}
    onClick={onClick}
  />
);

export default BuyNow;
