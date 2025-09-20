FROM node:lts-alpine as builder
WORKDIR /app
COPY src/Webs/find_treasure/package.json ./
COPY src/Webs/find_treasure/yarn.lock ./
RUN yarn install

COPY src/Webs/find_treasure ./
RUN yarn run build

FROM nginx:alpine as prod
EXPOSE 80
COPY src/Webs/find_treasure/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]