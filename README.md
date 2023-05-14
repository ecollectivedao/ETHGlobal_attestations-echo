## Summary

Framework to generate attestations based on cross-chain dataset.

## Description

How can we trust attestations? Usually, you need either a trustable attester or a schema resolver, what we're trying to achieve with Ettestations Echo is to provide a re-playable and reliable attestation framework by making the attestation generation offline and letting it grow organically afterward.

We have 3 parts in our framework:

- Ingestor module: consume any cross-chain data from subgraphs
- Generator: will generate attestation linked to a particular schema which will be linked to a particular which has a lockable resolver contract
- Verifier: anyone can use the verifier to get a list of on-chain attestation produced by the schema and reproduce the list locatlly to compare both sources and prove the code is working

## Resources

- [Flowchart](https://whimsical.com/presentation-F195bUqgfzMAmESBhMTk9x) - Resource used in the presentation video for ETHglobal Lisbon 2023

- [ETHglobal Lisbon](https://ethglobal.com/showcase/undefined-1hkgr) - Project showcase page