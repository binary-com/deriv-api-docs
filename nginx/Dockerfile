FROM nginx
COPY ["nginx/nginx.conf", "nginx/req.conf", "/etc/nginx/"]
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -config /etc/nginx/req.conf