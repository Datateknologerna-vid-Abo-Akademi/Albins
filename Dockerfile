FROM node:20-alpine as builder
# Get the necessary build tools
RUN apk update && apk add build-base autoconf automake libtool pkgconfig nasm

# Add the package.json file and build the node_modules folder
WORKDIR /app
COPY . .
ARG ACCESS_TOKEN
ENV ACCESS_TOKEN=${ACCESS_TOKEN}
RUN npm install
RUN npm run build

# Build an nginx image
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/public .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
