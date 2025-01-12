const express = require('express');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs for comments
const Anime = require('../model/animeSchema');
const router = express.Router();

// Fetch all anime
router.get('/reviews', async (req, res) => {
   try {
      const anime = await Anime.find({});
      res.status(200).json(anime);
   } catch (error) {
      res.status(500).json({ error: 'Error fetching anime list' });
   }
});

// Add a comment to an anime
router.post('/reviews/:id/comments', async (req, res) => {
   const { id } = req.params;
   const { text, author } = req.body;

   try {
      const anime = await Anime.findOne({ _id: id });
      if (!anime) {
         return res.status(404).json({ error: 'Anime not found' });
      }

      const newComment = { id: uuidv4(), text, author };
      anime.comments.push(newComment);
      await anime.save();

      res.status(201).json(newComment);
   } catch (error) {
      res.status(500).json({ error: 'Error adding comment' });
   }
});

// Edit a comment
router.put('/reviews/:animeId/comments/:commentId', async (req, res) => {
   const { animeId, commentId } = req.params;
   const { text, author } = req.body;

   try {
      const anime = await Anime.findOne({ _id: animeId });
      if (!anime) {
         return res.status(404).json({ error: 'Anime not found' });
      }

      const comment = anime.comments.find((c) => c.id === commentId);
      if (!comment) {
         return res.status(404).json({ error: 'Comment not found' });
      }

      comment.text = text || comment.text;
      comment.author = author || comment.author;
      await anime.save();

      res.status(200).json(comment);
   } catch (error) {
      res.status(500).json({ error: 'Error editing comment' });
   }
});

// Delete a comment
router.delete('/reviews/:animeId/comments/:commentId', async (req, res) => {
   const { animeId, commentId } = req.params;

   try {
      const anime = await Anime.findOne({ _id: animeId });
      if (!anime) {
         return res.status(404).json({ error: 'Anime not found' });
      }

      const commentIndex = anime.comments.findIndex((c) => c.id === commentId);
      if (commentIndex === -1) {
         return res.status(404).json({ error: 'Comment not found' });
      }

      anime.comments.splice(commentIndex, 1);
      await anime.save();

      res.status(200).json({ message: 'Comment deleted successfully' });
   } catch (error) {
      res.status(500).json({ error: 'Error deleting comment' });
   }
});

module.exports = router;
