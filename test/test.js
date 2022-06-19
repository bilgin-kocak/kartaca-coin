const { expect } = require('chai');
const { ethers } = require('hardhat');
const { utils } = require('ethers');

let KartacaCoin;
let kartacaCoin;
let owner;
let addr1;
let addr2;
let addrs;

describe('KartacaCoin', function () {
  it('Deployment should assign the total supply of tokens to the owner', async function () {
    const [owner] = await ethers.getSigners();
    const KartacaCoin = await ethers.getContractFactory('KartacaCoin');
    const kartacaCoin = await KartacaCoin.deploy();
    await kartacaCoin.deployed();

    const ownerBalance = await kartacaCoin.balanceOf(owner.address);
    // expect(ownerBalance).to.equal(1000000);
    expect(await kartacaCoin.totalSupply()).to.equal(ownerBalance);
  });

  it('Mint 100 KTC to owner address', async function () {
    // Test the mint functionality of the smart contract.
    const [owner] = await ethers.getSigners();
    const KartacaCoin = await ethers.getContractFactory('KartacaCoin');
    const kartacaCoin = await KartacaCoin.deploy();
    await kartacaCoin.deployed();

    console.log('owner address:', owner.address);

    let ownerBalance = await kartacaCoin.balanceOf(owner.address);
    console.log('ownerBalance:', ownerBalance);
    const initialTotalSupply = await kartacaCoin.totalSupply();

    await kartacaCoin.mint(owner.address, ethers.utils.parseEther('100'));
    ownerBalance = await kartacaCoin.balanceOf(owner.address);
    console.log('ownerBalance:', ownerBalance);

    expect(ownerBalance).to.equal(
      initialTotalSupply.add(ethers.utils.parseEther('100'))
    );
    // expect(await kartacaCoin.totalSupply()).to.equal(ownerBalance);
  });
});

describe('Transactions', function () {
  // `beforeEach` will run before each test, re-deploying the contract every
  // time. It receives a callback, which can be async.
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    KartacaCoin = await ethers.getContractFactory('KartacaCoin');
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    kartacaCoin = await KartacaCoin.deploy();
  });

  it('Should transfer tokens between accounts', async function () {
    // Transfer 50 tokens from owner to addr1
    await kartacaCoin.transfer(addr1.address, 50);
    const addr1Balance = await kartacaCoin.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(50);

    // Transfer 50 tokens from addr1 to addr2
    // We use .connect(signer) to send a transaction from another account
    await kartacaCoin.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await kartacaCoin.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });

  it('Should fail if sender doesn’t have enough tokens', async function () {
    const initialOwnerBalance = await kartacaCoin.balanceOf(owner.address);

    // Try to send 1 token from addr1 (0 tokens) to owner (1000000 tokens).
    // `require` will evaluate false and revert the transaction.
    await expect(
      kartacaCoin.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith('ERC20: transfer amount exceeds balance');

    // Owner balance shouldn't have changed.
    expect(await kartacaCoin.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });

  it('Should update balances after transfers', async function () {
    const initialOwnerBalance = await kartacaCoin.balanceOf(owner.address);

    // Transfer 100 tokens from owner to addr1.
    await kartacaCoin.transfer(addr1.address, 100);

    // Transfer another 50 tokens from owner to addr2.
    await kartacaCoin.transfer(addr2.address, 50);

    // Check balances.
    const finalOwnerBalance = await kartacaCoin.balanceOf(owner.address);
    expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

    const addr1Balance = await kartacaCoin.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);

    const addr2Balance = await kartacaCoin.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });
});
