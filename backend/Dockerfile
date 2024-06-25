FROM ubuntu:latest

FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm install dotenv
RUN npm install mongoose
RUN npm install bcrypt
RUN npm install validator
RUN npm install jsonwebtoken
RUN npm install swagger-jsdoc swagger-ui-express

COPY . .

ENV PORT=4000
ENV SECRET=webaufbau

EXPOSE 4000

CMD [ "npm", "start" ]