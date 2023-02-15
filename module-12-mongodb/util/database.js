const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db; // you can give any name but '_' usually states that the variable will be used internally

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://node-learning-app:SidB2023@nodelearningnosql.81hjxqp.mongodb.net/shop?retryWrites=true&w=majority').then((client) => {
        console.log("Connected!");
        _db = client.db();
        callback();
    }).catch((err) => {
        console.log(err);
        throw err;
    });
};

// giving access of database to other modules
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;