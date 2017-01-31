const pg       = require("pg");
const settings = require("./settings"); // settings.json

const q = process.argv[2];

const query1 = `
  SELECT * FROM famous_people
  WHERE LOWER(first_name) LIKE LOWER('%${q}%')
  OR LOWER(last_name) LIKE LOWER('%${q}%')
  `;


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
  client.query(query1, [], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Your query returned: ", result.rows[0]); //output: 1
    client.end();
  });
});
