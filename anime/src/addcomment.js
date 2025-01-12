import React, { useState } from 'react';
import axios from 'axios';

function AddComment({ animeId, fetchAnimeData }) {
   const [author, setAuthor] = useState('');
   const [text, setText] = useState('');

   const handleSubmit = (e) => {
      e.preventDefault();

      axios
         .post(`http://localhost:3001/api/reviews/${animeId}/comments`, { text, author })
         .then(() => {
            alert('Comment added successfully!');
            setAuthor('');
            setText('');
            fetchAnimeData(); // Refresh data after adding a comment
         })
         .catch((error) => console.error('Error adding comment:', error));
   };

   return (
      <form onSubmit={handleSubmit}>
         <input
            type='text'
            placeholder='Your name'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
         />
         <textarea
            placeholder='Your comment'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
         ></textarea>
         <button type='submit'>Add Comment</button>
      </form>
   );
}

export default AddComment;
