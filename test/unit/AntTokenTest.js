const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("AntToken Unit Test", function () {
      let antToken, deployer, user1;
      beforeEach(async function () {
        const accounts = await getNamedAccounts();

        deployer = accounts.deployer;
        user1 = accounts.player;

        await deployments.fixture(["all"]);

        antToken = await ethers.getContract("AntToken", deployer);
      });
      it("was deployed", async () => {
        assert(antToken.address);
      });
      describe("constructor", () => {
        it("Should have correct INITIAL_SUPPLY of token ", async () => {
          const totalSupply = await antToken.totalSupply();
          assert.equal(totalSupply.toString(), INITIAL_SUPPLY);
        });
        it("initializes the token with the correct name and symbol ", async () => {
          const name = (await antToken.name()).toString();
          assert.equal(name, "AntToken");

          const symbol = (await antToken.symbol()).toString();
          assert.equal(symbol, "ANT");
        });
      });
      describe("transfers", () => {
        it("Should be able to transfer tokens successfully to an address", async () => {
          const tokensToSend = ethers.utils.parseEther("10");
          await antToken.transfer(user1, tokensToSend);
          expect(await antToken.balanceOf(user1)).to.equal(tokensToSend);
        });
      });
      describe("allowances", () => {
        const amount = ethers.utils.parseEther("20");
        beforeEach(async () => {
          playerToken = await ethers.getContract("AntToken", user1);
        });
        it("Should approve other address to spend token", async () => {
          const tokensToSpend = ethers.utils.parseEther("5");

          await antToken.approve(user1, tokensToSpend);
          await playerToken.transferFrom(deployer, user1, tokensToSpend);
          expect(await playerToken.balanceOf(user1)).to.equal(tokensToSpend);
        });
        it("doesn't allow an unnaproved member to do transfers", async () => {
          await expect(
            playerToken.transferFrom(deployer, user1, amount)
          ).to.be.revertedWith("ERC20: insufficient allowance");
        });

        it("the allowance being set is accurate", async () => {
          await antToken.approve(user1, amount);
          const allowance = await antToken.allowance(deployer, user1);
          assert.equal(allowance.toString(), amount);
        });
        it("increase the allowance", async () => {
          await antToken.approve(user1, amount);
          await antToken.increaseAllowance(user1, amount);
          const allowance = await antToken.allowance(deployer, user1);
          assert.equal(allowance.toString(), amount * 2);
        });
      });
    });
