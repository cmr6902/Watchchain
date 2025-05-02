import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { getContract } from '@/contract/getContract';
import Navbar from '@/components/Dashboard/Navbar';

export default function AvailableWatches() {
  // keep track of all the watches
  const [watches, setWatches] = useState([]);
  const [watchName, setName] = useState('');
  const [desc, setDescription] = useState('');
  const [watchPrice, setPrice] = useState('');
  const [userWallet, setCurrentAccount] = useState('');

  // connect to metamask
  const loadWallet = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error('wallet connection failed:', error);
    }
  };

  // get all watches from the blockchain
  const fetchWatches = async () => {
    try {
      const contract = await getContract();
      const totalWatches = await contract.nextId();
      const watchList = [];

      // check contract balance
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(contract.target);

      // get each watch's details
      for (let i = 0; i < totalWatches; i++) {
        const watchData = await contract.getWatch(i);
        const [id, seller, name, desc, price, isSold, buyer, fundsReleased] = watchData;

        watchList.push({
          id: id.toString(),
          seller: seller.toString(),
          name: name.toString(),
          desc: desc.toString(),
          price: price.toString(),
          isSold: isSold,
          buyer: buyer.toString(),
          fundsReleased: fundsReleased
        });
      }

      setWatches(watchList);
    } catch (error) {
      console.error('failed to get watches:', error);
    }
  };

  // load stuff when page opens
  useEffect(() => {
    loadWallet();
    fetchWatches();
  }, []);

  // post a new watch for sale
  const postWatch = async (e) => {
    e.preventDefault();
    if (!userWallet) {
      alert('connect your wallet');
      return;
    }

    if (!watchName || !desc || !watchPrice) {
      alert('fill everything in');
      return;
    }

    try {
      const contract = await getContract();
      const priceInWei = ethers.parseEther(watchPrice);
      const tx = await contract.listWatch(watchName, desc, priceInWei);
      await tx.wait();
      
      alert('watch posted');
      setName('');
      setDescription('');
      setPrice('');
      fetchWatches();
    } catch (error) {
      alert(`watch not posted: ${error.message}`);
    }
  };

  // buy a watch
  const buyWatch = async (id, price) => {
    try {
      if (!userWallet) {
        alert('connect your wallet');
        return;
      }

      const contract = await getContract();
      const tx = await contract.buyWatch(id, { value: price });
      await tx.wait();
      
      alert('watch bought');
      fetchWatches();
    } catch (error) {
      alert(`couldnt buy watch: ${error.message}`);
    }
  };

  // confirm you got the watch
  const confirmDelivery = async (id) => {
    try {
      const contract = await getContract();
      const tx = await contract.confirmDelivery(id);
      await tx.wait();
      alert('funds sent to seller');
      fetchWatches();
    } catch (error) {
      alert(`confirmation failed: ${error.message}`);
    }
  };

  return (
    <PageContainer>
      <Navbar />

      {/* form to post watches */}
      <Form onSubmit={postWatch}>
        <h2>Post a Watch</h2>
        <Input
          placeholder="Watch Name?"
          value={watchName}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextArea
          placeholder="Description"
          value={desc}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Input
          placeholder="Watch Price (in tBNB)"
          value={watchPrice}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <SubmitButton type="submit">Post Watch</SubmitButton>
      </Form>

      {/* show all watches */}
      <WatchGrid>
        {watches.length > 0 ? (
          watches.map((watch, idx) => (
            <WatchCard key={idx}>
              <h3>{watch.name}</h3>
              <p>{watch.desc}</p>
              <p>Price: {ethers.formatEther(watch.price)} tBNB</p>
              <p>Seller: {watch.seller.slice(0, 6)}...{watch.seller.slice(-4)}</p>
              
              {watch.isSold ? (
                <>
                  <StatusBadge sold>Sold</StatusBadge>
                  <p>Buyer: {watch.buyer.slice(0, 6)}...{watch.buyer.slice(-4)}</p>
                  {!watch.fundsReleased && userWallet.toLowerCase() === watch.buyer.toLowerCase() && (
                    <ActionButton onClick={() => confirmDelivery(watch.id)}>
                      Got Watch
                    </ActionButton>
                  )}
                  {watch.fundsReleased && (
                    <StatusBadge>Funds Released</StatusBadge>
                  )}
                </>
              ) : (
                <>
                  <StatusBadge>Available</StatusBadge>
                  <ActionButton onClick={() => buyWatch(watch.id, watch.price)}>
                    Buy Watch
                  </ActionButton>
                </>
              )}
            </WatchCard>
          ))
        ) : (
          <NoWatches>No watches available</NoWatches>
        )}
      </WatchGrid>
    </PageContainer>
  );
}

// make it look nice css
const PageContainer = styled.div`
  padding: 100px 50px 50px;
  background: #141414;
  min-height: 100vh;
  color: white;
`;

const Form = styled.form`
  background: black;
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 40px;
  max-width: 600px;
  margin: 0 auto 40px;

  h2 {
    color: white;
    margin-bottom: 25px;
    font-size: 28px;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: darkblue;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  transition: all 0.3s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    border-color: darkblue;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: darkblue;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: all 0.3s;
  font-weight: 500;
  letter-spacing: 0.5px;

  &:hover {
    background: green;
    transform: translateY(-2px);
  }
`;

const WatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const WatchCard = styled.div`
  background:black;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
  }

  h3 {
    color: white;
    margin-bottom: 15px;
    font-size: 22px;
    font-weight: 600;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 10px;
    line-height: 1.5;
  }
`;

const ActionButton = styled.button`
  margin-top: 15px;
  padding: 15px 30px;
  background: darkblue;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  width: 100%;
  transition: all 0.3s;
  font-weight: 500;
  letter-spacing: 0.5px;

  &:hover {
    background: green;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

const NoWatches = styled.div`
  text-align: center;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${props => props.sold ? '#dc3545' : '#28a745'};
  color: white;
  font-size: 14px;
  font-weight: 600;
  margin: 10px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;