ARG NODE_IMAGE=node:20.16.0-alpine

# 基础构建环境
FROM ${NODE_IMAGE} as build-env
WORKDIR /var/opt/build

ENV HTTPS_PROXY=socks5://172.24.64.31:1080

COPY . .
RUN npm install

# 编译
FROM build-env as compile
RUN npm run build

# 发布
FROM compile as release
ARG TOKEN

RUN echo //registry.npmjs.org/:_authToken=${TOKEN} >> ./.npmrc \
    && npm publish
