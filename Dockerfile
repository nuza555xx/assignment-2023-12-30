FROM node:20-alpine

WORKDIR /app

COPY ./dist .

COPY package.json ./

ENV PORT=80

EXPOSE ${PORT}

RUN npm install --omit=dev

CMD ["node" ,"./main.js"]
