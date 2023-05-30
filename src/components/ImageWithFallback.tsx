import Image, { ImageProps } from 'next/image';
import fallbackImage from '../../public/default-fallback-image.png';
import { useState } from 'react';

interface ImageWithFallbackProps extends ImageProps{
}

const ImageWithFallback = ({src, alt, ...props}: ImageWithFallbackProps) => {

  const [error, setError] = useState(false);

  return ( 
    <Image
      alt={alt}
      src={error ? fallbackImage : src}
      onError={()=>setError(true)}
      {...props}
    />
  )
}

export default ImageWithFallback;