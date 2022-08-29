# Project 86

Clarity - Server Driven Data Grid with QueryDSL

[https://gitorko.github.io/clarity-server-driven-datagrid/](https://gitorko.github.io/clarity-server-driven-datagrid/)

### Version

Check version

```bash
$java --version
openjdk 17.0.3 2022-04-19 LTS

node --version
v16.16.0

yarn --version
1.22.18
```

### Postgres DB

```
docker run -p 5432:5432 --name pg-container -e POSTGRES_PASSWORD=password -d postgres:9.6.10
docker ps
docker exec -it pg-container psql -U postgres -W postgres
CREATE USER test WITH PASSWORD 'test@123';
CREATE DATABASE "test-db" WITH OWNER "test" ENCODING UTF8 TEMPLATE template0;
grant all PRIVILEGES ON DATABASE "test-db" to test;

docker stop pg-container
docker start pg-container
```

### Dev

To Run backend in dev mode

```bash
cd project86
./gradlew bootRun
```

To Run UI in dev mode

```bash
cd ui
yarn install
yarn build
yarn start
```

Open [http://localhost:4200/](http://localhost:4200/)

### Prod

To run as a single jar, both UI and backend are bundled to single uber jar.

```bash
./gradlew cleanBuild
cd project86/build/libs
java -jar project86-1.0.0.jar
```

Open [http://localhost:8080/](http://localhost:8080/)

### Docker

```bash
./gradlew cleanBuild
docker build -f docker/Dockerfile --force-rm -t project86:1.0.0 .
docker images |grep project86
docker tag project86:1.0.0 gitorko/project86:1.0.0
docker push gitorko/project86:1.0.0
docker-compose -f docker/docker-compose.yml up 
```
