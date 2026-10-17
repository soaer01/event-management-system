import React from 'react';
import { Link } from 'react-router-dom';

function EventCard({ item }) {
  const imgUrl = item.images && item.images.length > 0 ? item.images[0].url : 'https://via.placeholder.com/150';
  
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '15px', background: '#fff' }}>
      <img src={imgUrl} alt="event" style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
      <h3>{item.name}</h3>
      <p>Date: {item.dates?.start?.localDate || 'Coming soon'}</p>
      <p>Venue: {item._embedded?.venues?.[0]?.name || 'N/A'}</p>
      <Link to={`/event/${item.id}`} style={{ display: 'inline-block', marginTop: '10px', background: 'blue', color: 'white', padding: '5px 10px', textDecoration: 'none' }}>
        View Details
      </Link>
    </div>
  );
}

export default EventCard;