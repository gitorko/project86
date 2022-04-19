# Project86

Angular Clarity - Server Driven Data Grid with QueryDSL

## Setup

Check the version of java, node & yarn.

```bash
npm i -g yarn
$java -version
openjdk version "11.0.7" 2020-04-14 LTS
$node --version
v14.17.0
$npm --version
6.14.13
$yarn --version
1.22.17
$docker --version
Docker version 19.03.5, build 633a0ea
```

### Postgres DB

```
docker run -p 5432:5432 --name pg-container -e POSTGRES_PASSWORD=password -d postgres:9.6.10
docker ps
docker run -it --rm --link pg-container:postgres postgres psql -h postgres -U postgres
CREATE USER test WITH PASSWORD 'test@123';
CREATE DATABASE "test-db" WITH OWNER "test" ENCODING UTF8 TEMPLATE template0;
grant all PRIVILEGES ON DATABASE "test-db" to test;
```

### Dev

To Run UI in DEV mode

```bash
cd project86/ui
yarn install
yarn build
yarn start
```

To Run backend in DEV mode

```bash
cd project86
./gradlew bootRun
```

### Prod
To run as a single jar, both UI and backend are bundled to single uber jar.

```bash
./gradlew cleanBuild
cd project86/build/libs
java -jar project86-1.0.0.jar
```

```bash
docker build -f docker/Dockerfile --force-rm -t project86:1.0.0 .
docker images
docker tag project86:1.0.0 gitorko/project86:1.0.0
docker push gitorko/project86:1.0.0
docker-compose -f docker/docker-compose.yml up 
```
