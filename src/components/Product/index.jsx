import { useEffect, useState } from "react";

import productsApi from "apis/product";
import {
  Header,
  Details,
  Carousel,
  Loader,
  PageNotFound,
} from "components/commons";
import { append, isNotNil } from "ramda";
import { useParams } from "react-router-dom";

const Product = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState({});
  const { slug } = useParams();

  const fetchProduct = async () => {
    try {
      const product = await productsApi.show(slug);
      setProduct(product);
    } catch {
      setIsError(true);
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

  if (isError) return <PageNotFound />;

  return isLoading ? (
    <div className="px-6 pb-6">
      <Header shouldShowBackButton title={name} />
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
