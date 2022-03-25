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
    conservationstatus: req.body.conservationstatus
  };
  console.log([newSpecies.commonname, newSpecies.scientificname]);
  const result = await db.query(
    'INSERT INTO species(commonname, scientificname, numberinthewild, conservationstatus) VALUES($1, $2, $3, $4) RETURNING *',
    [newSpecies.commonname, newSpecies.scientificname, newSpecies.numberinthewild, newSpecies.conservationstatus],
  );
  console.log(result.rows[0]);
  res.json(result.rows[0]);
});

// create the individuals get request
app.get('/api/individuals', cors(), async (req, res) => {
  try {
    const { rows: individuals } = await db.query('SELECT * FROM individuals');
    res.send(individuals);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the sightings get request
app.get('/api/sightings', cors(), async (req, res) => {
  try {
    const { rows: sightings } = await db.query('SELECT individuals.nickname, sightings.datetime, sightings.health, sightings.locations, sightings.email FROM individuals INNER JOIN sightings ON individuals.id=sightings.individualsighted');
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
