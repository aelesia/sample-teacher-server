const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy

module.exports = [
  {
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'sample_teacher_server_test',
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
