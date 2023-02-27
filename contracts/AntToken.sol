//SPDX-License-Identifier:MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AntToken is ERC20 {
    address public owner;

    constructor(uint256 initialSupply) ERC20("AntToken", "ANT") {
        owner = msg.sender;
        _mint(msg.sender, initialSupply);
    }
}
