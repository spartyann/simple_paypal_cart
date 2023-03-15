FROM php:8.1.1-apache

#USER root

RUN apt-get update
RUN apt-get install sudo
RUN apt-get install -y zip
# for dig command
RUN apt-get install -y dnsutils

RUN apt-get install -y aptitude iproute2 apt-transport-https ca-certificates curl software-properties-common
RUN apt-get install -y --no-install-recommends cron supervisor nano mariadb-client

RUN apt-get install -y --no-install-recommends \
		libbz2-dev \
		libjpeg-dev \
		libpng-dev \
		libpq-dev \
		zlib1g-dev \
    	libzip-dev

RUN docker-php-ext-install \
		bz2 \
		gd \
		mysqli \
		pdo_mysql \
		zip


# Enable Apache Rewrite Module
RUN a2enmod rewrite
RUN yes | pecl install xdebug
RUN docker-php-ext-enable xdebug
#RUN yes | pecl install parle-0.8.2

#RUN docker-php-ext-enable parle

COPY 000-default.conf /etc/apache2/sites-enabled

RUN mkdir /var/log/php

ADD entrypoint /entrypoint

ENV PORT 80

ENTRYPOINT ["/entrypoint/entrypoint.sh"]
CMD ["apache2-foreground"]
