const mongoose = require('mongoose');
const Anime =  require('../model/animeSchema.js')

// MongoDB Connection
mongoose.connect(
   'mongodb+srv://latoms:Maya3830@cluster0.cbu2m.mongodb.net/anime_reviews?retryWrites=true&w=majority&appName=Cluster0',
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }
);

const migrate = async()=>{
   try{
      const animes = [
         {
            name: 'Naruto',
            summary: 'A ninja story',
            comments: [],
         },
         {
            name: 'Monkey master',
            summary: 'monkey master',
            comments: [],
         },
         {
            name: 'Ninja master',
            summary: 'ninja master',
            comments: [],
         }
      ]
  for (let i  = 0; i < animes.length;i++){
    const anime = new Anime(animes[i]);
         const savedAnime = await anime.save();
  }
   }catch(error){

   }
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
   console.log('Connected to MongoDB');
  // migrate()
});

module.exports = {
   db,
};
