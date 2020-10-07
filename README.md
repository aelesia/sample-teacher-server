# Setup

- `yarn install`

# Running

- `yarn start`

## Changing Port

Port 4000: `PORT=4000 yarn start`

## Changing Environment

- local: `ENV=local yarn start`
- develop: `ENV=local yarn start`

# Database

## Modifying an entity
- Modify the entity first
- Run `ENV=<env> yarn db:generate -n <NameOfMigration>`
- Run `ENV=<env> yarn db:migrate`

## Seeding
- Run `ENV=<env> yarn db:seed`
