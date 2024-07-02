import React, { useState, useRef, useEffect } from "react";

const LazyImage = ({ src, alt, className,placeholderSrc, ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // IntersectionObserver threshold
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
        observer.disconnect()
    };
  }, []);

  return (
    <img
      loading="lazy"
      ref={imageRef}
      src={isVisible ? src : placeholderSrc}
      alt={alt}
      className={className}
      {...rest}
    />
  );
};

export default LazyImage;
