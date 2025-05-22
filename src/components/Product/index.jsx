import {
  Header,
  PageNotFound,
  PageLoader,
  AddToCart,
  BuyNow,
} from "components/commons";
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { Typography } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const { slug } = useParams();
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);

  const {
    name,
    description,
    mrp,
    offer_price: offerPrice,
    image_url: imageUrl,
    image_urls: imageUrls,
  } = product;
  const discount = (((mrp - offerPrice) / mrp) * 100).toFixed(1);

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrls) ? (
            <Carousel />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer Price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discount}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
            <BuyNow onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
