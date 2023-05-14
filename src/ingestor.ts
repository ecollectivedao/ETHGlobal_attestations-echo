import * as modules from "./ingestorModules/index";

enum INGESTORS {
  "poap",
}

export async function ingestor(module: string, moduleVar: Number) {
  let elligibleAddress;

  switch (module) {
    case "poap":
      elligibleAddress = modules.poapsIngestor(moduleVar);
      break;

    default:
      console.error(
        "This protocol doesn't have any ingestors implementation yet."
      );
      break;
  }

  return elligibleAddress;
}
