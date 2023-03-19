FROM nginx:1.20.1

COPY conf.d/ /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

COPY ./build .

EXPOSE 80

CMD  ["sh", "-c", "nginx -g \"daemon off;\""]
