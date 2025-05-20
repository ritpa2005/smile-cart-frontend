import { useState, useEffect } from "react";

import productsApi from "apis/products";
import { Typography, Spinner } from "neetoui";
import { append, isNotNil } from "ramda";

import Carousel from "./Carousel";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await productsApi.show();
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const { name, description, mrp, offer_price, image_url, image_urls } =
    product;
  const discount = (((mrp - offer_price) / mrp) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="px-6 pb-6">
      <div>
        <Typography className="py-2 text-4xl font-semibold">{name}</Typography>
        <hr className="border-2 border-black" />
      </div>
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(image_urls) ? (
            <Carousel
              imageUrls={append(image_url, image_urls)}
              title="Infinix Inbook"
            />
          ) : (
            <img alt={name} className="w-48" src={image_url} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer Price: {offer_price}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discount}% off
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Product;
