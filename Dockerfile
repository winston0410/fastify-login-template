FROM node:14-alpine as base
LABEL description="Dockerized Fastify"
LABEL maintainer="Hugo Sum<hugosum.dev@protonmail.com>"
WORKDIR /app
COPY package*.json ./
RUN npm install pnpm -g
COPY . .
EXPOSE 8080

FROM base as production
ENV NODE_ENV=production
RUN pnpm install
COPY . .
CMD pnpm run start

FROM base as development
ENV NODE_ENV=development
RUN pnpm install
COPY . .
CMD pnpm run dev
