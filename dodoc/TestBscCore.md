# TestBscCore









## Methods

### burnToken

```solidity
function burnToken(address _tokenAddress, address _burnAddress, uint256 _amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _burnAddress | address | undefined |
| _amount | uint256 | undefined |

### createWrappedToken

```solidity
function createWrappedToken(string name, string symbol, uint8 decimals) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| name | string | undefined |
| symbol | string | undefined |
| decimals | uint8 | undefined |

### mintToken

```solidity
function mintToken(address _tokenAddress, address _mintAddress, uint256 _amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _mintAddress | address | undefined |
| _amount | uint256 | undefined |

### owner

```solidity
function owner() external view returns (address)
```



*Returns the address of the current owner.*


#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

### redeemToken

```solidity
function redeemToken(address _tokenAddress, address _transferAddress, uint256 _amount) external nonpayable
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _tokenAddress | address | undefined |
| _transferAddress | address | undefined |
| _amount | uint256 | undefined |

### renounceOwnership

```solidity
function renounceOwnership() external nonpayable
```



*Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.*


### transferOwnership

```solidity
function transferOwnership(address newOwner) external nonpayable
```



*Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.*

#### Parameters

| Name | Type | Description |
|---|---|---|
| newOwner | address | undefined |

### wrappedTokenAddressMapping

```solidity
function wrappedTokenAddressMapping(address) external view returns (string)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

### wrappedTokenAmount

```solidity
function wrappedTokenAmount() external view returns (uint256)
```






#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | uint256 | undefined |

### wrappedTokenNameMapping

```solidity
function wrappedTokenNameMapping(string) external view returns (address)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| _0 | string | undefined |

#### Returns

| Name | Type | Description |
|---|---|---|
| _0 | address | undefined |



## Events

### OwnershipTransferred

```solidity
event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| previousOwner `indexed` | address | undefined |
| newOwner `indexed` | address | undefined |

### burnedWrappedToken

```solidity
event burnedWrappedToken(address token, address burnedAddress, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token  | address | undefined |
| burnedAddress  | address | undefined |
| amount  | uint256 | undefined |

### createdWrappedToken

```solidity
event createdWrappedToken(string name, string symbol, uint8 decimals, address token)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| name  | string | undefined |
| symbol  | string | undefined |
| decimals  | uint8 | undefined |
| token  | address | undefined |

### mintedWrappedToken

```solidity
event mintedWrappedToken(address token, address mintedAddress, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token  | address | undefined |
| mintedAddress  | address | undefined |
| amount  | uint256 | undefined |

### redeemedWrappedToken

```solidity
event redeemedWrappedToken(address token, address redeemedAddress, uint256 amount)
```





#### Parameters

| Name | Type | Description |
|---|---|---|
| token  | address | undefined |
| redeemedAddress  | address | undefined |
| amount  | uint256 | undefined |



