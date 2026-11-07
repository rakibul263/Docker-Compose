FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --chown=node:node src ./src

COPY --chown=node:node data ./data

ENV NODE_ENV=production

USER node

EXPOSE 5000

CMD ["node", "src/server.js"]