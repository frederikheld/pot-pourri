FROM  node:14-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN mkdir store

EXPOSE 3003

CMD ["node", "server.js"]