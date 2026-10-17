import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { startLoading, getEventsSuccess, getEventsFail, updateFilters } from '../store/eventSlice';
import EventCard from '../components/EventCard';

function Home() {
  const dispatch = useDispatch();
  const { eventList, loading, err, searchKey, selectedCat, cityFilter } = useSelector((state) => state.events);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const [keywordBox, setKeywordBox] = useState(searchKey);
  const [cityBox, setCityBox] = useState(cityFilter);

  useEffect(() => {
    async function fetchFromTicketmaster() {
      dispatch(startLoading());
      try {
        const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
        let queryUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=12`;
        
        if (searchKey) queryUrl += `&keyword=${searchKey}`;
        if (selectedCat) queryUrl += `&classificationName=${selectedCat}`;
        if (cityFilter) queryUrl += `&city=${cityFilter}`;

        const res = await fetch(queryUrl);
        const data = await res.json();
        
        const arr = data._embedded ? data._embedded.events : [];
        dispatch(getEventsSuccess(arr));
      } catch (error) {
        dispatch(getEventsFail(error.message));
      }
    }
    fetchFromTicketmaster();
  }, [searchKey, selectedCat, cityFilter, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(updateFilters({ searchKey: keywordBox, cityFilter: cityBox }));
    setSearchParams({ q: keywordBox, city: cityBox });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Explore Events</h1>
      
      <form onSubmit={handleSearch} style={{ margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Search keyword..." 
          value={keywordBox} 
          onChange={(e) => setKeywordBox(e.target.value)} 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <input 
          type="text" 
          placeholder="City..." 
          value={cityBox} 
          onChange={(e) => setCityBox(e.target.value)} 
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 15px' }}>Search</button>
      </form>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => dispatch(updateFilters({ selectedCat: '' }))} style={{ marginRight: '5px' }}>All</button>
        <button onClick={() => dispatch(updateFilters({ selectedCat: 'Music' }))} style={{ marginRight: '5px' }}>Music</button>
        <button onClick={() => dispatch(updateFilters({ selectedCat: 'Sports' }))} style={{ marginRight: '5px' }}>Sports</button>
        <button onClick={() => dispatch(updateFilters({ selectedCat: 'Arts & Theatre' }))}>Arts</button>
      </div>

      {loading && <p>Loading events...</p>}
      {err && <p style={{ color: 'red' }}>Error: {err}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {!loading && eventList.map((ev) => (
          <EventCard key={ev.id} item={ev} />
        ))}
      </div>
    </div>
  );
}

export default Home;