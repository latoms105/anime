import React, { useState } from 'react';
import axios from 'axios';

function EditComment({ animeId, comment, fetchAnimeData, toggleEdit }) {
   const [editedText, setEditedText] = useState(comment.text);
   const [editedAuthor, setEditedAuthor] = useState(comment.author);

   const handleEdit = (e) => {
      e.preventDefault();

      axios
         .put(`https://anime-h6dy.onrender.com/api/reviews/${animeId}/comments/${comment.id}`, {
            text: editedText,
            author: editedAuthor,
         })
         .then(() => {
            alert('Comment updated successfully!');
            fetchAnimeData(); // Refresh the list of comments
            toggleEdit(); // Close the edit form
         })
         .catch((error) => console.error('Error updating comment:', error));
   };

   return (
      <form onSubmit={handleEdit}>
         <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            required
         ></textarea>
         <input
            type='text'
            value={editedAuthor}
            onChange={(e) => setEditedAuthor(e.target.value)}
            required
         />
         <button type='submit'>Save</button>
         <button type='button' onClick={toggleEdit}>
            Cancel
         </button>
      </form>
   );
}

export default EditComment;
