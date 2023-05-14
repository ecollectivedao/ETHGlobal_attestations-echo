import { ingestor } from "./ingestor";
import generator from "./generator";

async function run() {
  let attestationsToRegister = await ingestor("poap", 125092);
  generator(attestationsToRegister);
}

run();
