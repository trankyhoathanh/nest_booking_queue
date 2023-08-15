FROM node:18-alpine

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .

RUN npx prisma generate --schema=./src/prisma/schema.prisma

RUN yarn build

CMD ["yarn","start:prod"]