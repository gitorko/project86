# Project86


Clarity server driven data grid

## Prerequisite - Start the HSQL DB server

1. Download HSQLDB bundle <http://hsqldb.org/> (<https://sourceforge.net/projects/hsqldb/files/hsqldb/hsqldb_2_6/hsqldb-2.6.0.zip/download>)
2. Run the command below to create the db.
   java -cp lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:data/mydb --dbname.0 mydb
3. To connect to the DB via UI
   java -cp lib/hsqldb.jar org.hsqldb.util.DatabaseManagerSwing
   jdbc:hsqldb:hsql://localhost:9001/mydb
   user: SA
   pwd:


npm install

ng build

ng serve --proxy-config proxy.config.json --open

## Advanced Topics

@Input - Parent to child communication.
@Output - Child to parent communication. EventEmitter.
Pipes - Custom Pipe
HTTP error handling
Route parameters - ActivatedRoute.
Nested routes - children, router-outlet.
Named router outlet.
