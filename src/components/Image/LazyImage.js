import { useEffect, useState, useCallback } from "react";
import { Spinner } from "../Spinner/Spinner";
export const LazyImage = ({ src, placeholderImg, ...props }) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);
  const [displaySpinner, setDisplaySpinner] = useState(false);

  const onLoad = useCallback(() => {
    setSrc(src);
    setDisplaySpinner(false);
  }, [src]);

  useEffect(() => {
    const img = new Image();
    setDisplaySpinner(true);
    img.src = src;
    img.addEventListener("load", onLoad);

    return () => {
      img.removeEventListener("load", onLoad);
    };
  }, [src, onLoad]);

  return (
    <>
      <Spinner visible={displaySpinner} />

      <img
        {...props}
        alt={imgSrc}
        src={imgSrc}
        onLoad={onLoad}
        visible={!displaySpinner}
      />
    </>
  );
};
