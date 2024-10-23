FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

RUN mkdir -p /app
WORKDIR /app

COPY ../package*.json ./
RUN npm install

COPY .. .
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "run", "start:prod"]
