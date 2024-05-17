FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm i 

COPY src src
COPY public public
# COPY codegen.ts .

COPY next.config.mjs .
COPY tsconfig.json .

COPY tailwind.config.js .
COPY postcss.config.js .

CMD npm run dev