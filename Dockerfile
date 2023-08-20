# 最新のLTS版Node.jsイメージを使用
FROM node:lts-alpine

WORKDIR /app

# パッケージの依存関係をコピー
COPY app/package*.json ./
COPY app/tsconfig*.json ./
COPY app/vite.config.ts ./

COPY app/tailwind.config.js ./
COPY app/postcss.config.js ./

# アプリケーションの依存関係をインストール
RUN npm install

# アプリケーションのソースをコピー
COPY app/ ./

CMD ["npm", "run", "dev"]
