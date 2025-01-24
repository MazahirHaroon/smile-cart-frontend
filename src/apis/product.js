import axios from "axios";

const show = async slug => {
  try {
    return await axios.get(`products/${slug}`);
  } catch (error) {
    throw new Error(`Something went wrong, ${error}`);
  }
};

const fetch = async () => {
  try {
    const products = await axios.get("products");
    console.log(products);

    return products;
  } catch (error) {
    throw new Error(`Something went wrong, ${error}`);
  }
};

const produtsApi = { show, fetch };

export default produtsApi;
