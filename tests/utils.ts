import { Address, Bytes, ethereum, JSONValue, Value,  } from "@graphprotocol/graph-ts";
import { newMockEvent } from "matchstick-as";
import { ContractDeployed } from "../generated/FactoryUpgradeable/FactoryUpgradeable";

export function createContractDeployedEvent(
    deployer: string,
    productName: string,
    source: string,
    version: i32,
    contractAddress: string,
): ContractDeployed {
    let mockEvent = newMockEvent();
    
    let contractDeployedEvent = new ContractDeployed(
        mockEvent.address,
        mockEvent.logIndex,
        mockEvent.transactionLogIndex,
        mockEvent.logType,
        mockEvent.block,
        mockEvent.transaction,
        mockEvent.parameters,
        mockEvent.receipt
    );

    contractDeployedEvent.parameters = new Array();

    let deployerParam = new ethereum.EventParam('deployer', ethereum.Value.fromAddress(Address.fromString(deployer)));
    let productNameParam = new ethereum.EventParam('productName', ethereum.Value.fromString(productName));
    let sourceParam = new ethereum.EventParam('source', ethereum.Value.fromAddress(Address.fromString(source)));
    let versionParam = new ethereum.EventParam('version', ethereum.Value.fromI32(version));
    let contractAddressParam = new ethereum.EventParam('contractAddress', ethereum.Value.fromAddress(Address.fromString(contractAddress)));

    contractDeployedEvent.parameters.push(deployerParam);
    contractDeployedEvent.parameters.push(productNameParam);
    contractDeployedEvent.parameters.push(sourceParam);
    contractDeployedEvent.parameters.push(versionParam);
    contractDeployedEvent.parameters.push(contractAddressParam);

    return contractDeployedEvent;
}