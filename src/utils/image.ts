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

export const removeImageFromStorage = (imageId: string) => {
  return new Promise<void>((resolve, reject) => {
    chrome.storage.local.get(["userImages"], (result) => {
      const existingImages = result.userImages || {};
      delete existingImages[imageId];
      chrome.storage.local.set({ userImages: existingImages }, () => {
        resolve();
      });
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
