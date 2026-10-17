import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addBooking, removeBooking, clearMsg } from '../store/regSlice';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { myBookings, msg } = useSelector((state) => state.regs);

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  const alreadyReg = currentUser && myBookings.some(b => b.userId === currentUser.id && b.event.id === id);

  useEffect(() => {
    dispatch(clearMsg());
    async function loadOne() {
      try {
        const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
        const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`);
        const data = await res.json();
        setEventData(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }
    loadOne();
  }, [id, dispatch]);

  const handleRegisterClick = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    const simplified = {
      id: eventData.id,
      name: eventData.name,
      date: eventData.dates?.start?.localDate || 'TBA',
      venue: eventData._embedded?.venues?.[0]?.name || 'N/A'
    };
    dispatch(addBooking({ userId: currentUser.id, event: simplified }));
  };

  const handleCancelClick = () => {
    dispatch(removeBooking({ userId: currentUser.id, eventId: eventData.id }));
  };

  if (loading) return <p>Loading details...</p>;
  if (!eventData) return <p>Event not found!</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>{eventData.name}</h2>
      <img src={eventData.images?.[0]?.url} alt="" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
      <p><b>Date:</b> {eventData.dates?.start?.localDate}</p>
      <p><b>Venue:</b> {eventData._embedded?.venues?.[0]?.name}</p>
      <p>{eventData.info || "No extra description available."}</p>

      {msg && <p style={{ background: '#e2f0d9', padding: '10px', color: '#385723' }}>{msg}</p>}

      <div style={{ marginTop: '20px' }}>
        {alreadyReg ? (
          <button onClick={handleCancelClick} style={{ background: 'red', color: 'white', padding: '10px' }}>
            Cancel Registration
          </button>
        ) : (
          <button onClick={handleRegisterClick} style={{ background: 'green', color: 'white', padding: '10px' }}>
            Register For Event
          </button>
        )}
      </div>
    </div>
  );
}

export default Details;