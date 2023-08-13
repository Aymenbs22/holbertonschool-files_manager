const { MongoClient } = require('mongodb');

class DBClient {
  constructor(
    host = process.env.DB_HOST || 'localhost',
    port = process.env.DB_PORT || '27017',
    database = process.env.DB_DATABASE || 'files_manager',
    url = `mongodb://${host}:${port}`,
  ) {
    MongoClient.connect(url, { native_parser: true }, (err, db) => {
      if (!err) {
        this.db = db.db(database);
      }
    });
  }

  isAlive() {
    if (this.database) return true;
    return false;
  }

  nbUsers() {
    return this.users.countDocuments({});
  }

  nbFiles() {
    return this.files.countDocuments({});
  }
}

module.exports = new DBClient();
