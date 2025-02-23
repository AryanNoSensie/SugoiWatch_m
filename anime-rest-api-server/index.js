import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 3000;
app.use(cors());

app.use(express.json());

// Anime Server GET route
app.get('/', (req, res) => {
    res.send('Hello Anime Server'); 
  });
  

// Initial anime data (in-memory array)
let animeList = [
  { id: 1, name: "Naruto", rating: 8 },
  { id: 2, name: "One Piece", rating: 9 },
  { id: 3, name: "Attack on Titan", rating: 9.5 }
];

// GET: Retrieve all anime
app.get('/api/anime', (req, res) => {
  res.json(animeList);
});

// POST: Add a new anime
app.post('/api/anime', (req, res) => {
  const { name, rating } = req.body;
  const nextId = animeList.length > 0 ? Math.max(...animeList.map(anime => anime.id)) + 1 : 1;
  const newAnime = { id: nextId, name, rating };
  animeList.push(newAnime);
  res.status(201).json(newAnime);
});

// PUT: Update an anime by id (replace entry)
app.put('/api/anime/:id', (req, res) => {
  const { id } = req.params;
  const { name, rating } = req.body;
  const index = animeList.findIndex(anime => anime.id == id);
  if (index === -1) return res.status(404).json({ message: 'Anime not found' });
  animeList[index] = { id: Number(id), name, rating };
  res.json(animeList[index]);
});

// PATCH: Partially update an anime by id
app.patch('/api/anime/:id', (req, res) => {
    const { id } = req.params;
    const { name, rating } = req.body;
    // Find the anime by ID
    const anime = animeList.find(anime => anime.id == id);
    // Check if anime exists
    if (!anime) return res.status(404).json({ message: 'Anime not found' });
    // Update properties if they exist in the request body
    if (name) anime.name = name;
    if (rating) anime.rating = rating;
    // Respond with the updated anime object
    res.json(anime);
  });
  

// DELETE: Remove an anime by id
app.delete('/api/anime/:id', (req, res) => {
  const { id } = req.params;
  const newList = animeList.filter(anime => anime.id != id);
  if (newList.length === animeList.length) return res.status(404).json({ message: 'Anime not found' });
  animeList = newList;
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
