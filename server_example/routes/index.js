var express = require('express');
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

var router = express.Router();

async function openDb() {
  return sqlite.open({
    filename: 'bgg.db',
    driver: sqlite3.Database
  })
}

async function getGameData(db, game_name, limit) {
  const params = {
    ':name': game_name,
    ':limit': limit
  };
  const result = await db.all("SELECT * FROM bgg_hotness WHERE game_title = :name ORDER BY hotness_date DESC LIMIT :limit", params);
  return result;
}

async function insertData(db, id, title, rank, date) {
  const sql = `INSERT INTO bgg_hotness (
                  bgg_id,
                  game_title,
                  hotness_rank,
                  hotness_date
              )
              VALUES (
                  :id,
                  :title,
                  :rank,
                  :date
              )
                `;
  const params = {
    ':id': id,
    ':title': title,
    ':rank': rank,
    ':date': date
  };
  const result = await db.run(sql, params);
  return result;
}

/*
;

*/

//get BGG data
router.get('/', async function (req, res, next) {
  const db = await openDb();
  const data = await getGameData(db, 'Gloomhaven', 100);
  return res.json({ response: data });
});

//inserting new BGG data
router.post('/', async function (req, res, next) {
  const db = await openDb();
  const data = await insertData(db, req.body.id, req.body.title, req.body.rank, req.body.date);
  return res.json({ response: data });
});

module.exports = router;
