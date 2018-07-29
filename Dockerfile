FROM node:8.11.1-wheezy
RUN mkdir /app/
COPY package.json /app/
COPY package-lock.json /app/

RUN mkdir /log/
WORKDIR /app/
RUN npm install --quiet

RUN mkdir /app/webpack
COPY webpack/common.config.js /app/webpack
COPY webpack/prod.config.js /app/webpack
COPY .babelrc /app/
COPY src /app/src
RUN npm run build

CMD [ "node", "."]
