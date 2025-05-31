const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let books = [];
let idCounter = 1;

app.get('/api/books', (req, res) => {
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  const newBook = { id: idCounter++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;
  const book = books.find(b => b.id == id);
  if (book) {
    book.title = title;
    book.author = author;
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

app.delete('/api/books/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
