# Project Name

> Rebuild of opentable website

## Related Projects

- https://github.com/hrla28-open-table-app/navbar
- https://github.com/hrla28-open-table-app/description
- https://github.com/hrla28-open-table-app/reservation

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> npm install
> npm run seed
> npm run mongo
> npm run build
> npm start

\i '/Users/adamreback/Documents/Hack/SDC/reviews/database/setup.sql'
CREATE INDEX restid on reviews USING hash (restaurantID);

db.reviews.ensureIndex({'restaurantID':'hashed'})

## Requirements

- Node 6.13.0
- etc

## Development
