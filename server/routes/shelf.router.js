const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

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
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  let id = req.params.id; // id of the item to delete
  console.log('router.delete called with the id of:', id);
  console.log('req.user.id is:', req.user.id);

  // Use let instead of const to allow queryText to change
  let queryText = `SELECT * FROM "item" WHERE id = $1;`; // Grabs the specific item matching the user_id
  const queryValue = [id];
  pool.query(queryText, queryValue)
    .then((result) => {
      console.log('The result is:', result.rows[0].user_id);
      // Check to see if the current user is the one who added the image
      if (result.rows[0].user_id === req.user.id) {
        // Update queryText
        queryText = `DELETE FROM "item" WHERE id = $1;`;
        pool.query(queryText, [id])
          .then(result => {
            res.sendStatus(201);
          })
          .catch(error => {
            res.sendStatus(500);
          });
      } else {
        res.sendStatus(401);
      }
    })
    .catch(error => {
      res.sendStatus(500);
    });
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
  let id = req.params.id; // id of the item to delete
  console.log('router.put called with the id of:', id);
  console.log('req.user.id is:', req.user.id);
  // Updates description + image of id selected
  let queryText = `UPDATE item SET description = $1, image_url = $2 WHERE id = $3;`;
  // to be continued...
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  router.get('/', (req, res) => {
    pool.query(`SELECT "user"."username", SUM("item"."user_id") FROM "user"
    JOIN "item"
    ON "user"."id"="item"."user_id"
    GROUP BY "user"."username";`).then(result => res.send(result.rows))
      .catch(err => {
        console.log('ERROR in GET', err);
        res.sendStatus(500);
      });
  });
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
