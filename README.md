# nest-rest

RESTful API developed in NestJS

nvm use
npm init
npm install yarn
npx yarn
npx yarn add reflect-metadata @nestjs/common @nestjs/core @nestjs/platform-express
npx yarn add -D typescript @types/node @nestjs/cli

mkdir src

## Create the TypeScript configuration file with good defaults

cat <<EOF > tsconfig.json
{
"compilerOptions": {
"module": "commonjs",
"declaration": true,
"removeComments": true,
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
"allowSyntheticDefaultImports": true,
"target": "ES2021",
"sourceMap": true,
"outDir": "./dist",
"rootDir": "./",
"baseUrl": "./",
"skipLibCheck": true,
"incremental": true
}
}
EOF

## Create the TypeScript config file

## that will be used when building the project with NestJS's CLI

cat <<EOF > tsconfig.build.json
{
"extends": "./tsconfig.json",
"exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}
EOF

cat <<EOF > nest-cli.json
{
"\$schema": "https://json.schemastore.org/nest-cli",
"collection": "@nestjs/schematics",
"monorepo": false,
"sourceRoot": "src",
"entryFile": "main",
"language": "ts",
"generateOptions": {
"spec": false
},
"compilerOptions": {
"tsConfigPath": "./tsconfig.build.json",
"webpack": false,
"deleteOutDir": true,
"assets": [],
"watchAssets": false,
"plugins": []
}
}
EOF

npx nest generate module app --flat

## Create a minimal application entrypoint under src/main.ts file

cat <<EOF > src/main.ts
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
const app = await NestFactory.create<NestExpressApplication>(AppModule);
await app.listen(process.env.PORT || 3000);
}
bootstrap();
EOF

## For development

npm run start:dev

## Setup for production

npm run build
rm -rf node_modules

## Install production-only dependencies without changing the lock file

npm ci --omit=dev

## Start the app using it's 'main' entry

node .
