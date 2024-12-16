import useCurrentTheme from "@/hooks/useCurrentTheme";
import { useState, useEffect } from "react";

export const saveImageToStorage = (imageId: string, imageData: string) => {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.local.get(["userImages"], (result) => {
      const existingImages = result.userImages || {};
      existingImages[imageId] = imageData;
      chrome.storage.local.set({ userImages: existingImages }, () => {
        resolve();
      });
    });
  });
};

export const getImagesFromStorage = () => {
  return new Promise<{ [key: string]: string }>((resolve, reject) => {
    chrome.storage.local.get(["userImages"], (result) => {
      resolve(result.userImages || {});
    });
  });
};

export const removeAllImagesFromStorage = () => {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.local.remove(["userImages"], () => {
      resolve();
    });
  });
};

export const getImageById = async (
  imageId: string
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["userImages"], (result) => {
      const storedImages = result.userImages || {};
      resolve(storedImages[imageId]);
    });
  });
};

export const getImageBlob = async (imageId: string): Promise<Blob | null> => {
  return new Promise<Blob | null>((resolve, reject) => {
    chrome.storage.local.get(["userImages"], (result) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      const storedImages = result.userImages || {};
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
