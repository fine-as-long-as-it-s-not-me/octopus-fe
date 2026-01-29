# 빌드
FROM node:22-alpine AS build
WORKDIR /app

ARG VITE_WS_URL
ARG VITE_BASE_URL

ENV VITE_WS_URL=$VITE_WS_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

# 의존성
COPY package*.json ./
RUN npm install

# 전체 소스 복사 및 빌드
COPY . .
RUN npm run build

# 실행
FROM nginx:alpine

# Vite의 기본 빌드 결과물인 dist 폴더를 Nginx 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html

# SPA 라우팅을 위한 Nginx 설정
RUN rm /etc/nginx/conf.d/default.conf
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
