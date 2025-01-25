import { useEffect, useState } from "react";

const useDebounce = value => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 350);

    return () => clearInterval(timerId);
  }, [value]);

  return debouncedValue;
};

export default useDebounce;
