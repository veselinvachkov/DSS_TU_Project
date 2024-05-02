import React, { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    isbn: '',
    price: '',
    publicationDate: null
  });

  const [showCalendar, setShowCalendar] = useState(false);
  const datePickerRef = useRef();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
        if (value === '' || (!isNaN(value) && parseFloat(value) >= 0)) {
            setNewBook({
                ...newBook,
                [name]: value
            });
        }
    } else if (name === 'isbn') {
        if (/^[0-9\-]*$/.test(value)) {
            setNewBook({
                ...newBook,
                [name]: value
            });
        }
    } else {
        setNewBook({
            ...newBook,
            [name]: value
        });
    }
};


  const handleDateChange = (date) => {
    setNewBook({
      ...newBook,
      publicationDate: date
    });
    setShowCalendar(false);
  };


  const handleClick = () => {
    setShowCalendar(true);
  };


  const handleSubmit = (e) => {
	e.preventDefault();
	if (
	  newBook.title &&
	  newBook.author &&
	  newBook.isbn &&
	  newBook.price &&
	  newBook.publicationDate
	) {
	  const formattedPublicationDate = newBook.publicationDate.toISOString().split('T')[0];
  
	  if (selectedBook) {
		const updatedBooks = books.map(book =>
		  book.id === selectedBook.id ? { ...newBook, id: selectedBook.id, publicationDate: formattedPublicationDate } : book
		);
		setBooks(updatedBooks);
		setSelectedBook(null);
	  } else {
		const updatedBooks = [
		  ...books,
		  { ...newBook, id: books.length + 1, publicationDate: formattedPublicationDate }
		];
		setBooks(updatedBooks);
	  }
  
	  setNewBook({
		title: '',
		author: '',
		isbn: '',
		price: '',
		publicationDate: null
	  });
	}
  };
  

  const handleDelete = (id) => {
	const updatedBooks = books.filter(book => book.id !== id);
	const updatedBooksWithIds = updatedBooks.map((book, index) => ({
	  ...book,
	  id: index + 1
	}));
	setBooks(updatedBooksWithIds);
  };
  

  const handleEdit = (book) => {
    setSelectedBook(book);
    const formattedPublicationDate = book.publicationDate ?
      new Date(book.publicationDate) : null;
    setNewBook({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: book.price,
      publicationDate: formattedPublicationDate
    });
};


  const handleClear = () => {
    setSelectedBook(null);
    setNewBook({
      title: '',
      author: '',
      isbn: '',
      price: '',
      publicationDate: null
    });
  };


  return (
    <div className="App">
      <nav className="navbar">Library Management System</nav>
      <div className="content">
        <section className="content-list">
          <h2>Books List</h2>
          <ul>
            {books.map(book => (
              <li key={book.id}>
                <p className="id">ID: {book.id}</p>
                <p className="field1">Title: {book.title}</p>
                <p className="field2">Author: {book.author}</p>
                <p className="field3">ISBN: {book.isbn}</p>
                <p className="field4">Price: {book.price}</p>
                <p className="field5">Publication Date: {book.publicationDate}</p>
                <button className="deleteButton" onClick={() => handleDelete(book.id)}>Delete</button>
                <button onClick={() => handleEdit(book)}>Edit</button>
              </li>
            ))}
          </ul>
        </section>
        <section className="content-details">
          <h2>{selectedBook ? 'Edit Book' : 'Add Book'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="field1"
              name="title"
              placeholder="Title"
              value={newBook.title}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="field2"
              name="author"
              placeholder="Author"
              value={newBook.author}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="field3"
              name="isbn"
              placeholder="ISBN"
              value={newBook.isbn}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="field4"
              name="price"
              placeholder="Price"
              value={newBook.price}
              onChange={handleInputChange}
              required
            />
            <div className="date-picker-wrapper">
              <input
                type="text"
                id="field5"
                name="publicationDate"
                placeholder="Publication Date"
                value={newBook.publicationDate ? newBook.publicationDate.toISOString().split('T')[0] : ''}
                onFocus={handleClick}
                readOnly
                required
              />
              {showCalendar && (
                <DatePicker
                  selected={newBook.publicationDate}
                  onChange={handleDateChange}
                  inline
                  ref={datePickerRef}
                  dateFormat="yyyy-MM-dd"
                  className="date-picker"
                />
              )}
            </div>
            <button type="submit" id="saveButton">{selectedBook ? 'Save' : 'Add'}</button>
            <button type="button" id="clearButton" onClick={handleClear}>Clear</button>
          </form>
        </section>
      </div>
      <footer className="footer">https://github.com/veselinvachkov</footer>
    </div>
  );
}

export default App;
