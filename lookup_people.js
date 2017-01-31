const pg       = require("pg");
const settings = require("./settings"); // export db connection settings

const params = [process.argv[2]]; // must be passed in as an array

// using backticks allows for multiline string interpolation i.e. more readable query code block
const query1 = `
  SELECT * FROM famous_people
  WHERE LOWER(first_name) LIKE LOWER(CONCAT('%',$1::text,'%'))
  OR LOWER(last_name) LIKE LOWER(CONCAT('%',$1::text,'%'))
`;

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const logErrorPrintResult = (err, result) => {
  if (!result || err) {
    console.log(err);
  }
  console.log(result);
};

const connect = (q, params, cb) => {
  client.connect((err) => {
    if (err) {
      cb(err);
    }
    client.query(q, params, (err, result) => {
      cb(err, result.rows[0]);
      client.end();
    });
  });
};

connect(query1, params, logErrorPrintResult);
