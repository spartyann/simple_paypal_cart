#!/bin/bash

source ../vars.sh

onError()
{
	exit 1;
}
trap 'onError' ERR

cd images

DIR=$(ls | egrep 'spc*')

for d in $DIR; do 
	cd $d

	echo ""
	echo "*******************************************"
	echo "> $d"
	echo "*******************************************"
	echo ""
	
	sudo docker build -t $d:dev -f "$PWD/Dockerfile" "$PWD"

	cd ..
done

cd ..
