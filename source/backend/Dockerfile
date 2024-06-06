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

COPY . .

ENV PORT=4000
ENV MONGO_URI=mongodb+srv://lara:test1234@wa.iygjssy.mongodb.net/?retryWrites=true&w=majority&appName=wa
ENV SECRET=webaufbau

EXPOSE 4000

CMD [ "npm", "start" ]