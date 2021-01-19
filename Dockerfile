FROM node:lts-alpine as build

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build

FROM nginx as release

COPY --from=build /app/deploy/nginx/nginx.conf /etc/nginx/nginx.conf

## Remove default deploy website
SHELL ["/bin/bash", "-c", "rm -rf /usr/share/nginx/html/"]

COPY --from=build /app/build /var/www

VOLUME /var/www/files

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
