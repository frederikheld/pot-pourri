# Two-staged Dockerfile intended for productive use.
# In the first step it builds the app in a NodeJS
# environment, in the second stage it serves the
# app with nginx.

# build stage
FROM node:14-alpine3.12 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# production stage
FROM nginx:1.19-alpine as production-stage

# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
VOLUME /etc/nginx

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]