# 最新のLTS版Node.jsイメージを使用
FROM node:lts-alpine

WORKDIR /app

# パッケージの依存関係をコピー
COPY app/package*.json ./

# アプリケーションの依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY app/ ./

CMD ["npm", "run", "dev"]
