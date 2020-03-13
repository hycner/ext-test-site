# This file is just meant to run tests
FROM library/node:10.15.1

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm ci

COPY ./ ./

# Run tests
RUN npm run format:ci && \
  npm run types:ci && \
  npm run test:ci
