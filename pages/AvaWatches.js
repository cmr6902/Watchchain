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
      await contract.buyWatch(id, { value: price });
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
      await contract.confirmDelivery(id);
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
          watches.map((watch) => (
            <WatchCard key={watch.id}>
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
                    Buy This
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
`;

const Form = styled.form`
  background: gray;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 40px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid gray;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  border: 1px solid gray;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  background: darkblue;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: green;
  }
`;

const WatchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const WatchCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const ActionButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: black;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: green;
  }
`;

const NoWatches = styled.div`
  text-align: center;
  font-size: 1.2rem;
  color: gray;
  padding: 20px;
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 15px;
  background: ${props => props.sold ? '#ff4444' : '#4CAF50'};
  color: white;
  font-size: 0.9rem;
  margin: 10px 0;
`;