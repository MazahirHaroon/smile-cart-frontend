import { useEffect, useState } from "react";

import productsApi from "apis/product";
import { Header, Loader } from "components/commons";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty, without } from "ramda";

import Item from "./item";

const List = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm);

  useEffect(() => {
    fetchList();
  }, [debouncedSearchTerm]);

  const fetchList = async () => {
    try {
      const response = await productsApi.fetch({
        searchTerm: debouncedSearchTerm,
      });
      setProducts(response.products);
    } catch (error) {
      console.error("Something went wrong", error);
    } finally {
      setIsLoading(true);
    }
  };

  const toggleCart = slug =>
    setCartItems(prevCartItems =>
      prevCartItems.includes(slug)
        ? without([slug], prevCartItems)
        : [slug, ...prevCartItems]
    );

  return isLoading ? (
    <div className="flex flex-col">
      <Header
        cartItemsCount={cartItems.length}
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 p-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map(({ name, slug, offerPrice, imageUrl }) => (
            <Item
              isInCart={cartItems.includes(slug)}
              key={slug}
              toggleCart={() => toggleCart(slug)}
              {...{ name, slug, offerPrice, imageUrl }}
            />
          ))}
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default List;
