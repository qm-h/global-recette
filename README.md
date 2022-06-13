# Welcom to the WEBAPP-DEVOPS 🙈 🙉 🙊

## Authors 👨🏼‍💻

`Quentin Moreau`, `Zaki Mazog`, `Wilhelm Dassie`, `Nicolas Cammareri`

## Available Scripts 📟

In the project directory, you can run:

#

# ❗️ BEFORE ALL ❗️

## Don't forget the npm install

### `npm run install:all`

For install dependencies for all directories ! And ENJOY 🌈

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The server will proxy from the client
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://jestjs.io/fr/) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
The `npm run build` will build the server and the client, it will then copy the client into the server build which will then render it.

### `npm run pq`

Run a prettier command to prettify the code

## Road to Pipeline 🚀

### `The project pipelines`

You just have to go to [GitLab Pipelines](https://gitlab.com/qm-h/webapp-devops/-/pipelines) to access the project pipelines

#

# 🐳 & 🦊

## Docker

Two `Dockerfiles` are set up, the first one is used to build the application, so it will create a directory on the image, create several folders.

It will also install the dependencies of each folder, so client, server and global.

It will also launch the tests and build the application that will be rendered by the server. When launching the docker container, the command `npm run server` will be called to launch the express server

The second one will create the `docker image of the database `based on the sql file of the database

## Gitlab CI

The `gitlab` file will make `two stages`, a build which will build the docker image of the `application` and the `database`, and then push them.

And the deploy stage which will create a `network` so that the `two containers` can talk and then it will pull the images created before and run them in containers.

#

# Database 💾

Login : `root`

PSW : `admin`

File : `id18905711_restomiam.sql`

Database : `id18905711_restomiam`

Mysql Container : `mysql_db`
