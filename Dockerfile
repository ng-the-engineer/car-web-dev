FROM node

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 8088

CMD ["yarn", "run", "dev"]