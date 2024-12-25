import { useEffect, useState, useRef, JSX, useMemo } from "react";
import favicon from "@/assets/img/favicon/favicon.png";
import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { useTheme } from "@mui/material/styles";
import { StaticPagesType } from "@/types/slice/widgets";

const size = 64;
const googleFaviconAPI = (url: string) => {
  const hostName = new URL(url).hostname;
  return `https://s2.googleusercontent.com/s2/favicons?domain_url=https://${hostName}&sz=${size}`;
};
const chromeFaviconApi = (_: string) => {
  return favicon;
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

export function useFavicon() {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const {
    palette: {
      primary: { contrastText, main },
    },
  } = useTheme();
  const innerIconPaths: Record<StaticPagesType, string> = {
    todo: `<path d="M46.729 20.292a2.16 2.16 0 0 1 1.553-.24c.531.117.993.43 1.291.871l2.083 3.08a1.99 1.99 0 0 1 .328 1.362 2.02 2.02 0 0 1-.654 1.247l-.006.008-.029.026-.12.108-.473.439c-2.62 2.463-5.16 5.004-7.617 7.62-4.623 4.927-10.112 11.377-13.807 17.634a3.24 3.24 0 0 1-5.044.614L10.588 39.317c-.195-.197-.348-.43-.449-.685s-.147-.528-.137-.801.077-.542.196-.789.289-.47.498-.653l4.124-3.606a2.14 2.14 0 0 1 1.315-.523 2.15 2.15 0 0 1 1.358.406l6.963 5.06C35.331 27.33 41.498 23.341 46.729 20.292z" fill="${contrastText}"/>`,
    bookmark: `<path d="M41.445 21.686a52.29 52.29 0 0 0-16.885 0c-.998.162-1.922.616-2.649 1.302s-1.224 1.573-1.425 2.541a72.05 72.05 0 0 0-.302 27.555l.683 3.715c.048.259.167.501.345.7a1.5 1.5 0 0 0 .663.428 1.53 1.53 0 0 0 .794.036c.263-.058.505-.184.701-.366l8.224-7.634a2.07 2.07 0 0 1 2.817 0l8.224 7.634c.196.181.438.308.701.366a1.53 1.53 0 0 0 .794-.036 1.5 1.5 0 0 0 .663-.428c.177-.199.297-.44.345-.7l.683-3.715a72.05 72.05 0 0 0-.303-27.555c-.2-.968-.696-1.855-1.423-2.541a5.03 5.03 0 0 0-2.647-1.304" fill="${contrastText}"/>`,
    note: `<path d="M53 49.499a3.94 3.94 0 0 1-.322 1.569 4.3 4.3 0 0 1-.882 1.332c-.389.368-.841.666-1.333.881-.505.205-1.046.308-1.591.301-2.433-.041-4.864.19-7.245.688A20 20 0 0 0 33.65 57V24.956c2.346-1.117 4.859-1.844 7.439-2.149 2.626-.521 5.3-.759 7.977-.709a4.13 4.13 0 0 1 2.795 1.311 4.05 4.05 0 0 1 1.096 2.794L53 49.499zM29.35 24.956V57a19.89 19.89 0 0 0-7.847-2.729c-2.427-.491-4.899-.721-7.374-.688-.545.007-1.086-.095-1.591-.301a4.73 4.73 0 0 1-1.333-.881 3.87 3.87 0 0 1-.882-1.332c-.216-.495-.326-1.029-.322-1.569V26.074c.003-1.036.401-2.032 1.111-2.786s1.681-1.21 2.716-1.276c2.734-.069 5.467.169 8.148.709a23.01 23.01 0 0 1 7.375 2.235z" fill="${contrastText}"/>`,
    "habit-tracker": `<path d="M47 21.85v3.7c0 3.435-1.358 6.728-3.777 9.157S37.525 38.5 34.105 38.5h-1.842v1.85h9.211V53.3a3.71 3.71 0 0 1-1.079 2.616C39.704 56.61 38.767 57 37.79 57H23.053c-.977 0-1.914-.39-2.605-1.084a3.71 3.71 0 0 1-1.079-2.616V40.35h9.211V34.8a12.98 12.98 0 0 1 3.777-9.157c2.418-2.429 5.698-3.793 9.118-3.793H47zM18.447 20a13.75 13.75 0 0 1 6.352 1.55c1.963 1.02 3.654 2.499 4.929 4.313-1.946 2.569-2.997 5.709-2.992 8.937v1.85h-.921c-3.664 0-7.178-1.462-9.769-4.064S12 26.455 12 22.775V20h6.447z" fill="${contrastText}"/>`,
  };

  const innerIcon = useMemo(() => {
    return currentSpace.type === "static"
      ? innerIconPaths[currentSpace.id] || ""
      : `<path d="M33.35 44.46c0-3.941 0-5.911 1.219-7.136s3.182-1.224 7.106-1.224 5.887 0 7.106 1.224S50 40.519 50 44.46v4.18c0 3.941 0 5.911-1.219 7.136S45.599 57 41.675 57s-5.887 0-7.106-1.224-1.219-3.196-1.219-7.136v-4.18zM13 31.54c0 3.941 0 5.911 1.219 7.136s3.182 1.224 7.106 1.224 5.887 0 7.106-1.224 1.219-3.196 1.219-7.136v-4.18c0-3.941 0-5.911-1.219-7.136S25.249 19 21.325 19s-5.887 0-7.106 1.224S13 23.419 13 27.36v4.18zm20.35-5.89c0-2.065 0-3.097.316-3.914a4.32 4.32 0 0 1 2.253-2.398C36.684 19 37.655 19 39.594 19h4.163c1.939 0 2.91 0 3.674.338 1.019.448 1.831 1.311 2.253 2.398.316.817.316 1.849.316 3.914s0 3.097-.316 3.914a4.32 4.32 0 0 1-2.253 2.398c-.764.338-1.735.338-3.674.338h-4.163c-1.939 0-2.91 0-3.674-.338a4.32 4.32 0 0 1-2.253-2.398c-.316-.817-.316-1.849-.316-3.914zM13 50.35c0 2.065 0 3.097.316 3.914a4.32 4.32 0 0 0 2.253 2.398c.764.338 1.735.338 3.674.338h4.163c1.939 0 2.91 0 3.674-.338 1.019-.448 1.831-1.311 2.253-2.398.316-.817.316-1.849.316-3.914s0-3.097-.316-3.914a4.32 4.32 0 0 0-2.253-2.398c-.764-.338-1.735-.338-3.674-.338h-4.163c-1.939 0-2.91 0-3.674.338-1.019.448-1.831 1.311-2.253 2.398C13 47.253 13 48.285 13 50.35z" fill="${contrastText}"/>`;
  }, [currentSpace, contrastText]);

  const svg = useMemo(() => {
    return `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.991 8.838l-3.259 2.499c-4.941 3.789-7.415 5.683-8.738 8.352s-1.327 5.757-1.327 11.926v6.694c0 12.109 0 18.163 3.82 21.926S16.45 64 28.741 64h6.519c12.291 0 18.438 0 22.254-3.763s3.82-9.818 3.82-21.93v-6.688c0-6.173 0-9.258-1.326-11.93s-3.797-4.563-8.738-8.352L48.01 8.842C40.318 2.944 36.472 0 32 0s-8.318 2.944-16.01 8.838z" fill="${main}"/>
      ${innerIcon}
    </svg>`;
  }, [innerIcon, main]);

  useEffect(() => {
    const favicon = document.getElementById("favicon") as HTMLLinkElement;
    if (favicon) {
      const newHref = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svg
      )}`;
      if (favicon.href !== newHref) {
        favicon.href = newHref;
      }
    }
  }, [svg]);
}
