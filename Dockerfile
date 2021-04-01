FROM node:14-alpine as base

LABEL description="Dockerized Fastify"
LABEL maintainer="Hugo Sum<hugosum.dev@protonmail.com>"

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8080
