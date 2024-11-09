export const setAPIKey = (model = "gemini", apiKey: string | undefined) => {
  if (!apiKey) {
    chrome.storage.local.remove([model]);
    return;
  }

  chrome.storage.local.set({ [model]: apiKey });
};

export const getAPIKey = (model = "gemini"): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([model], (result) => resolve(result[model]));
  });
};

export const APIkeyURL = {
  gemini: "https://aistudio.google.com/app/apikey",
};
