### STAGE 1: Build ###

FROM node:12.2.0-alpine as build-stage

RUN apk --no-cache add curl g++ gcc libgcc libstdc++ linux-headers make python bash git openssh autoconf \
    automake

WORKDIR /app
COPY package*.json ./
RUN yarn install
# Set environment variables
ENV VUE_APP_BASE_URL=https://api.iyarinmuaythai.com

COPY . .
RUN yarn build

### STAGE 2: NGINX ###
FROM nginx:1.13.12-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
