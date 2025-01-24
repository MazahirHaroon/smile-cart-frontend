import { useEffect, useState } from "react";

import productsApi from "apis/product";
import { Header, Loader } from "components/commons";

import Item from "./item";

const List = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState({});

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await productsApi.fetch();
      setProducts(response.products);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setIsLoading(true);
    }
  };

  return isLoading ? (
    <div className="flex flex-col">
      <Header shouldShowBackButton={false} title="Smile Cart" />
      <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map(({ name, slug, offerPrice, imageUrl }) => (
          <Item key={slug} {...{ name, slug, offerPrice, imageUrl }} />
        ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default List;
