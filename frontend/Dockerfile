FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:22-alpine AS deps
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn install --production

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]