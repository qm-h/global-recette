FROM node:16.14.2

ARG WEBAPPDEVOPS_DIR=webapp-devops

# Docker image directories
ARG DOCKER_WEBAPPDEVOPS_DIR=home/$WEBAPPDEVOPS_DIR
WORKDIR /$DOCKER_WEBAPPDEVOPS_DIR

RUN mkdir /home/$WEBAPPDEVOPS_DIR/client
RUN mkdir /home/$WEBAPPDEVOPS_DIR/server

# SERVER INIT
COPY server/ /home/$WEBAPPDEVOPS_DIR/server
RUN npm ci --quiet --no-optional --no-audit --prefix server

# CLIENT INIT
COPY client/ /home/$WEBAPPDEVOPS_DIR/client
RUN npm ci --quiet --no-optional --no-audit --prefix client
# CLIENT CONFIG FILES

RUN npm run build

## SERVER BUILD
COPY server/build/ /home/$WEBAPPDEVOPS_DIR/server/

# build dependencies
COPY ./package.json ./package-lock.json /home/$WEBAPPDEVOPS_DIR/
RUN npm ci --quiet --no-optional --no-audit --prefix .

# run tests
RUN  npm run test --prefix .

# start express server
CMD [ "npm", "start" ]
