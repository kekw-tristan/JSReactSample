FROM ubuntu:latest

FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm install dotenv
RUN npm install mongoose

COPY . .

ENV PORT=4000
ENV MONGO_URI=mongodb+srv://lara:test1234@wa.iygjssy.mongodb.net/?retryWrites=true&w=majority&appName=wa

EXPOSE 4000

CMD [ "npm", "start" ]
