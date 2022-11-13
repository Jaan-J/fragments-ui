FROM node:16.18.1-alpine as builder

# Parcel build needs a few things to work on alpine
RUN apk add --update --no-cache g++ make python3 && ln -sf python3 /usr/bin/python

WORKDIR /app
COPY . .
RUN npm install --no-install-recommends
RUN npm run build 
RUN npm cache clean --force


FROM nginx:1.23.2-alpine
LABEL maintainer="Jaan Javed <jjaved3@myseneca.ca>"
LABEL description="Fragments microservice front-end"
WORKDIR /usr/share/nginx/html/
COPY --from=builder /app/dist/ .