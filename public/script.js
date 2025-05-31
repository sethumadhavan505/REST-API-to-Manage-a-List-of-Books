const form = document.getElementById('bookForm');
const bookList = document.getElementById('bookList');

// Fetch all books from the server and display them
async function fetchBooks() {
  try {
    const res = await fetch('/api/books');
    const books = await res.json();

    // Clear existing book list
    bookList.innerHTML = '';

    // Render each book
    books.forEach(book => {
      const li = document.createElement('li');

      li.innerHTML = `
        <div class="info">
          <span class="author">${book.author}</span>
          <span class="title">${book.title}</span>
        </div>
        <button onclick="deleteBook(${book.id})">Delete</button>
      `;

      bookList.appendChild(li);
    });
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Handle form submission to add a book
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();

  if (title && author) {
    try {
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });

      form.reset();
      fetchBooks(); // Refresh list after adding
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }
});

// Delete a book by ID
async function deleteBook(id) {
  try {
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    fetchBooks(); // Refresh list after deleting
  } catch (error) {
    console.error('Error deleting book:', error);
  }
}

// Initial fetch on page load
fetchBooks();
