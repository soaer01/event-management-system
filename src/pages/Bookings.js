import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeBooking } from '../store/regSlice';

function MyBookings() {
  const { currentUser } = useSelector((state) => state.auth);
  const { myBookings } = useSelector((state) => state.regs);
  const dispatch = useDispatch();

  const myEvents = myBookings.filter(b => b.userId === currentUser?.id);
  const todayStr = new Date().toISOString().split('T')[0];

  const upcoming = myEvents.filter(b => b.event.date >= todayStr || b.event.date === 'TBA');
  const past = myEvents.filter(b => b.event.date < todayStr && b.event.date !== 'TBA');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>My Registered Events</h1>

      <h3>Upcoming Events</h3>
      {upcoming.length === 0 ? <p>No upcoming events.</p> : (
        upcoming.map(item => (
          <div key={item.event.id} style={{ border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
            <h4>{item.event.name}</h4>
            <p>Date: {item.event.date}</p>
            <p>Venue: {item.event.venue}</p>
            <button onClick={() => dispatch(removeBooking({ userId: currentUser.id, eventId: item.event.id }))}>
              Cancel
            </button>
          </div>
        ))
      )}

      <h3 style={{ marginTop: '30px' }}>Completed Events</h3>
      {past.length === 0 ? <p>No past events.</p> : (
        past.map(item => (
          <div key={item.event.id} style={{ border: '1px solid #ddd', background: '#f9f9f9', padding: '10px', marginBottom: '10px' }}>
            <h4>{item.event.name} (Passed)</h4>
            <p>Date: {item.event.date}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;