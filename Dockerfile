# FROM httpd:2.4
FROM debian

RUN apt-get update && apt-get install -y apache2

COPY ./etc/app.conf /etc/apache2/sites-available

RUN a2enmod rewrite
RUN a2dissite 000-default
RUN a2ensite app

RUN mkdir -p /var/www/app/dist
COPY ./* /var/www/app/

EXPOSE 80

CMD [ "apachectl", "-DFOREGROUND" ]
