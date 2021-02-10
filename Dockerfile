FROM node:12.16.3

WORKDIR /code

ENV PORT 5020

COPY package.json /code/package.json

RUN npm install -g pm2

RUN npm install

COPY . /code

CMD ["node", "src/index.js"]