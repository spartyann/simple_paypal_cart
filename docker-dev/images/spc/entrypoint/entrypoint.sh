#!/bin/bash
set -e

if [ "bash" = "$@" ]; then
	bash
	exit 0
fi

mkdir -p /jobs

export > /jobs/env.sh
chmod a+x /jobs/*.sh

# ***** DEBUG

# ***** DEBUG

if [ $DEBUG = "true" ]; then
	XDEBUG_LOG_FILE="/var/log/php/xdebug.log"
	echo "" > "$XDEBUG_LOG_FILE"
	chmod 777 "$XDEBUG_LOG_FILE"

	#XDEBUG_CLIENT_IP=$(route | awk '/^default/ { print $2 }')

	echo "zend_extension=$(find /usr/local/lib/php/extensions/ -name xdebug.so)" > /usr/local/etc/php/conf.d/xdebug.ini
	echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/xdebug.ini
	echo "xdebug.client_host=$XDEBUG_CLIENT_IP" >> /usr/local/etc/php/conf.d/xdebug.ini
	echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/xdebug.ini
	echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/xdebug.ini
	echo "xdebug.log=$XDEBUG_LOG_FILE" >> /usr/local/etc/php/conf.d/xdebug.ini
	echo "xdebug.log_level=3" >> /usr/local/etc/php/conf.d/xdebug.ini
	#echo "xdebug.discover_client_host=on" >> /usr/local/etc/php/conf.d/xdebug.ini
	#echo "xdebug.remote_handler=dbgp" >> /usr/local/etc/php/conf.d/xdebug.ini

fi

# **** INITILIZE DB

if [[ ! -z "`mysql -h "$DB_HOST" --port="$DB_PORT" -u "$DB_USERNAME" --password="$DB_PASSWORD" -qfsBe "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='$DB_DATABASE'" 2>&1`" ]];
then
  echo "DATABASE ALREADY EXISTS :)"
else
  echo "DATABASE DOES NOT EXIST. Creating...."

	mysql -h "$DB_HOST" --port="$DB_PORT" -u "$DB_USERNAME" --password="$DB_PASSWORD" -e "CREATE DATABASE $DB_DATABASE"
fi


# Apply PORT
sed -i "s/80/$PORT/g" /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

echo "Start apache"

# exec Apache or other command
exec "$@"
