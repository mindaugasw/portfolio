FROM node:21-bookworm

RUN npm install -g gulp-cli

USER node

WORKDIR /home/node/app

# tail needed to keep container running
CMD npm install && gulp build && tail -f /dev/null
