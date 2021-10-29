# Project86

Angular Clarity - Server Driven Data Grid with QueryDSL

## HSQL DB

1. Download HSQLDB bundle <http://hsqldb.org/> (<https://sourceforge.net/projects/hsqldb/files/hsqldb/hsqldb_2_6/hsqldb-2.6.0.zip/download>)
2. Run the command below to create the db.
   java -cp lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:data/mydb --dbname.0 mydb
3. To connect to the DB via UI
   java -cp lib/hsqldb.jar org.hsqldb.util.DatabaseManagerSwing
   jdbc:hsqldb:hsql://localhost:9001/mydb
   user: SA
   pwd:

### Dev

To Run UI in DEV mode

```bash
cd project86/ui
npm install
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
