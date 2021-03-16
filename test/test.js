const {MongoMemoryServer} = require("mongodb-memory-server");

const mongod = new MongoMemoryServer();

const fn = async () => {
  const uri = await mongod.getConnectionString();
  const port = await mongod.getPort();
  const dbPath = await mongod.getDbPath();
  const dbName = await mongod.getDbName();

  console.log(uri);
  console.log(port);
  console.log(uri);
  console.log(dbName);
  console.log(dbPath);
  await mongod.stop();
};

fn();

// some code
//   ... where you may use `uri` for as a connection string for mongodb or mongoose

// you may check instance status, after you got `uri` it must be `true`
mongod.getInstanceInfo(); // return Object with instance data

// you may stop mongod manually
// await mongod.stop();

// when mongod killed, it's running status should be `false`
mongod.getInstanceInfo();
