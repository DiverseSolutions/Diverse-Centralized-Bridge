// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./IBridgeToken.sol";
import "./BridgeToken.sol";

contract TestBscCore is Ownable {
  string constant public network = "BSC-TestNet";
  event createdWrappedToken(string name,string symbol,uint8 decimals,address token);
  event mintedWrappedToken(address token,address mintedAddress,uint amount);
  event burnedWrappedToken(address token,address burnedAddress,uint amount);
  event redeemedWrappedToken(address token,address redeemedAddress,uint amount);

  mapping(string => address) public wrappedTokenNameMapping;
  mapping(address => string) public wrappedTokenAddressMapping;
  uint public wrappedTokenAmount;

  function createWrappedToken(string memory name,string memory symbol,uint8 decimals) public {
    BridgeToken _token = new BridgeToken(string.concat("Wrapped",name),symbol,decimals);

    wrappedTokenNameMapping[string.concat("Wrapped",name)] = address(_token);
    wrappedTokenAddressMapping[address(_token)] = string.concat("Wrapped",name);
    wrappedTokenAmount += 1;

    emit createdWrappedToken(name,symbol,decimals,address(_token));
  }

  function mintToken(address _tokenAddress,address _mintAddress,uint _amount) external onlyOwner {
    IBridgeToken _token = IBridgeToken(_tokenAddress);
    _token.mint(_mintAddress,_amount);

    emit mintedWrappedToken(_mintAddress,address(_token),_amount);
  }

  function burnToken(address _tokenAddress,address _burnAddress,uint _amount) external onlyOwner {
    IBridgeToken _token = IBridgeToken(_tokenAddress);
    _token.burn(_burnAddress,_amount);

    emit burnedWrappedToken(_burnAddress,address(_token),_amount);
  }

  function redeemToken(address _tokenAddress,address _transferAddress,uint _amount) external onlyOwner {
    IBridgeToken _token = IBridgeToken(_tokenAddress);
    _token.transfer(_transferAddress,_amount);

    emit redeemedWrappedToken(_transferAddress,address(_token),_amount);
  }

}
