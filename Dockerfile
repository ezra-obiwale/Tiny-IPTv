# base
FROM node:16.3-alpine as base

RUN apk update && apk add zip unzip libzip-dev git

RUN apk add --no-cache python2

WORKDIR /app

# build
FROM base as build

COPY package* ./

RUN npm i

COPY . .

RUN npm android:build
