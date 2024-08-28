FROM node:20-buster

WORKDIR /app
ADD . /app

ENV NODE_ENV=development

RUN npm install

CMD ["npm", "run", "wdio:run:chrome:headless"]