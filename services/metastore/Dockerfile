FROM  node:14-alpine3.12

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

VOLUME /app/store

EXPOSE 3003

CMD ["npm", "start"]
