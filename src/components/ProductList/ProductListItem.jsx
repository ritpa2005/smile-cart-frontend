import AddToCart from "components/commons/AddToCart";
import { Typography } from "neetoui";
import { Link } from "react-router-dom";

const ProductListItem = ({
  imageUrl,
  name,
  offerPrice,
  slug,
  availableQuantity,
}) => (
  <div className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4">
    <Link
      className="flex w-48 flex-col items-center justify-between"
      to={`products/${slug}`}
    >
      <img alt={name} className="h-40 w-40" src={imageUrl} />
      <Typography className="text-center" weight="semibold">
        {name}
      </Typography>
      <Typography>${offerPrice}</Typography>
    </Link>
    <AddToCart {...{ availableQuantity, slug }} />
  </div>
);

export default ProductListItem;
