import { useState, useEffect } from "react";

import classNames from "classnames";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timerId = setInterval(handleNext, 3000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex(prevState =>
      prevState + 1 === imageUrls.length ? 0 : prevState + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex(prevState =>
      prevState - 1 < 0 ? imageUrls - 1 : prevState - 1
    );
  };

  return (
    <div className="flex items-center">
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <img {...{ altText }} src={imageUrls[currentIndex]} />
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNext}
      />
      <div className="flex space-x-1">
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={classNames(
              "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border",
              { "neeto-ui-bg-black": index === currentIndex }
            )}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
