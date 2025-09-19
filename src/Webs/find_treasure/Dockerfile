FROM node:lts-alpine as builder
WORKDIR /app
COPY src/Webs/find_treasure/package.json ./
COPY src/Webs/find_treasure/yarn.lock ./
RUN yarn install

COPY src/Webs/find_treasure ./
RUN yarn run build

FROM node:lts-alpine as runner
WORKDIR /app



COPY --from=builder /app/dist /usr/share/nginx/html

COPY src/Webs/find_treasure/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["yarn", "start"]