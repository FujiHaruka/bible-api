FROM mysql:5.7
ADD ./sql/*.sql.tar.gz /docker-entrypoint-initdb.d
CMD ["mysqld"]
