## Summary

Framework to generate attestations based on cross-chain dataset.

## Description

How can we trust attestations? Typically, you need to relly on trust from either a trustable attester or a schema resolver, what we're trying to achieve with Attestations Echo is to provide a re-playable and reliable attestation framework by making the attestation's generation offline and letting it grow naturally.

Our framework is divided into 3 parts:

- Ingestor module: consume any cross-chain data from subgraphs
- Generator: will generate an attestation linked to a certain schema that is linked to a specific lockable resolver contract
- Verifier: anyone can use the verifier to obtain a list of the on-chain attestations the schema created, and they can locally reproduce the list to compare the both sources and prove the code its veracity

## Resources

- [Flowchart](https://whimsical.com/presentation-F195bUqgfzMAmESBhMTk9x) - Resource used in the presentation video for ETHglobal Lisbon 2023

- [ETHglobal Lisbon](https://ethglobal.com/showcase/undefined-1hkgr) - Project showcase page