import { useState } from "react"; 
import { defaultImage } from "util/images";

import styles from "./Avatar.module.css";

type Props = {
  src: string;
  alt: string;
  className: string;
};

export default function Avatar({ src, alt, className }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(defaultImage);
  };

  return (
    <img className={className} src={imgSrc} alt={alt} onError={handleError} />
  );
}
