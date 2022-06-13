FROM node:16.14.2

ARG WEBAPPDEVOPS_DIR=webapp-devops

# DOCKER IMAGE DIRECTORIES
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

# GLOBAL INIT
COPY ./package.json ./package-lock.json /home/$WEBAPPDEVOPS_DIR/
COPY ./jest.config.js /home/$WEBAPPDEVOPS_DIR/
RUN npm ci --quiet --no-optional --no-audit --prefix .

# RUN TESTS
RUN  npm run test --prefix .

# RUN BUILD CLIENT AND SERVER 
RUN npm run build

ENV NODE_ENV=prod
# start express server
CMD [ "npm", "run", "server"]
