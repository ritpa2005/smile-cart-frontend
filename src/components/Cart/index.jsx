import { useEffect, useState } from "react";

import productsApi from "apis/products";
import { PageLoader } from "components/commons";
import Header from "components/commons/Header";
import { cartTotalOf } from "components/utils";
import { NoData, Toastr } from "neetoui";
import { keys, isEmpty } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";
import { shallow } from "zustand/shallow";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [cartItems, setSelectedQuantity, removeCartItem] = useCartItemsStore(
    state => [state.cartItems, state.setSelectedQuantity, state.removeCartItem],
    shallow
  );

  const totalMrp = cartTotalOf(products, "mrp");
  const totalOfferPrice = cartTotalOf(products, "offer_price");

  const fetchCartProducts = async () => {
    try {
      const slugs = keys(cartItems);
      const responses = await Promise.all(
        slugs.map(slug => productsApi.show(slug))
      );
      setProducts(responses);

      responses.forEach(({ name, slug, availableQuantity }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(
            `${name} is no longer available and has been removed from the cart`,
            { autoClose: 2000 }
          );
          removeCartItem(slug);
          fetchCartProducts();
        }
      });
    } catch (error) {
      console.log("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  if (isLoading) return <PageLoader />;

  if (isEmpty(products)) {
    return (
      <>
        <Header title="My Cart" />
        <div className="flex h-screen items-center justify-center">
          <NoData title="Your cart is empty!" />
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="My Cart" />
      <div className="mt-10 flex justify-center space-x-10">
        <div className="w-1/3 space-y-5">
          {products.map(product => (
            <ProductCard
              availableQuantity={product.available_quantity}
              imageUrl={product.image_url}
              key={product.slug}
              mrp={product.mrp}
              name={product.name}
              offerPrice={product.offer_price}
              slug={product.slug}
            />
          ))}
        </div>
        {totalMrp > 0 && (
          <div className="w-1/4">
            <PriceCard {...{ totalMrp, totalOfferPrice }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
