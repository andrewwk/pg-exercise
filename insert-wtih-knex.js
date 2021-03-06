const pg           = require('pg');
const settings     = require('./knex-settings'); // export db connection settings
const knex         = require('knex')(settings);
const params       = [process.argv[2]]; // must be passed in as an array
const params1       = [process.argv[2], process.argv[3], process.argv[4]]; // must be passed in as an array

const search = (callback, params) => {
  return knex('famous_people')
    .select()
    .where(
      knex.raw(`LOWER(first_name) LIKE LOWER('%${params}%')`)
    )
    .orWhere(
      knex.raw(`LOWER(last_name) LIKE LOWER('%${params}%')`)
    )
    .then((result) => {
      callback(result);
      knex.destroy();
    })
    .catch((err, result) => {
      if (err) {
        console.log(`Error: ${err}`);
        knex.destroy();
      } else {
        console.log(`Result: ${result}`);
        knex.destroy();
      }
    }
  );
};

const printQueryResult = (result) => {
  result.forEach((people) => {
    for (let person in people) {
      console.log(people[person]);
    }
  });
};

// search(printQueryResult, params);

// Alternative method with promises
// const search2 = () => {
//   return knex('famous_people')
//     .select()
//     .catch((err, result) => {
//       if (err) {
//         console.log(`Error: ${err}`);
//       } else {
//         console.log(`Result: ${result}`);
//       }
//     }
//   );
// };
//
// search2().then((result)=>{console.log(result);})
const p1 = {
  first_name: 'John',
  last_name: 'Wick',
  birthdate: '1964-02-09'
};

const p2 = {
  first_name: 'Juan',
  last_name: 'Wick',
  birthdate: '1964-02-09'
};

const dbInsert = (p) => {
  return knex('famous_people')
    .insert(p)
    .then()
    .catch((err, result) => {
      if (err) {
        console.log(err);
        knex.destroy();
      } else {
        console.log("Successful insertion into the database", result);
        knex.destroy();
      }
    });
};

const dbInsert2 = (person) => {
  return knex('famous_people')
    .insert({
      first_name: person[0],
      last_name: person[1],
      birthdate: person[2]
    })
    .then(() => {
      knex.destroy();
    })
    .catch((err, result) => {
      if (err) {
        console.log(err);
        knex.destroy();
      } else {
        console.log("Successful insertion into the database", result);
        knex.destroy();
      }
    });
};

// dbInsert(p1);
// dbInsert(p2);
dbInsert2(params1);
