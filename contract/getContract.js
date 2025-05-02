import { ethers } from 'ethers';
import contractABI from '@/contract/WatchChainABI.json';

// address of the contract
const CONTRACT_ADDRESS = '0x8ed2d225ad8da87d9494db59141678032d4c184a';

export const getContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask not detected');
  }

  // connect to the contract
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};