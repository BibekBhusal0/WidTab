export type AllSearchEngines =
  | "google"
  | "bing"
  | "youtube"
  | "duckduckgo"
  | "brace";

export type SearchStateType = {
  id: string;
  engine: AllSearchEngines;
};
