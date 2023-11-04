# nest-rest

RESTful API developed in NestJS

nvm use
npm init
npm install yarn
npx yarn

## For development

npm run start:dev

### Run dockerized database

`sudo docker-compose -f docker-compose-db.yaml up -d`

## Setup for production

npm run build
rm -rf node_modules

## Install production-only dependencies without changing the lock file

npm ci --omit=dev

## Start the app using it's 'main' entry

node .
