FROM node:12.2.0-alpine

RUN apk --no-cache add curl g++ gcc libgcc libstdc++ linux-headers make python bash git openssh autoconf \
    automake

WORKDIR /app

COPY package*.json ./

RUN yarn install

# Set environment variables
ENV VUE_APP_BASE_URL=https://api.iyarinmuaythai.com

COPY . .

RUN yarn build

EXPOSE 8001

CMD yarn start
