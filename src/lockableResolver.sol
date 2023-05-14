// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {SchemaResolver} from "../SchemaResolver.sol";

import {IEAS, Attestation} from "../../IEAS.sol";

/**
 * @title A sample schema resolver that checks whether the attestation is from a specific attester.
 */
contract AttesterResolver is SchemaResolver {
    address private immutable _targetAttester;

    constructor(IEAS eas, address targetAttester) SchemaResolver(eas) {
        _targetAttester = targetAttester;
        _resolverLocker = false;
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal view override returns (bool) {
        return attestation.attester == _targetAttester && !_resolverLocker;
    }

    function lockResolver() public {
        require(!_resolverLocker, "Contract is already locked.");
        require(
            attestation.attester == _targetAttester,
            "Only the deployer of the Resolver can lock it"
        );
        _resolverLocker = true;
    }

    function isResolverLocked() public view returns (bool) {
        return _resolverLocker;
    }
}
