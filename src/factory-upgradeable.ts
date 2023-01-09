import { BigInt } from "@graphprotocol/graph-ts"
import {
  FactoryUpgradeable,
  AdminChanged,
  AntibotUpdated,
  BeaconUpgraded,
  ContractDeployed,
  ImplementationAdded,
  ImplementationUpdated,
  Initialized,
  OwnershipTransferred,
  Upgraded
} from "../generated/FactoryUpgradeable/FactoryUpgradeable"

import { ERC20 } from "../generated/ERC20/ERC20"
import { Implementation } from "../generated/schema"

export function handleAdminChanged(event: AdminChanged): void {}

export function handleAntibotUpdated(event: AntibotUpdated): void {}

export function handleBeaconUpgraded(event: BeaconUpgraded): void {}

export function handleContractDeployed(event: ContractDeployed): void {
  let implementation = new Implementation(event.params.contractAddress);

  implementation.deployer = event.params.deployer;
  implementation.productName = event.params.productName;
  implementation.source = event.params.source;
  implementation.version = event.params.version;

  let erc20Contract = ERC20.bind(event.params.contractAddress);

  implementation.tokenName = erc20Contract.name();
  implementation.tokenSymbol = erc20Contract.symbol();

  implementation.save();
}

export function handleImplementationAdded(event: ImplementationAdded): void {}

export function handleImplementationUpdated(
  event: ImplementationUpdated
): void {}

export function handleInitialized(event: Initialized): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleUpgraded(event: Upgraded): void {}
