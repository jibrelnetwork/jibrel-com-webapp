FROM node:10 AS build

RUN mkdir /app
WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
COPY lerna.json package*.json ./
COPY packages/ui/package*.json ./packages/ui/
COPY apps/id/package*.json ./apps/id/
COPY apps/investor/package*.json ./apps/investor/
COPY apps/company/package*.json ./apps/company/
RUN npm ci --quiet --no-progress && npx lerna bootstrap && npm cache clean --force

COPY . .
RUN npm run build:clean

FROM nginx:alpine

ENV NODE_ENV ${NODE_ENV:-production}

RUN wget -q https://github.com/jibrelnetwork/dockerize/releases/latest/download/dockerize-alpine-linux-amd64-latest.tar.gz \
 && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-latest.tar.gz \
 && rm dockerize-alpine-linux-amd64-latest.tar.gz

COPY docker/nginx.tpl.conf /etc/nginx/nginx.tpl.conf
COPY docker/run.sh /bin/run.sh

COPY --from=build /app/build/. /app/
COPY version.txt /app/

CMD ["run.sh", "start"]
