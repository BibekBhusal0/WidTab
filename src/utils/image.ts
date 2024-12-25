import useCurrentTheme from "@/hooks/useCurrentTheme";
import { useState, useEffect } from "react";

const DB_NAME = "ImageStorageDB";
const STORE_NAME = "userImages";

export type ImageDataType = {
  id: string;
  data: string;
};

const openDB = (): Promise<IDBDatabase> => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore(STORE_NAME);
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const saveImageToStorage = async (
  imageId: string,
  imageData: string
): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const image: ImageDataType = { id: imageId, data: imageData };
  await store.put(image, imageId);
};

export const getImagesFromStorage = async (): Promise<{
  [key: string]: string;
}> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const images: ImageDataType[] = await new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => {
      resolve(request.result);
    };
  });

  return images.reduce((acc, { id, data }) => {
    acc[id] = data;
    return acc;
  }, {} as { [key: string]: string });
};

export const removeAllImagesFromStorage = async (): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  await store.clear();
};

export const getImageById = async (
  imageId: string
): Promise<string | undefined> => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  return await new Promise((resolve) => {
    const request = store.get(imageId);
    request.onsuccess = () => {
      const result = request.result as ImageDataType | undefined;
      resolve(result ? result.data : undefined);
    };
  });
};

export const getImageBlob = async (imageId: string): Promise<Blob | null> => {
  const imageData = await getImageById(imageId);
  if (!imageData) return null;

  // Convert base64 string to Blob
  const byteString = atob(imageData.split(",")[1]);
  const mimeString = imageData.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
};

function useBackgroundImage(dependencyArray: any[] = []): string | undefined {
  const { image } = useCurrentTheme();
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    image
  );

  useEffect(() => {
    let newUrl: string | undefined;
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
