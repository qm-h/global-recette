FROM node:16.14.2

ARG WEBAPPDEVOPS_DIR=webapp-devops

# Docker image directories
ARG DOCKER_WEBAPPDEVOPS_DIR=home/$WEBAPPDEVOPS_DIR
WORKDIR /$DOCKER_WEBAPPDEVOPS_DIR

RUN mkdir /home/$WEBAPPDEVOPS_DIR/client
RUN mkdir /home/$WEBAPPDEVOPS_DIR/server

# SERVER INIT
COPY server/package.json server/package-lock.json /home/$WEBAPPDEVOPS_DIR/server/
RUN npm ci --quiet --no-optional --no-audit --prefix server

## SERVER CONFIG FILES
COPY server/tsconfig.json /home/$WEBAPPDEVOPS_DIR/server/
## SERVER FILES
COPY server/shared/ /home/$WEBAPPDEVOPS_DIR/server/shared
COPY server/routes/ /home/$WEBAPPDEVOPS_DIR/server/routes
COPY server/config/ /home/$WEBAPPDEVOPS_DIR/server/config

## CLIENT INIT
COPY client/package.json client/package-lock.json /home/$WEBAPPDEVOPS_DIR/client/
RUN npm ci --quiet --no-optional --no-audit --prefix client
## CLIENT CONFIG FILES
COPY client/tsconfig.json /home/$WEBAPPDEVOPS_DIR/client
## CLIENT FILES
COPY client/public /home/$WEBAPPDEVOPS_DIR/client/public
COPY client/src/api /home/$WEBAPPDEVOPS_DIR/client/src/api
COPY client/src/pages /home/$WEBAPPDEVOPS_DIR/client/src/pages

# build dependencies
COPY ./package.json ./package-lock.json /home/$WEBAPPDEVOPS_DIR/
RUN npm ci --quiet --no-optional --no-audit --prefix .

# run tests
RUN  npm run test --prefix .

# start express server
CMD [ "npm", "start" ]
