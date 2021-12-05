FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --no-optional --only=prod

COPY . .

EXPOSE 5000

CMD ['node', 'app.js']
