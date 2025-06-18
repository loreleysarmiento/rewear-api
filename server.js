const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let db = JSON.parse(fs.readFileSync('db.json', 'utf8'));

// PROFILES
app.get('/profiles', (req, res) => res.json(db.profiles));
app.get('/profiles/:id', (req, res) => {
  const item = db.profiles.find(i => i.id == req.params.id);
  item ? res.json(item) : res.sendStatus(404);
});
app.post('/profiles', (req, res) => {
  const nuevo = req.body;
  nuevo.id = db.profiles.length + 1;
  db.profiles.push(nuevo);
  res.status(201).json(nuevo);
});
app.put('/profiles/:id', (req, res) => {
  const index = db.profiles.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    db.profiles[index] = { ...req.body, id: parseInt(req.params.id) };
    res.json(db.profiles[index]);
  } else res.sendStatus(404);
});
app.delete('/profiles/:id', (req, res) => {
  const index = db.profiles.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    db.profiles.splice(index, 1);
    res.sendStatus(204);
  } else res.sendStatus(404);
});

// CLOTHES
app.get('/clothes', (req, res) => res.json(db.clothes));
app.get('/clothes/:id', (req, res) => {
  const item = db.clothes.find(i => i.id == req.params.id);
  item ? res.json(item) : res.sendStatus(404);
});
app.post('/clothes', (req, res) => {
  const nuevo = req.body;
  nuevo.id = `P${Math.floor(Math.random() * 10000)}`;
  db.clothes.push(nuevo);
  res.status(201).json(nuevo);
});
app.put('/clothes/:id', (req, res) => {
  const index = db.clothes.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    db.clothes[index] = { ...req.body, id: req.params.id };
    res.json(db.clothes[index]);
  } else res.sendStatus(404);
});
app.delete('/clothes/:id', (req, res) => {
  const index = db.clothes.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    db.clothes.splice(index, 1);
    res.sendStatus(204);
  } else res.sendStatus(404);
});

// CATEGORIES
app.get('/categories', (req, res) => res.json(db.categories));
app.get('/categories/:id', (req, res) => {
  const item = db.categories.find(i => i.id == req.params.id);
  item ? res.json(item) : res.sendStatus(404);
});
app.post('/categories', (req, res) => {
  const nuevo = req.body;
  nuevo.id = `C${Math.floor(Math.random() * 10000)}`;
  db.categories.push(nuevo);
  res.status(201).json(nuevo);
});
app.put('/categories/:id', (req, res) => {
  const index = db.categories.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    db.categories[index] = { ...req.body, id: req.params.id };
    res.json(db.categories[index]);
  } else res.sendStatus(404);
});
app.delete('/categories/:id', (req, res) => {
  const index = db.categories.findIndex(i => i.id == req.params.id);
  if (index !== -1) {
    db.categories.splice(index, 1);
    res.sendStatus(204);
  } else res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`API corriendo en puerto ${PORT}`);
});
