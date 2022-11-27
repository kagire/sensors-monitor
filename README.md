## Sensors monitor  
### Description to this app  

This branch represents NgRx version of app. Also, datasource settings are accessible now.

- **Frontend**: Angular v14.2.6, Bootstrap v5  
- **Rest API**: Spring Boot v2.7; modules: Spring Security, Spring Data + Hibernate  
- **Database**: PostgreSQL v14.2  

Predefined users:
- `admin`/`admin` (can edit table)
- `user`/`user`

### Run instructions  

#### Setup database  

Scripts:  

- [dump.sql](docs/files/dump.sql) - dump file for psql tool or similar
- [init-db.sql](docs/files/init-db.sql) - common script for PgAdmin or plain query tool

#### Set java app running  

1) Edit `application.properties` file. Set your database url/password/username.  
2) Run `SensorsMonitorApplication` main class.  

#### Set angular app running  

1) Open terminal at frontend directory.  
2) Run `npm install` to install dependencies.  
3) Run `ng serve` to start application.  

Then access app at [localhost:4200](http://localhost:4200)





