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
- Run `yarn db:generate -n <NameOfMigration>`
- Run `yarn db:migrate`
