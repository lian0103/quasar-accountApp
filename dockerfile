FROM node:12.22.1-alpine

WORKDIR /app

COPY package.json .

#for hot reload setting
COPY quasar.conf.js . 

RUN npm install

EXPOSE 8080

CMD [ "npm","run","dev" ]