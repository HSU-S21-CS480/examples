const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');


// you would have to import / invoke this in another file
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
    for (let item of result) {
        console.log(item);
    }
}

async function main() {
    const db = await openDb();
    await getGameData(db, "Gloomhaven", 10);
    await getGameData(db, "On Mars", 50);
} 

(async () => {await main();})();