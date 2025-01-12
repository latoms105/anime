import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeList from './animelist';
import './App.css';

function App() {
   const [animeData, setAnimeData] = useState([]);
   const [error, setError] = useState('');

   // Fetch anime data from the backend
   const fetchAnimeData = () => {
      axios
         .get('https://anime-h6dy.onrender.com/api/reviews')
         .then((response) => setAnimeData(response.data))
         .catch((err) => setError('Failed to fetch anime data: ' + err.message));
   };

   useEffect(() => {
      fetchAnimeData(); // Fetch data on initial load
   }, []);

   return (
      <div className='App'>
         <h1>Anime Review Platform</h1>
         {error && <p style={{ color: 'red' }}>{error}</p>}
         <AnimeList animeData={animeData} fetchAnimeData={fetchAnimeData} />
      </div>
   );
}

export default App;
