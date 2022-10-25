## Sensors monitor  
### Description to this app  

- **Frontend**: Angular v14.2.6, Bootstrap v5  
- **Rest API**: Spring Boot v2.7; modules: Spring Security, Spring Data + Hibernate  
- **Database**: PostgreSQL v14.2  

This repository presents source code, but quick launch instructions shown below.

### Run instructions  

#### Setup database  

Scripts:  

- [dump.sql](docs/files/dump.sql) - dump file for psql tool or similar
- [init-db.sql](docs/files/init-db.sql) - common script for PgAdmin or plain query tool

#### Set java app running  

1) Download this [java executable](docs/files/sensors-monitor.jar)  
2) Move to directory where you downloaded it
3) Execute in terminal `java -jar sensors-monitor.jar`

> To set up connection to database your user and password should be `postgres` and `1234`  
> Server port: `5432`

#### Set angular app running  

1) Download this [script directory](docs/files/angular-app)
2) Move to directory where you downloaded it (to the parent one of _angular-app_)
3) Execute in terminal:  
3.1)`npm install http-server -g`  
3.2)`http-server angular-app -p 4200`  

Then access app at [localhost:4200](http://localhost:4200)





