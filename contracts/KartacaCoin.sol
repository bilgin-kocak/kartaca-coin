// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// We import this library to be able to use console.log
import "hardhat/console.sol";

contract KartacaCoin is ERC20, Ownable {
    constructor() ERC20("KartacaCoin", "KTC") {
        _mint(msg.sender, 100000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        console.log("minting", amount, "to", to);
        _mint(to, amount);
    }
}
