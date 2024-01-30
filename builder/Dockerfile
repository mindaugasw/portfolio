FROM node:21-bookworm

RUN npm install -g gulp-cli

COPY init.sh /home/node/init.sh

USER node

WORKDIR /home/node/app

CMD /home/node/init.sh
