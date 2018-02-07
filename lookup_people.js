const pg = require("pg");
const settings = require("./settings"); // settings.json


function performQuery(query, name, callback) {
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, name, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${result.rows.length} by the name ` + name);
    for (let row of result.rows) {
     console.log(`${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
    }
    client.end();
  });
});
}

function findFamousPeople(searchTerm, callback) {
    const query = `
    SELECT * FROM famous_people
    WHERE last_name = $1::text`;

    const name = [process.argv[2]];

    performQuery(query, name, callback);
}

findFamousPeople();
