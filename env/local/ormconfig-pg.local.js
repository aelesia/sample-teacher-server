const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'sample-teacher-server',
    autoSchemaSync: true,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ['db/entity/**/*.ts'],
    migrations: ['db/migration/**/*.ts'],
    subscribers: ['db/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'db/entity',
      migrationsDir: 'db/migration',
      subscribersDir: 'db/subscriber',
    },
  },
]
