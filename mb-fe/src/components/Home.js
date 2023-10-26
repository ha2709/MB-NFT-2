import WalletBalance from './WalletBalance';
import { useEffect, useState } from 'react';
import React from 'react';
import { ethers } from 'ethers';
// import FiredGuys from '../artifacts/contracts/MyNFT.sol/MyNFT.json';

const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, FiredGuys.abi, signer);

function Home() {

  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return React.createElement(
    'div',
    null,
    React.createElement(WalletBalance, null),
    Array(totalMinted + 1).fill(0).map((_, i) => React.createElement(
      'div',
      { key: i },
      React.createElement(NFTImage, { tokenId: i, getCount: getCount })
    ))
  );
}

