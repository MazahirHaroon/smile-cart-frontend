import { useState, useEffect } from "react";

import ProductsApi from "apis/product";
import { Header, Loader } from "components/commons";
import { MRP, OFFER_PRICE } from "components/constant";
import { cartTotalOf } from "components/utils";
import { NoData, Toastr } from "neetoui";
import { keys, isEmpty } from "ramda";
import useCartItemsStore from "stores/useCartItemsStore";

import PriceCard from "./PriceCard";
import ProductCard from "./ProductCard";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { cartItems, setSelectedQuantity } = useCartItemsStore();
  const slugs = keys(cartItems);
  const totalMrp = cartTotalOf(products, MRP);
  const totalOfferPrice = cartTotalOf(products, OFFER_PRICE);

  const fetchCartProducts = async () => {
    try {
      const cartProducts = await Promise.all(
        slugs.map(slug => ProductsApi.show(slug))
      );
      setProducts(cartProducts);
      cartProducts.forEach(({ availableQuantity, name, slug }) => {
        if (availableQuantity >= cartItems[slug]) return;

        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(
            `${name} is no longer available and has been removed from cart`,
            {
              autoClose: 2000,
            }
          );
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("hu");
    fetchCartProducts();
  }, [cartItems]);

  if (isLoading) return <Loader />;

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
            <ProductCard key={product.slug} {...product} />
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
