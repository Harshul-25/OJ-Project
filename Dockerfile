FROM node:21-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache python3 py3-pip
RUN apk add build-base
RUN cd client && npm i
WORKDIR /app
RUN cd server && npm i
WORKDIR /app
CMD ./script.sh