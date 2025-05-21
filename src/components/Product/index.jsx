import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Header, PageNotFound, PageLoader } from "components/commons";
import AddToCart from "components/commons/AddToCart";
import { Typography } from "neetoui";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { slug } = useParams();
  const fetchProduct = async () => {
    try {
      const product = await productsApi.show(slug);
      setProduct(product);
    } catch (e) {
      setIsError(true);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchProduct();
  }, []);

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
            <Carousel
              imageUrls={append(imageUrl, imageUrls)}
              title="Infinix Inbook"
            />
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
          <AddToCart {...{ slug }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
