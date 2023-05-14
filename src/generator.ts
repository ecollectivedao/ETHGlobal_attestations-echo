import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import { Wallet, ethers } from "ethers";

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {
  AttestationToRegister,
  AttestationsToRegister,
} from "./ingestorModules/poap";
dotenv.config();

let private_key = process.env.PRIVATE_KEY;

const EASAttestationContractAddress =
  "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84";
const EASSchemaRegistryContractAddress =
  "0x7b24c7f8af365b4e308b6acb0a7dfc85d034cb3f";

const eas = new EAS(EASAttestationContractAddress);

export default async function generator(
  attestationsToRegister: AttestationsToRegister
) {
  let url = process.env.RPC_URL;
  let provider = new ethers.providers.JsonRpcProvider(url);

  const account = new Wallet(private_key, provider);

  // @ts-ignore
  eas.connect(account);

  let data = await Promise.all(
    attestationsToRegister.map(async (att: any) => {
      let res = await createAttestation(att);
      await delay(20000);
      return res;
    })
  );

  // let data = await createAttestation(attestationsToRegister[0]);

  console.log(data);
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function createAttestation(att: AttestationToRegister) {
  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder(
    "string attendeeType, bytes32 hackathonUID, uint40 poapID"
  );
  const encodedData = schemaEncoder.encodeData([
    { name: "attendeeType", value: "Hacker", type: "string" },
    {
      name: "hackathonUID",
      value:
        "0xb9ade889c3ffa45e2082e88bd931ae28cb5a76309c2da95364dc732e0d594a7e",
      type: "bytes32",
    },
    {
      name: "poapID",
      value: att.poapId,
      type: "uint40",
    },
  ]);

  const schemaUID =
    "0xc88b65754b6eca4ab6c606fdfbad3fcc5638c4f05f7adc0f1ca35daef8658371";

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: att.recipient,
      expirationTime: 0,
      revocable: false,
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();
  console.log("New attestation UID:", newAttestationUID);

  return newAttestationUID;
}

async function readAttestation() {
  const uid =
    "0xd6d07967c6f6c9306c8b44dad9a28ad8ae11c62148b9756496f5ca71d29a51a6";

  try {
    const attestation = await eas.getAttestation(uid);
    console.log("att", attestation);
  } catch (error) {
    console.log("error", error);
  }
}
