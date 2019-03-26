# This file is just meant to run tests
FROM library/node:10.15.1

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm ci

COPY ./ ./

# Run tests
RUN npm run format:dry && \
  npm run types && \
  npm run test:ci
