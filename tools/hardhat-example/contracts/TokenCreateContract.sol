// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "./HederaTokenService.sol";
import "./ExpiryHelper.sol";
import "./KeyHelper.sol";

contract TokenCreateContract is HederaTokenService, ExpiryHelper, KeyHelper {

    // DEFINE TOKEN PROPERTIES
    string name = "hEthDenverPoints";
    string symbol = "hEDP";
    string memo = "A fungible token on Hedera for all attendees!";
    int64 initialTotalSupply = 15000;
    int64 maxSupply = 15000;
    int32 decimals = 0;
    bool freezeDefaultStatus = false;
    address treasury = address(this);
    
    address fTokenAddress;
    
    event ResponseCode(int responseCode);
    event CreatedToken(address tokenAddress);

    constructor() payable{
        require(msg.value > 1500000000, "Send more than 15 HBAR to cover token creation!");

        IHederaTokenService.TokenKey[] memory keys = new IHederaTokenService.TokenKey[](1);
        keys[0] = getSingleKey(KeyType.SUPPLY, KeyValueType.INHERIT_ACCOUNT_KEY, bytes(""));

        IHederaTokenService.Expiry memory expiry = IHederaTokenService.Expiry(
            0, treasury, 8000000
        );

        IHederaTokenService.HederaToken memory token = IHederaTokenService.HederaToken(
            name, symbol, treasury, memo, true, maxSupply, freezeDefaultStatus, keys, expiry
        );

        (int responseCode, address tokenAddress) =
        HederaTokenService.createFungibleToken(token, initialTotalSupply, decimals);

        if (responseCode != HederaResponseCodes.SUCCESS) {
            revert ();
        }

        fTokenAddress = tokenAddress;
        emit CreatedToken(tokenAddress);
        
    }


    function claimFT() public payable {
        require(msg.value > 500000000, "Send more than 5 HBAR to claim your tokens!");
        
        int64 tokenAmount = 100;
        address receiver = msg.sender;

        HederaTokenService.associateToken(receiver, fTokenAddress);

        (int responseCode2) =
        HederaTokenService.transferToken(fTokenAddress, address(this), receiver, tokenAmount);

        if (responseCode2 != HederaResponseCodes.SUCCESS) {
            revert ();     
        }

        emit ResponseCode(responseCode2);
    }

}