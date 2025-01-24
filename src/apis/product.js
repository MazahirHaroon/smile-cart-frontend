import axios from "axios";

const show = async slug => {
  try {
    return await axios.get(`products/${slug}`);
  } catch (error) {
    throw new Error(`Something went wrong, ${error}`);
  }
};

const fetch = async params => {
  try {
    return await axios.get("products", { params });
  } catch (error) {
    throw new Error(`Something went wrong, ${error}`);
  }
};

const produtsApi = { show, fetch };

export default produtsApi;
