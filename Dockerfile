FROM node:14-alpine as base
LABEL description="Dockerized Fastify"
LABEL maintainer="Hugo Sum<hugosum.dev@protonmail.com>"
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN apk add dumb-init && npm install pnpm -g
EXPOSE 8080

FROM base as production
ENV NODE_ENV=production
RUN pnpm install --prod --frozen-lockfile
# Make files belongs to node, a least-privilaged user provided by node image.
COPY --chown=node:node . .
USER node
CMD dumb-init pnpm run start

FROM base as development
ENV NODE_ENV=development
RUN pnpm install --frozen-lockfile
COPY --chown=node:node . .
USER node
CMD dumb-init pnpm run dev
