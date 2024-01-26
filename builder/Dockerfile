FROM node:21-bookworm

RUN npm install -g gulp-cli

COPY init.sh var/init.sh

USER node

WORKDIR /var/app

CMD /var/init.sh
