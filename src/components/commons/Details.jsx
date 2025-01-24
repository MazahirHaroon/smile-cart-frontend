import { Typography } from "neetoui";

const Details = ({
  detailsText,
  priceDetails: { amount, currency, offerPrice },
  discountPercentage,
}) => (
  <div>
    <Typography>{detailsText}</Typography>
    <Typography>
      MRP {currency}
      {amount}
    </Typography>
    <Typography className="font-semibold">
      Offer price: {currency}
      {offerPrice}
    </Typography>
    <Typography className="font-semibold text-green-600">
      {discountPercentage}% off
    </Typography>
  </div>
);

export default Details;
