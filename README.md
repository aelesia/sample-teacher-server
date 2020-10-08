# Setup

## Install Dependencies

- `yarn install`

## Setup Database

### Pre-requisites

- You must have MySQL >=5.7 installed
- You must have a client capable of connecting to MySQL database and creating a new schema
- You must have the following information available:
  - Username
  - Password
  - Network Address
  - Port

### Creating Database

1) Start your MySQL database
2) Open your MySQL database in your preferred client
3) Run the following scripts:

```
CREATE SCHEMA `sample_teacher_server` DEFAULT CHARACTER SET utf8mb4 ;
CREATE SCHEMA `sample_teacher_server_test` DEFAULT CHARACTER SET utf8mb4 ;
```

### ormconfig.js`

1) Open the file located in `env/local/ormconfig.local.copy.js`
2) Replace the fields below with your own host, port, username, password
3) Save

```
host: 'localhost',
port: 3306,
username: 'root',
password: '',
```

### Migrations

- Open your terminal to the root of this project
- Run the following command to perform migrations
  - `ENV=local yarn db:migrate`
  
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

