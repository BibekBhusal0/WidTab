import useCurrentTheme from "@/hooks/useCurrentTheme";
import browser from "webextension-polyfill";
import { useState, useEffect } from "react";

export type storageDataType = { [key: string]: string };

export const saveImageToStorage = (imageId: string, imageData: string) => {
  return new Promise<void>((resolve, reject) => {
    browser.storage.local.get(["userImages"]).then((result) => {
      const existingImages = (result.userImages as storageDataType) || {};
      existingImages[imageId] = imageData;
      browser.storage.local.set({ userImages: existingImages }).then(() => {
        resolve();
      });
    });
  });
};

export const getImagesFromStorage = () => {
  return new Promise<{ [key: string]: string }>((resolve, reject) => {
    browser.storage.local.get(["userImages"]).then((result) => {
      resolve((result.userImages as storageDataType) || {});
    });
  });
};

export const removeAllImagesFromStorage = () => {
  return new Promise<void>((resolve, reject) => {
    browser.storage.local.remove(["userImages"]).then(() => {
      resolve();
    });
  });
};

export const getImageById = async (imageId: string): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    browser.storage.local.get(["userImages"]).then((result) => {
      const storedImages = (result.userImages as storageDataType) || {};
      resolve(storedImages[imageId]);
    });
  });
};

export const getImageBlob = async (imageId: string): Promise<Blob | null> => {
  return new Promise<Blob | null>((resolve, reject) => {
    browser.storage.local.get(["userImages"]).then((result) => {
      if (browser.runtime.lastError) {
        return reject(browser.runtime.lastError);
      }

      const storedImages = (result.userImages as { [key: string]: string }) || {};
      const imageData = storedImages[imageId];
      if (!imageData) return resolve(null);

      // Convert base64 string to Blob
      const byteString = atob(imageData.split(",")[1]);
      const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: mimeString });
      resolve(blob);
    });
  });
};

function useBackgroundImage(dependencyArray = []) {
  const { image } = useCurrentTheme();
  const [backgroundImage, setBackgroundImage] = useState(image);
  useEffect(() => {
    var newUrl: string | undefined;
    const fetchImageData = async () => {
      if (image && image.startsWith("storageId/")) {
        const imageId = image.replace("storageId/", "");
        const imageData = await getImageBlob(imageId);
        if (imageData) {
          newUrl = URL.createObjectURL(imageData);
          setBackgroundImage(newUrl);
        }
      } else setBackgroundImage(image);
    };
    fetchImageData();
    return () => {
      if (typeof newUrl === "string") URL.revokeObjectURL(newUrl);
    };
  }, [image, ...dependencyArray]);
  return backgroundImage;
}

export default useBackgroundImage;
