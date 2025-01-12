const mongoose = require('mongoose');

// Schema and Model
const commentSchema = new mongoose.Schema({
   id: String,
   text: String,
   author: String,
});

const animeSchema = new mongoose.Schema({
   name: String,
   summary: String,
   comments: [commentSchema],
});

const Anime = mongoose.model('characterReviews', animeSchema, 'characterReviews');
module.exports = Anime;
