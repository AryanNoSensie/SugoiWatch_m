import React, { useState } from 'react';

import './App.css';
import GetAnime from './components/GetAnime';
import PostAnime from './components/PostAnime';
import PutAnime from './components/PutAnime';
import PatchAnime from './components/PatchAnime';
import DeleteAnime from './components/DeleteAnime';

const API_URL = "http://localhost:3000/api/anime";

function App() {
  const [formData, setFormData] = useState({ id: '', name: '', rating: '' });
  const [response, setResponse] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="response-area">
        <p>{response}</p>
      </div>
      <form>
        <label htmlFor="idInput">Id:</label>
        <input
          type="text"
          id="idInput"
          name="id"
          value={formData.id}
          onChange={handleChange}
        />

        <label htmlFor="AnimeInput">Anime:</label>
        <input
          type="text"
          id="AnimeInput"
          name="name" // Update this line
          value={formData.name} // Update this line
          onChange={handleChange}
        />

        <label htmlFor="ratingInput">rating:</label>
        <input
          type="number"
          id="ratingInput"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />

        <label>Route:</label>
        <div>
          <GetAnime formData={formData} setResponse={setResponse} API_URL={API_URL} />
          <PostAnime formData={formData} setResponse={setResponse} API_URL={API_URL}  />
          <PutAnime formData={formData} setResponse={setResponse} API_URL={API_URL}  />
          <PatchAnime formData={formData} setResponse={setResponse} API_URL={API_URL} />
          <DeleteAnime formData={formData} setResponse={setResponse} API_URL={API_URL}  />
        </div>
      </form>
    </div>
  );
}

export default App;
