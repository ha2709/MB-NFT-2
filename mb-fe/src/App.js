 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Web3Modal from 'web3modal';
import MetaMask from "./services/MetaMask";
import React, { useEffect } from 'react';


const ethers = require("ethers")
// import { ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';

// async function connectToMetaMask() {
//   if (typeof window.ethereum !== 'undefined') {
//     await window.ethereum.request({ method: 'eth_requestAccounts' });
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     console.log(17)
//     // const signer = provider.getSigner();
//     // const network = await provider.getNetwork();
//     // console.log('Connected to MetaMask');
//     // console.log('Network:', network);
//     // console.log('Signer:', signer);
//   } else {
//     console.error('MetaMask not detected. Please install MetaMask.');
//   }
// }

 

function App() {
  useEffect(() => {
    (async () => {
      try {
        const metaMaskInstance = new MetaMask();
        const result = await metaMaskInstance.initialize();
        console.log('initialize MetaMask Class', result);
      } catch (error) {
        console.log('Error', error);
      }
    })();
  }, []);
  const handleMintNFT = () => {
    // Add your logic here for minting NFT
    // This function will be called when the "Mint NFT" button is clicked
    console.log("Minting NFT...");
  };

  return (
    <div className="App">
      <header className="App-header">
        
       
        <div className="mb-3">
          <input className="form-control" type="file" />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input type="text" className="form-control" id="name" name="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <input type="text" className="form-control" id="description" name="description" />
        </div>
        <div className="mb-3">
          <label htmlFor="nric" className="form-label">NRIC:</label>
          <input type="text" className="form-control" id="nric" name="nric" />
        </div>
        <button  className="btn" style={{ backgroundColor: '#E2761B', color: 'white', marginRight: '10px' }}>
          Connect to MetaMask
      </button>

        <button onClick={handleMintNFT} className="btn btn-success">
          Mint NFT
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
