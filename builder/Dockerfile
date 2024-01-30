FROM node:21-bookworm

RUN npm install -g gulp-cli

USER node

WORKDIR /home/node/app

CMD npm install && gulp build

# Needed to keep container running
# tail -f /dev/null
