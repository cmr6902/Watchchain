
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { database } from './Firebase';

// post events
export const postEvent = async (title, description, date, location, userId, userEmail) => {
  try {
    const eventsRef = collection(database, "events");
    const newEvent = {
      title,
      description,
      date,
      location,
      createdBy: userId,
      userEmail: userEmail,
      createdAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(eventsRef, newEvent);
    return docRef.id;
    }
    catch (error){
    console.error("Error posting event: ", error);
    throw error;
  }
};