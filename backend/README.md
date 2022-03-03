## System dependencies
Developed in Ubuntu 20.04 with WSL1
- npm and nodejs 12.22.0 and later
- Postgresql

## Project Dependencies
### Backend

Navigate in the root directory and install dependencies with npm:
```sh
    npm install
```
Sometimes the nodemon package fails to install, if that happens run:
```sh
    npm install -g nodemon
```

## Deploying the system
- Start the postgres service and create a new role and a new DB:
```sh
    sudo -u postgres psql
    postgres=# create database weather;
    postgres=# create user weather with encrypted password 'weather';
    postgres=# grant all privileges on database weather to weather;
```
If you are using WSL then postgres will sometimes fail to start on system bootup. If that happens run:
```sh
    sudo service postgresql start
```
- Navigate to the root and run
```sh
    bash deploy.sh
```
- To populate the DB with the latest 7 day forecast visit:
 localhost:5050/forecast/update
- To get the average temperature for the last 3 forecasts visit:
 localhost:5050/forecast/average
- To get the latest Forecast for each location visit:
 localhost:5050/forecast/summary