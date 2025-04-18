

import React, { useState, useEffect } from 'react';
import { useStateContext } from '@/context/StateContext';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { database } from '@/backend/Firebase';
import Navbar from '@/components/Dashboard/Navbar';
import styled from 'styled-components';
import { postEvent } from '@/backend/actualEvents';


const MyEvents = () => {
  const { user } = useStateContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const querySnapshot = await getDocs(collection(database, "events"));
        const eventList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(eventList);
      } catch (error) {
        console.error("Error fetching events: ", error);
        alert("Failed to load events.");
      }
    }
    fetchEvents();
  }, []);
  
  // event posting
  const eventPost = async (e) => {
    e.preventDefault();
    const userEmail = user.email || "Unknown user";
    
    try {
      await postEvent(title, description, date, location, user.uid, userEmail);
      alert("Event posted successfully!");
      const querySnapshot = await getDocs(collection(database, "events"));
      const eventList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventList);
      
      // reset to empty
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
    } catch (error) {
      console.error("Error in handleSubmit: ", error);
      alert("Failed to post event: " + error.message);
    }
  };
  
  return (
    <>
      <Navbar/>
      <Section>
        <Header> Current Events</Header>
        {/* events for users only */}
        <form onSubmit={eventPost}>
          <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <button type="submit">Post Event</button>
        </form>
        {/* displaying events*/}
        <Header>Upcoming Events</Header>
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><small>Contact Info: {event.userEmail}</small></p>
            </div>
          ))
        ) : (
          <p>No events posted yet.</p>
        )}
      </Section>
      <UserLocation/>
      <MapWithUserLocation/>
    </>
  );
};


const Header = styled.h1`
margin-bottom: 20px;
color: red;
`

const Section = styled.section`
  padding-top: 100px; /* Adjust this value depending on the height of your navbar */
  max-width: auto;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  background: #121212;
  form {
    display: flex;
    color: white;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
    
    input, textarea {
      padding: 10px;
      border-radius: 4px;
      background: white;
    }
    
    textarea {
      min-height: 100px;
    }
    
    button {
      padding: 10px 15px;
      background-color: orangered;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: green;
        transition: all 0.5s ease;
      }
    }
  }
  
  div {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: white;
    color: black;
    
    h3 {
      margin-top: 0;
    }
  }
`;

export default MyEvents;
