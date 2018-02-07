const settings = require("./settings"); // settings.json

function performQuery(query, name) {
  var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database: settings.database
    }
  });

  var insert1 = {first_name: process.argv[2], last_name: process.argv[3], birthdate: process.argv[4]};
  knex.insert(insert1).into("famous_people")
    .then((result) => {
    });
  };

  performQuery();

