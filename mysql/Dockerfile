FROM mysql:5.7
ENV MYSQL_DATABASE=bible_db
ENV MYSQL_ROOT_PASSWORD=root
VOLUME ./tmp/:/docker-entrypoint-initdb.d
CMD ["/usr/bin/mysqld_safe"]
