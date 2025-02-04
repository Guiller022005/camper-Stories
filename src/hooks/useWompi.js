import { useEffect, useState } from "react";

const useWompi = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkWompiLoaded = () => {
      if (window.WompiCheckoutWidget) {
        setIsLoaded(true);
      } else {
        setTimeout(checkWompiLoaded, 500); // Vuelve a intentar después de 500ms
      }
    };

    checkWompiLoaded();
  }, []);

  return { isLoaded };
};

export default useWompi;
