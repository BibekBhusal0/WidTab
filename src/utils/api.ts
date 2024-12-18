import browser from "webextension-polyfill";
export const setAPIKey = (model = "gemini", apiKey: string | undefined) => {
  if (!apiKey) {
    browser.storage.local.remove([model]);
    return;
  }

  browser.storage.local.set({ [model]: apiKey });
};

export const getAPIKey = (model = "gemini"): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    browser.storage.local.get([model]).then((result) => {
      const s = result[model];
      if (typeof s === "string") resolve(s);
      else resolve(undefined);
    });
  });
};

export const APIkeyURL = {
  gemini: "https://aistudio.google.com/app/apikey",
};
