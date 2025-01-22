import { useEffect, useState } from "react";

import axios from "axios";
import { append, isNotNil } from "ramda";

import Carousel from "../../Utils/Carousel";
import Details from "../../Utils/Details";
import Header from "../../Utils/Header";
import Loader from "../../Utils/Loader";

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({});
  const fetchProduct = async () => {
    try {
      const url =
        "https://smile-cart-backend-staging.neetodeployapp.com/products/infinix-inbook-2";
      const response = await axios.get(url);
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      setProduct(response.data);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const {
    name,
    description,
    image_urls: defaultImageUrl,
    image_urls: imageUrls,
    mrp: MRP,
    offer_price: offerPrice,
  } = product;
  const totalDiscounts = MRP - offerPrice;
  const discountPercentage = ((totalDiscounts / MRP) * 100).toFixed(1);

  return isLoading ? (
    <div className="px-6 pb-6">
      <Header text={name} />
      <div className="w-2/5">
        {isNotNil(imageUrls) ? (
          <Carousel
            altText="Infinix Inbook"
            imageUrls={append(defaultImageUrl, imageUrls)}
          />
        ) : (
          <img alt={name} className="w-48" src={defaultImageUrl} />
        )}
      </div>
      <div className="w-3/5 space-y-4">
        <Details
          detailsText={description}
          discountPercentage={discountPercentage}
          priceDetails={{
            amount: MRP,
            currency: "$",
            offerPrice,
          }}
        />
      </div>
    </div>
  ) : (
    <Loader />
  );
};
export default Product;
