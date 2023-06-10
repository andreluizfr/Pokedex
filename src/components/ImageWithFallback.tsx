import fallbackImage from '../../public/default-fallback-image.png';
import { ImgHTMLAttributes, useState } from 'react';
interface ImageWithFallbackProps extends ImgHTMLAttributes<HTMLImageElement>{
}

const ImageWithFallback = ({src, alt, ...props}: ImageWithFallbackProps) => {

  const [error, setError] = useState(false);

  return ( 
    <img
      alt={alt}
      src={error ? (fallbackImage as unknown as string) : src as unknown as string}
      onError={()=>setError(true)}
      {...props}
    />
  )
}

export default ImageWithFallback;