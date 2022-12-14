const db = require('../config/connection');
const { Album } = require('../models');
const albumSeeds = require('./albumSeeds.json');

db.once('open', async () => {
  await Album.deleteMany({});
  await Album.create(AlbumSeeds);

  console.log('all done!');
  process.exit(0);
});
