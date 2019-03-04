# Workast Challenge

### Project information

Create a RESTful API that would allow an application to manage users and articles.

### Author

- [Federico Cano](https://www.linkedin.com/in/canofm) <canofedericomartin@gmail.com>

### Pre-requisites

Before running this application, you should need the following programs installed:

- [NodeJS](https://nodejs.org/) (v8.10 or higher)
- [MongoDB](https://www.mongodb.com/)

Also, as optional I would recommend to install [yarn](https://yarnpkg.com/en/) (dependency manager) but you could use `npm` as well, which is installed with `nodejs`.

### How to run?

1. Install dependencies by running the following command in your trusted command-line:bash

```bash
yarn
```

or

```bash
npm install
```

2. To start the server: <br />
   **Before starting the server**, you probably would like to set some env variables such as `SECRET_KEY` or `PORT`.<br />
   Due to this API only has one authentication method, you must define the `SECRET_KEY` in order to communicate with the application.<br />
   By default if `SECRET_KEY` is not defined, then the key is _"aToken"_, please set up a `SECRET_KEY` as env variable.<br />
   In order to set env variables, you should create an `.env` file at root of the project. Take as as example `.sample.env`.

```bash
yarn start
```

or

```bash
npm run start
```

### Where is the documentation?

After starting the server you could access to the documentation by hitting:
http://localhost:3000/api/v0/api-docs/

This endpoint does not need authentication. <br />
_Note: 3000 is the port where the application is running but this could be change by env variable (`process.env.PORT`)._

### How to run tests?

After completing step #1:

```bash
yarn test
```

or

```bash
npm run test
```

##### Coverage

```bash
yarn test:coverage
```

or

```bash
npm run test:coverage
```

After running this command, you could see the coverage HTML generated in the folder "coverage" at root level of the project.
