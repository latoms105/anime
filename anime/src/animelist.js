import React, { useState } from 'react';
import axios from 'axios';
import AddComment from './addcomment';
import EditComment from './editcomment';

function AnimeList({ animeData, fetchAnimeData }) {
   const [editingComment, setEditingComment] = useState(null); // Track which comment is being edited

   const handleDeleteComment = (animeId, commentId) => {
      axios
         .delete(`https://anime-h6dy.onrender.com/api/reviews/${animeId}/comments/${commentId}`)
         .then(() => {
            alert('Comment deleted successfully!');
            fetchAnimeData(); // Refresh data after deletion
         })
         .catch((error) => console.error('Error deleting comment:', error));
   };

   return (
      <div>
         {animeData.map((anime) => (
            <div key={anime._id} className='anime-entry'>
               <h2 className='anime-title'>{anime.name}</h2>
               <p className='anime-summary'>{anime.summary}</p>
               <h3 className='comments-header'>Comments:</h3>
               <ul className='comments-list'>
                  {anime.comments?.map((comment) => (
                     <li key={comment.id} className='comment-item'>
                        {editingComment === comment.id ? (
                           <EditComment
                              animeId={anime._id}
                              comment={comment}
                              fetchAnimeData={fetchAnimeData}
                              toggleEdit={() => setEditingComment(null)} // Close edit form
                           />
                        ) : (
                           <div className='comment-content'>
                              <span className='comment-text'>{comment.text}</span> -{' '}
                              <i className='comment-author'>{comment.author}</i>
                              <div className='comment-buttons'>
                                 <button
                                    className='delete-btn'
                                    onClick={() => handleDeleteComment(anime._id, comment.id)}
                                 >
                                    Delete
                                 </button>
                                 <button
                                    className='edit-btn'
                                    onClick={() => setEditingComment(comment.id)} // Open edit form
                                 >
                                    Edit
                                 </button>
                              </div>
                           </div>
                        )}
                     </li>
                  ))}
               </ul>
               <AddComment animeId={anime._id} fetchAnimeData={fetchAnimeData} />
            </div>
         ))}
      </div>
   );
}

export default AnimeList;
