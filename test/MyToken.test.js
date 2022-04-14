const { expect } = require('chai');
const { ethers, upgrades } = require('hardhat');

describe("MyToken", function () {

    let myTokenV1;
    let myTokenV2;

    it('deploys', async function () {
        const MyTokenV1 = await ethers.getContractFactory('MyTokenV1');
        // await MyTokenV1.deploy();
        myTokenV1 = await upgrades.deployProxy(MyTokenV1, {kind: 'uups'});                        
    });
    
    it('upgrades', async function () {
        const MyTokenV2 = await ethers.getContractFactory('MyTokenV2');                        
        myTokenV2 = await upgrades.upgradeProxy(myTokenV1, MyTokenV2);
    })

    it('adds with new function and variable in v2', async function () {
        await myTokenV2.add(21);        
        expect((await myTokenV2.num()).toString()).to.equal('21');
        await myTokenV2.add(21);
        expect((await myTokenV2.num()).toString()).to.equal('42');
    })

})