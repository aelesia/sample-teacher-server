# Setup

## Requirements

- NodeJS >=12.6.0
- MySQL >=5.7 installed
- yarn

## Install Dependencies

- `yarn install`

## Setup Database

### Pre-requisites

- You must have a client capable of connecting to MySQL database and creating a new schema
- You must have the following information available:
  - Username
  - Password
  - Network Address
  - Port

### ormconfig.js`

1) Open the file located in `env/local/ormconfig.local.js`
2) Replace the fields below with your own host, port, username, password
3) Save
4) Do the same for env/test/ormconfig.test.js
```
host: 'localhost',
port: 3306,
username: 'root',
password: '',
```

### Creating Database

1) Start your MySQL database
2) Open your MySQL database in your preferred client
3) Run the following scripts:

```
CREATE SCHEMA `sample_teacher_server` DEFAULT CHARACTER SET utf8mb4 ;
CREATE SCHEMA `sample_teacher_server_test` DEFAULT CHARACTER SET utf8mb4 ;
```

### Migrations

- Open your terminal to the root of this project
- Run the following command to perform migrations
  - `ENV=local yarn db:migrate`
  - `ENV=test yarn db:migrate`
  
### Seeding (Optional)

- If you plan to seed the database with your own data, you may ignore this step.
- Otherwise if you would like some pre-seeded data, you may run the following command

`ENV=local yarn db:seed`

# Running

- `yarn start`

## Changing Port

Port 4000: `PORT=4000 yarn start`

## Changing Environment

- local: `ENV=local yarn start`
- develop: `ENV=local yarn start`

# TypeORM

## Modifying an entity
- Modify the entity first
- Run `ENV=<env> yarn db:generate -n <NameOfMigration>`
- Run `ENV=<env> yarn db:migrate`

# Tests

`yarn test`

OR

`yarn test_coverage`

# Postman

Postman files are located under: `docs/postman`

# Roadmap

Due to time constraints and limited knowledge (this is my first time using Koa & TypeORM), the following features have not been implemented:

~~- Parameter Validation~~
- Tests running in CI
  - It requires a DB to be setup with it
- Tests running in full transaction mode
  - Unfortunately some queries don't seem to run in transaction mode
  - More time needs to be spent to investigate it
  - This is needed otherwise there might be DB pollution / test conflicts
- Endpoints for creating students / teachers
  - This is so the app can be ran without the user having to modify the DB
- Proper distribution build instead of using `ts-node`
  - Unfortunately I'm having problems running .js files with typeORM.
- Env variables need to be encrypted at minimum if checked into source control
  - As there is no sensitive information now, there is no harm checking it in now
  - However this will not be done in an actual company environment due to the risk of someone messing up and committing the file by accident.
  - Ideally, the best case for handling environment variables would be through some service like Hashicorp Vault or AWS Keystore

