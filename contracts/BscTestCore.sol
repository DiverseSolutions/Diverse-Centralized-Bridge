// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./IBridgeToken.sol";
import "./BridgeToken.sol";

contract BscTestCore is Ownable {
  string constant public network = "BSC-TestNet";
  event createdWrappedToken(string name,string symbol,uint8 decimals,address token);
  event mintedWrappedToken(address token,address mintedAddress,uint amount);
  event burnedWrappedToken(address token,address burnedAddress,uint amount);
  event redeemedWrappedToken(address token,address redeemedAddress,uint amount);
  event lockedToken(address token,address fromUserAddress,uint amount);
  event unlockedToken(address token,address fromUserAddress,uint amount);

  mapping(string => address) public wrappedTokenNameMapping;
  mapping(address => string) public wrappedTokenAddressMapping;
  uint public wrappedTokenAmount;

  function createWrappedToken(string memory name,string memory symbol,uint8 decimals) public {
    BridgeToken _token = new BridgeToken(name,symbol,decimals);

    wrappedTokenNameMapping[name] = address(_token);
    wrappedTokenAddressMapping[address(_token)] = name;
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

  function lockToken(address _tokenAddress,address _fromUser,uint _amount) external onlyOwner {
    IBridgeToken _token = IBridgeToken(_tokenAddress);
    _token.transferFrom(_fromUser,address(this),_amount);

    emit lockedToken(_tokenAddress,_fromUser,_amount);
  }

  function unlockToken(address _tokenAddress,address _toUser,uint _amount) external onlyOwner {
    IBridgeToken _token = IBridgeToken(_tokenAddress);
    _token.transferFrom(address(this),_toUser,_amount);
    emit unlockedToken(_tokenAddress,_toUser,_amount);
  }

  // Helper Functions

  function hasWrappedTokenByName(string memory _name) view public returns(bool) {
    address _hasAddress = wrappedTokenNameMapping[_name];

    if(_hasAddress != address(0)){
      return true;
    }

    return false;
  }

  function hasWrappedTokenByAddress(address _tokenAddress) view public returns(bool) {
    string memory _name = wrappedTokenAddressMapping[_tokenAddress];

    if(bytes(_name).length != 0){
      return true;
    }

    return false;
  }

}
