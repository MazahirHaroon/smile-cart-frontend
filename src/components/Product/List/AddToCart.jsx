import { Button } from "neetoui";

const AddToCart = ({ isInCart, toggleCart }) => {
  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    toggleCart();
  };

  return (
    <Button
      label={isInCart ? "Remove from cart" : "Add to cart"}
      size="large"
      onClick={e => handleClick(e)}
    />
  );
};

export default AddToCart;
