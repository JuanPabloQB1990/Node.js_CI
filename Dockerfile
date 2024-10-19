FROM node:20

WORKDIR /home/app

COPY package.json /home/app

RUN npm install

COPY . .

EXPOSE 2000

CMD npm start