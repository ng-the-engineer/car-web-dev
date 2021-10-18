FROM node

WORKDIR /app

COPY package.json .

RUN yarn

COPY src/ src/

EXPOSE 8088

CMD ["yarn", "run", "dev"]