FROM ubuntu:latest

FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=10014

EXPOSE 10014

CMD [ "npm", "start" ]