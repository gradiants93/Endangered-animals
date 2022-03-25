const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');

const app = express();

const PORT = 4000;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from My ExpressJS' });
});

// create the species get request
app.get('/api/species', cors(), async (req, res) => {
  // const SPECIES = [

  //     { id: 1, commonname: 'Dog', scientificname: 'Canus_familiaris', numberinthewild: 100 },
  //     { id: 2, commonname: 'Cat', scientificname: 'Felis_catus', numberinthewild: 500 },
  // ];
  // res.json(SPECIES);
  try {
    const { rows: species } = await db.query('SELECT * FROM species');
    res.send(species);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the species POST request
app.post('/api/species', cors(), async (req, res) => {
  const newSpecies = {
    commonname: req.body.commonname,
    scientificname: req.body.scientificname,
    numberinthewild: req.body.numberinthewild,
  };
  console.log([newSpecies.commonname, newSpecies.scientificname]);
  const result = await db.query(
    'INSERT INTO species(commonname, scientificname, numberinthewild) VALUES($1, $2, $3) RETURNING *',
    [newSpecies.commonname, newSpecies.scientificname, newSpecies.numberinthewild],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// create the sightings get request
app.get('/api/sightings', cors(), async (req, res) => {
  try {
    const { rows: sightings } = await db.query('SELECT * FROM sightings');
    res.send(sightings);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the sightings POST request
app.post('/api/sightings', cors(), async (req, res) => {
  const newSightings = {
    datetime: req.body.datetime,
    location: req.body.location,
    individualseen: req.body.individualseen,
    health: req.body.health,
    email: req.body.email,
  };
  console.log([newSightings.datetime, newSightings.location, newSightings.individualseen, newSightings.health, newSightings.email]);
  const result = await db.query(
    'INSERT INTO sightings(datetime, locations, individualsighted, health, email) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [newSightings.datetime, newSightings.location, newSightings.individualseen, newSightings.health, newSightings.email],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
