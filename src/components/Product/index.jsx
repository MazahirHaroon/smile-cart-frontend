import Details from "./Details";
import Header from "./Header";
import Image from "./Image";

const Product = () => (
  <div className="px-6 pb-6">
    <Header text="Infinix INBOOK" />
    <div className="w-2/5">
      <Image
        altText="Infinix INBOOK"
        imageURL="https://ik.imagekit.io/d9mvewbju/SmileCart/thumbnail_61_7PaLfb.jpg"
      />
    </div>
    <div className="w-3/5 space-y-4">
      <Details
        detailsText="Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey - 1 Year Warranty."
        discountPercentage={6}
        priceDetails={{
          amount: "395.97",
          currency: "$",
          offerPrice: "374.43",
        }}
      />
    </div>
  </div>
);

export default Product;
