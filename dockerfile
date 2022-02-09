FROM node:12.22.1-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm","run","dev" ]