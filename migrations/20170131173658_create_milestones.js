exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('milestones', (t) => {
      t.increments();
      t.string('description');
      t.date('date_achieved');
      t.timestamps();
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ])
};
