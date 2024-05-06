FROM node:lts

WORKDIR /app

RUN apt-get update \
    # dependencies for building Python packages
    && apt-get install -y build-essential \
    # cleaning up unused files
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

COPY package.json ./package.json /app/
COPY package-lock.json ./package-lock.json /app/

RUN npm i

EXPOSE 8080

COPY . .

CMD [ "nodemon", "server.ts" ]