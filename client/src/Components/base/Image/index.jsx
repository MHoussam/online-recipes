import React from "react";
import '../../../styles/navbar.css';

const Image = ({ src, alt, className }) => {
//   const clickHandler = () => {
//     onClick();
//   };

  return (
    <img src={src} alt={alt} className={className} />
  );
};

export default Image;
