const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then(( client) => {

    

    console.log('connected correctly to server');

    const db = client.db(dbname);

    dboper.insertDocument(db,{name:"Test-db",description:"test"},'dishes')
    .then((result) =>{        
        console.log('Insert document:\n',result.ops);
        return dboper.findDocument(db,'dishes')
    })
    .then((docs) =>{
        console.log('Found documents:\n',docs);
        return dboper.updateDocument(db,{name:'Test-db'},{description:'Updated test'},'dishes')
    })
    .then((result) =>{
        console.log('Updated document:\n',result.result);
        return dboper.findDocument(db, 'dishes')
    })
    .then((docs)=>{
        console.log('Found documents:\n', docs);
        return db.dropCollection('dishes')
    })
    .then((result) =>{
        console.log('Dropped Collection: ',result);
        return client.close();
    })
    .catch((err) =>console.log(err));                
})
.catch((err) => console.log(err));