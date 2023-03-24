FROM node:18.12.1-alpine as build-step

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stage 2
FROM nginx:1.19.6-alpine

COPY --from=build-step /app/dist/heroesApp /usr/share/nginx/html