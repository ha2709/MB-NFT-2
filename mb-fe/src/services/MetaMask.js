 
import { ethers } from 'ethers';

import WebModal from "web3modal"
import axios from 'axios';
// import React from 'react';
import Swal from 'sweetalert2';
const { Web3Provider } = ethers.providers;
// const ethers = require("ethers")

/**
 * MetaMask
 * All MetaMask transactions goes here.
 *
 * Usage 1:
 * await (new MetaMask).initialize().then((result) => {
 *     console.log('Do your thing', result);
 *  }).catch((error) => {
 *      console.log('Error', error);
 *  });
 *
 * Usage 2:
 * const metaMask = await (new MetaMask).initialize();
 * await metaMask.fetchItems().then((result) => {
 *     console.log('marketplace items', result);
 * });
 *
 * Important Note:
 * Please refrain from calling all window actions, Nuxt and Vue state handling within this class. Keep this class independent.
 */

class MetaMask {
    instance;
    provider;
    signer;
  
    addresses = { market: '', token: '' };
    // contracts = { market: new Contract(), token: new Contract() };
    network;
    balance;
  
    constructor() {
      this.instance = MetaMask.instance();
    }
  
    static isInstalled() {
      return window && typeof window.ethereum !== 'undefined';
    }
  
    static instance() {
      if (this.isInstalled()) {
        return window.ethereum;
      }
      Swal.fire({
        title: 'Oops!',
        html: `Please install <strong>MetaMask</strong> extension to use this feature.`,
        confirmButtonText: 'Install',
        icon: 'error'
      }).then((answer) => {
        if (answer.value) {
          window.location.href = process.env.METAMASK_CHROME_LINK ?? 'https://metamask.io';
        }
      });
      throw new Error('Please install MetaMask extension to use this feature.'); 
    }
  
    static target() {
      // @ts-ignore
      return typeof window.MetaMaskTarget !== 'undefined'
        ? window.MetaMaskTarget
        : (window.MetaMaskTarget = new EventTarget());
    }
        /**
     * Used to initialize MetaMask object.
     */
        async initialize() {
          if (!MetaMask.isInstalled()) {
              throw new Error('Metamask is not yet installed.');
          }
  
          try {
            // Create a provider
            const provider = ethers.getDefaultProvider();
            // Use a JSON-RPC provider that supports signing, such as JsonRpcProvider
            const jsonRpcProvider = new ethers.providers.JsonRpcProvider();
            const signer = jsonRpcProvider.getSigner();

            const address = await signer.getAddress();
            console.log('Signer address:', address);
            console.log(84, provider)
            this.signer = await provider.getSigner();
            this.provider = provider;
            console.log(87, provider)
  
          } catch (e) {
              throw new Error(e.message);
          }
  
          return new Promise(async (resolve, reject) => {
              // this.network = await this.provider.getNetwork().then(async (response) => {
              //     // const { chainId } = response;
              //     console.log(94, response)
              //     // @ts-ignore
              //     // this.getAddresses(chainId);
              //     // this.getContracts();
  
              //     resolve({
              //         // @ts-ignore
              //         currentAddress: MetaMask.instance().selectedAddress,
                      
              //         // addresses: this.addresses,
              //         // contracts: this.contracts,
              //         signer: this.signer,
              //       //   getEthBalance: async () => {
              //       //     return await this.provider.getBalance(this.instance.selectedAddress.toString().toLowerCase());
              //       // },
                      
                    
              //     });
              // }).catch((error) => {
              //     reject(error);
              // });
          });
      }
  }
  
  export default MetaMask;
 