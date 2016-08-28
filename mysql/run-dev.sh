#!/bin/sh

cd `dirname $0`/..

docker run \
-v $PWD/tmp/sql/:/docker-entrypoint-initdb.d/ \
-d --name bible-db \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=bible \
-p 3306:3306 \
mysql
