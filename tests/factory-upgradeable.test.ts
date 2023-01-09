import { Address, ethereum } from "@graphprotocol/graph-ts";
import { afterEach, assert, clearStore, createMockedFunction, describe, test } from "matchstick-as/assembly/index"
import { handleContractDeployed } from "../src/factory-upgradeable"
import { createContractDeployedEvent } from "./utils";
import { Implementation } from "./entities/implementation";

describe("'ContractDeployed' event tests", () => {
    const IMPLEMENTATION_ENTITY_TYPE = 'Implementation';

    afterEach(() => {
        clearStore();
    })

    test("Should create correctly 'Implementation' entity", () => {
        const entity = new Implementation();

        const implementationAddress: string = '0xD76b20c53dBf709F4BbfD203321e6F079F4FF2eD'.toLowerCase();
        const deployerAddress: string = '0xBe8210B30b315894f2675E6876BC44a158045CB1'.toLowerCase();
        const productName: string = 'ERC-20 Token';
        const sourceAddress: string = '0x3a4d4288f590E487761c7dC910288fFE5df90Ff8'.toLowerCase();
        const version: i32 = 1;
        const tokenName: string = 'Token Name';
        const tokenSymbol: string = 'TOK';

        const implementationContractAddress = Address.fromString(implementationAddress);

        createMockedFunction(implementationContractAddress, 'name', 'name():(string)')
            .returns([ethereum.Value.fromString('Token Name')]);
        
        createMockedFunction(implementationContractAddress, 'symbol', 'symbol():(string)')
            .returns([ethereum.Value.fromString('TOK')]);

            const contractDeployedEvent = createContractDeployedEvent(
            deployerAddress,
            productName,
            sourceAddress,
            version,
            implementationAddress
        );

        assert.entityCount(IMPLEMENTATION_ENTITY_TYPE, 0);

        handleContractDeployed(contractDeployedEvent);

        assert.entityCount(IMPLEMENTATION_ENTITY_TYPE, 1);

        assert.fieldEquals(IMPLEMENTATION_ENTITY_TYPE, implementationAddress, entity.id, implementationAddress);
        assert.fieldEquals(IMPLEMENTATION_ENTITY_TYPE, implementationAddress, entity.deployer, deployerAddress);
        assert.fieldEquals(IMPLEMENTATION_ENTITY_TYPE, implementationAddress, entity.productName, productName);
        assert.fieldEquals(IMPLEMENTATION_ENTITY_TYPE, implementationAddress, entity.source, sourceAddress);
        assert.fieldEquals(IMPLEMENTATION_ENTITY_TYPE, implementationAddress, entity.version, version.toString());
        assert.fieldEquals(IMPLEMENTATION_ENTITY_TYPE, implementationAddress, entity.tokenName, tokenName);
        assert.fieldEquals(IMPLEMENTATION_ENTITY_TYPE, implementationAddress, entity.tokenSymbol, tokenSymbol);
    });
})