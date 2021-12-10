# user-profile-nodejs

A NodeJS user and profile microservice.

## Getting Started

### NOTE: You must have a local database installed on your laptop that is compatible with the NPM package Sequelize. If you're not using Postgres, then be sure to NPM install, in this repository's root directory, the Sequelize driver needed for your particular local database. Currently, this repository has the 'pg' driver installed, so you may need to NPM uninstall this package ('pg'), and NPM install the driver you'll be needing. For more details, see https://sequelize.org/master/manual/getting-started.html.

1. Clone this repository.
2. In the root of this repository, run NPM install.
3. Create an .env file for your environment variables.
  - DB_NAME: Set equal to the database name you wish to connect to.
  - DB_USER: Set equal to the database username you wish to connect as.
  - DB_PASSWORD: Set equal to the database password for the username you wish to connect as.
  - DB_DIALECT: Set equal to the database dialect that makes sense for your set up. I used 'postgres'.
4. Run the application w/ "npm run dev".

#### More directions after repository structure below.
#### Please become comfortable with the structure.

## Repository Structure

- database
  - index.js: Instantiates the db connection.
  - models/user.js: Instantiates a Sequelize model that interacts with the user table.
  - models/profile.js: Instantiates a Sequelize model that interacts with the profil table.
- server
  - index.js: Instantiates the server, plugs in the middleware, and sets up the routes.
  - api/userRouter.js: Express router that handles user management.
  - api/profileRouter.js: Express router that handles profile management.
  - dao/user.js: Class instantiated to interact with the user table.
  - dao/profile.js: Class instantiated to interact with the profile table.
  - lib/hashUtils.js: Exported functions that provide security for user information.

## How To Use The Microservice
- For now, please see my "hpp-proxy" repository on Github that interacts w/ this microservice.
  - "hpp-proxy" is a client/server social network application that serves ejs templates.
  - The ejs templates served depends on the route requested for, and session status.
