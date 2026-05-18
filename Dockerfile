FROM node:20

WORKDIR /app

COPY . .

WORKDIR /app/backend

RUN npm install

EXPOSE 3000

CMD ["npm","start"]