FROM node:22-slim

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "start:prod"]
