import { useEffect, useState, useRef, JSX } from "react";
import viteLogo from "@/assets/img/Vite.png";

const size = 64;
const googleFaviconAPI = (url: string) => {
  const hostName = new URL(url).hostname;
  return `https://s2.googleusercontent.com/s2/favicons?domain_url=https://${hostName}&sz=${size}`;
};
const chromeFaviconApi = (url: string) => {
  return viteLogo;
};

const Favicon = ({ src, ...props }: JSX.IntrinsicElements["img"]) => {
  const googleFavicon = googleFaviconAPI(src || "");
  const chromeFavicon = chromeFaviconApi(src || "");
  const [logoSrc, setLogoSrc] = useState<string>(googleFavicon);
  const imgRef = useRef<HTMLImageElement>(null);
  const isGoogleFavicon = logoSrc === googleFavicon;

  useEffect(() => {
    if (src) setLogoSrc(googleFavicon);
  }, [src]);

  if (!src) return null;

  const handleImageError = () => {
    if (isGoogleFavicon) setLogoSrc(chromeFavicon);
  };

  const handleImageLoad = () => {
    if (!imgRef.current) return;
    const { naturalWidth, naturalHeight } = imgRef.current;
    if (naturalWidth === 16 && naturalHeight === 16 && isGoogleFavicon) {
      setLogoSrc(chromeFavicon);
    }
  };

  return (
    <img
      ref={imgRef}
      src={logoSrc}
      alt="Favicon"
      onError={handleImageError}
      onLoad={handleImageLoad}
      {...props}
    />
  );
};

export { Favicon, chromeFaviconApi, googleFaviconAPI };
export default Favicon;
