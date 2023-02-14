import { getDataJson, setObsidianDataJson } from "../utils";

export * from "./fetch";
export * from "./setCookie";
export * from "./find";
export * from "./settings";

export function genObsidianData() {
  const data = getDataJson();
  const names = data.map(({ server_filename }) => server_filename);
  const str = names.join("\n\n");
  setObsidianDataJson(str);
}
