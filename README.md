
## Description

[Nest](https://github.com/nestjs/nest) project to create endpoints for example shipment processing

edit the docker-compose.yml file to set database password

create .env file in the root directory with database connection parameters for example 

NODE_ENV=development
DATABASE_USER=postgres
DATABASE_PASSWORD=<match pw in docker-compose.yml>
DATABASE_NAME=postgres
DATABASE_PORT=5432
DATABASE_HOST=localhost

currently project is configured to automatically create database tables for sql entities     
  autoLoadEntities: true,
  synchronize: true //TURN THIS OFF IN PRODUCTION

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Alan Jolly]

## License

Nest is [MIT licensed](LICENSE).
