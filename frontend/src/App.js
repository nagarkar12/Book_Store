import React, { useState, useEffect } from 'react';
     import axios from 'axios';
     import './App.css';

     const App = () => {
       const [books, setBooks] = useState([]);
       const [form, setForm] = useState({
         title: '',
         author: '',
         category: '',
         publishedYear: '',
       });
       const [editId, setEditId] = useState(null);

       useEffect(() => {
         fetchBooks();
       }, []);

       const fetchBooks = async () => {
         try {
           const response = await axios.get('http://localhost:5000/api/books');
           setBooks(response.data);
         } catch (error) {
           console.error('Error fetching books:', error);
         }
       };

       const handleInputChange = (e) => {
         setForm({ ...form, [e.target.name]: e.target.value });
       };

       const handleSubmit = async (e) => {
         e.preventDefault();
         try {
           if (editId) {
             await axios.put(`http://localhost:5000/api/books/${editId}`, form);
             setEditId(null);
           } else {
             await axios.post('http://localhost:5000/api/books', form);
           }
           setForm({ title: '', author: '', category: '', publishedYear: '' });
           fetchBooks();
         } catch (error) {
           console.error('Error saving book:', error);
         }
       };

       const handleEdit = (book) => {
         setForm({
           title: book.title,
           author: book.author,
           category: book.category,
           publishedYear: book.publishedYear,
         });
         setEditId(book._id);
       };

       const handleDelete = async (id) => {
         try {
           await axios.delete(`http://localhost:5000/api/books/${id}`);
           fetchBooks();
         } catch (error) {
           console.error('Error deleting book:', error);
         }
       };

       return (
         <div className="container">
           <h1>Book Store</h1>
           <form onSubmit={handleSubmit}>
             <input
               type="text"
               name="title"
               placeholder="Title"
               value={form.title}
               onChange={handleInputChange}
               required
             />
             <input
               type="text"
               name="author"
               placeholder="Author"
               value={form.author}
               onChange={handleInputChange}
               required
             />
             <input
               type="text"
               name="category"
               placeholder="Category"
               value={form.category}
               onChange={handleInputChange}
               required
             />
             <input
               type="number"
               name="publishedYear"
               placeholder="Published Year"
               value={form.publishedYear}
               onChange={handleInputChange}
               required
             />
             <button type="submit">{editId ? 'Update Book' : 'Add Book'}</button>
           </form>
           <h2>All Books</h2>
           <table>
             <thead>
               <tr>
                 <th>Title</th>
                 <th>Author</th>
                 <th>Category</th>
                 <th>Published Year</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {books.map((book) => (
                 <tr key={book._id}>
                   <td>{book.title}</td>
                   <td>{book.author}</td>
                   <td>{book.category}</td>
                   <td>{book.publishedYear}</td>
                   <td>
                     <button onClick={() => handleEdit(book)}>Edit</button>
                     <button onClick={() => handleDelete(book._id)}>Delete</button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       );
     };

     export default App;