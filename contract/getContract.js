import { ethers } from 'ethers';
import contractABI from '@/contract/WatchChainABI.json';

// address of the contract
const CONTRACT_ADDRESS = '0x12e3b491d1da92c0e7f96c5bf877b5742a5baca5';

export const getContract = async () => {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask not detected');
  }

  // connect to the contract
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};