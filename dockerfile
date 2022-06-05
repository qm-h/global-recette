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
COPY server/src/shared/ /home/$WEBAPPDEVOPS_DIR/server/src/shared
COPY server/src/routes/ /home/$WEBAPPDEVOPS_DIR/server/src/routes
COPY server/src/config/ /home/$WEBAPPDEVOPS_DIR/server/src/config

## CLIENT INIT
COPY client/package.json client/package-lock.json /home/$WEBAPPDEVOPS_DIR/client/
RUN npm ci --quiet --no-optional --no-audit --prefix client
## CLIENT CONFIG FILES
COPY client/tsconfig.json /home/$WEBAPPDEVOPS_DIR/client
## CLIENT FILES
COPY client/public /home/$WEBAPPDEVOPS_DIR/client/public
COPY client/src/api /home/$WEBAPPDEVOPS_DIR/client/src/api
COPY client/src/pages /home/$WEBAPPDEVOPS_DIR/client/src/pages
COPY client/src/utils /home/$WEBAPPDEVOPS_DIR/client/src/utils

# build dependencies
COPY ./package.json ./package-lock.json /home/$WEBAPPDEVOPS_DIR/
RUN npm ci --quiet --no-optional --no-audit --prefix .

# copy in source code
COPY --chown=node:node ./ ./

# start express server
CMD [ "npm", "start" ]