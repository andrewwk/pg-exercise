exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('milestones', (t) => {
      t.integer('famous_person_id').unsigned();
      t.foreign('famous_person_id').references('famous_people.id')
    })
  ])
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.table('milestones', (t) => {
      t.dropColumn('famous_person_id');
    })
  ])
};
