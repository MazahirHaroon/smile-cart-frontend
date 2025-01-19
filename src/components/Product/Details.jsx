const Details = ({
  detailsText,
  priceDetails: { amount, currency, offerPrice },
  discountPercentage,
}) => (
  <div>
    <p>{detailsText}</p>
    <p>
      MRP {currency}
      {amount}
    </p>
    <p className="font-semibold">
      Offer price: {currency}
      {offerPrice}
    </p>
    <p className="font-semibold text-green-600">{discountPercentage}% off</p>
  </div>
);

export default Details;
