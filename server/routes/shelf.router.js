const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  pool.query(`SELECT * FROM "item";`).then(result => res.send(result.rows))
  .catch(err => {
    console.log('ERROR in GET', err);
    res.sendStatus(500);
  }); // For testing only, can be removed
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
  const shelfItem = req.body;
  const userId = req.user.id;
  const queryText = `INSERT INTO "item" (description, image_url, user_id)
  VALUES ($1, $2, $3);`;
  console.log('in shelf POST, userId:', userId);
  
  pool.query(queryText, [shelfItem.description, shelfItem.image_url, userId])
  .then(result => {
    console.log('in POST .then');
    res.sendStatus(200)
  }).catch(err => {
    console.log('ERROR in POST', err);
    res.sendStatus(500)
  })
  // endpoint functionality
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
