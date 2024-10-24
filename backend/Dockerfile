FROM node:20-alpine
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm i 
COPY src src
COPY public public
COPY src/entities src/entities
# COPY codegen.ts .
COPY tsconfig.json .
RUN npm run build
CMD npm run start