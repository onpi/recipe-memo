# 最新のLTS版Node.jsイメージを使用
FROM node:lts-alpine

WORKDIR /app
COPY app/ ./
RUN apk update

CMD ["npm", "run", "start"]
