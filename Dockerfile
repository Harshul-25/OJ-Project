FROM node:21-alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache python3 py3-pip
RUN apk add build-base
# RUN cd client && npm run build
# RUN cp ./build/. -r ../server/views
RUN cd server && npm i
CMD ["npm","run","dev"]