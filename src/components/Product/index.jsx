import { useEffect, useState } from "react";

import productsApi from "apis/product";
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
      const product = await productsApi.show();
      setProduct(product);
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
    imageUrl: defaultImageUrl,
    imageUrls,
    mrp: MRP,
    offerPrice,
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
