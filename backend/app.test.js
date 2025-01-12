const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('./app'); // Update this to the path of your app file
const  Anime = require('./model/animeSchema'); // Update this to the path of your Anime model

let mongoServer;

beforeAll(async () => {
   mongoServer = await MongoMemoryServer.create();
   const uri = mongoServer.getUri();

   // Close any existing connections
   if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
   }

   await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
   await mongoose.connection.dropDatabase();
   await mongoose.connection.close();
   await mongoServer.stop();
});

describe('Anime Reviews API', () => {
   let animeId;

   beforeEach(async () => {
      const anime = new Anime({
         name: 'Naruto',
         summary: 'A ninja story',
         comments: [],
      });
      const savedAnime = await anime.save();
      animeId = savedAnime._id;
   });

   afterEach(async () => {
      await Anime.deleteMany();
   });

   it('should fetch all anime reviews', async () => {
      const response = await request(app).get('/api/reviews');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
      expect(response.body[0].name).toBe('Naruto');
   });

   it('should add a comment to an anime', async () => {
      const response = await request(app)
         .post(`/api/reviews/${animeId}/comments`)
         .send({ text: 'Great anime!', author: 'John Doe' });

      expect(response.status).toBe(201);
      expect(response.body.text).toBe('Great anime!');
      expect(response.body.author).toBe('John Doe');

      const anime = await Anime.findById(animeId);
      expect(anime.comments.length).toBe(1);
      expect(anime.comments[0].text).toBe('Great anime!');
   });

   it('should edit a comment', async () => {
      const { body: newComment } = await request(app)
         .post(`/api/reviews/${animeId}/comments`)
         .send({ text: 'Good show!', author: 'Jane Doe' });

      const response = await request(app)
         .put(`/api/reviews/${animeId}/comments/${newComment.id}`)
         .send({ text: 'Amazing show!', author: 'Jane Doe' });

      expect(response.status).toBe(200);
      expect(response.body.text).toBe('Amazing show!');

      const anime = await Anime.findById(animeId);
      expect(anime.comments[0].text).toBe('Amazing show!');
   });

   it('should delete a comment', async () => {
      const { body: newComment } = await request(app)
         .post(`/api/reviews/${animeId}/comments`)
         .send({ text: 'Good anime', author: 'Tester' });

      const response = await request(app).delete(
         `/api/reviews/${animeId}/comments/${newComment.id}`
      );
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Comment deleted successfully');

      const anime = await Anime.findById(animeId);
      expect(anime.comments.length).toBe(0);
   });
});
