#Create MySQL Image for JSP Tutorial Application
FROM mysql

ENV MYSQL_ROOT_PASSWORD admin
ADD id18905711_restomiam.sql /docker-entrypoint-initdb.d

EXPOSE 3306