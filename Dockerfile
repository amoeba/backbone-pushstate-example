# FROM httpd:2.4
FROM debian

RUN apt-get update && apt-get install -y apache2

COPY ./etc/apache2.conf /etc/apache2/apache2.conf

RUN a2enmod rewrite
RUN a2dissite 000-default

RUN mkdir -p /var/www/html/dist
COPY ./index.html /var/www/html/index.html
COPY ./dist/bundle.js /var/www/html/dist/bundle.js

EXPOSE 80

CMD [ "apachectl", "-DFOREGROUND" ]
