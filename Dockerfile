ARG NODE_IMAGE=node:14.18.1-alpine

# 基础构建环境
FROM ${NODE_IMAGE} as build-env
WORKDIR /var/opt/build

COPY . .
RUN npm install

# 编译
FROM build-env as compile
RUN npm run build

# 发布
FROM compile as release
RUN npm publish