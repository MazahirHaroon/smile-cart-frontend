import axios from "axios";

const show = async () => {
  try {
    return await axios.get("products/infinix-inbook-2");
  } catch (error) {
    return `Something went wrong, ${error}`;
  }
};

const produtsApi = { show };

export default produtsApi;
