import "isomorphic-unfetch";
import { log } from "console";

import { Client, cacheExchange, fetchExchange, gql } from "@urql/core";

export default async function poapsIngestor(poapEventId: Number) {
  const client = new Client({
    url: "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai",
    exchanges: [cacheExchange, fetchExchange],
  });

  const query = gql`
    query Event($eventId: ID!, $first: Int) {
      event(id: $eventId) {
        id
        tokenCount
        tokens(first: $first) {
          id
          owner {
            id
          }
          transferCount
        }
        created
      }
    }
  `;

  let variables = {
    eventId: `${poapEventId}`,
    first: 900,
  };

  const results = await client.query(query, variables).toPromise();

  //   console.log(results.data.event.tokens);

  let attestationsToRegister: AttestationsToRegister = results.data.event.tokens
    .filter((token: any) => token.transferCount == 1)
    .map((token: any) => {
      let att: AttestationToRegister = {
        poapId: token.id,
        recipient: token.owner.id,
      };
      return att;
    });

  return attestationsToRegister;
}

export type AttestationToRegister = {
  poapId: string;
  recipient: string;
};

export type AttestationsToRegister = [AttestationToRegister];
