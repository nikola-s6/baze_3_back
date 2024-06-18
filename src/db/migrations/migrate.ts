import fs from 'fs';
import path from 'path';
import { transaction } from '../db';

(async () => {
  const create = fs.readFileSync(
    path.join(__dirname, 'sql', 'db_creation.sql'),
    {
      encoding: 'utf-8',
      flag: 'r',
    }
  );
  const seed = fs.readFileSync(path.join(__dirname, 'sql', 'db_seed.sql'), {
    encoding: 'utf-8',
    flag: 'r',
  });
  await transaction(async (client) => {
    console.log('Starting migration...');
    await client.query(create);
    console.log('Migration done!');
    console.log('Seeding the database...');
    await client.query(seed);
    console.log('Done seeding!');
  }, true);
})()
  .then(() => {
    console.log('Database successfully migrated!');
  })
  .catch((err) => {
    console.log(err);
    console.log('Error migrating database');
  });
