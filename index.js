const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url ,(err, client) => {

    assert.equal(err,null);

    console.log('connected correctly to server');

    const db = client.db(dbname);

    dboper.insertDocument(db,{name:"Test-db",description:"test"},'dishes',(result) =>{
        
        console.log('Insert document:\n',result.ops);

        dboper.findDocument(db,'dishes',(docs) =>{
            console.log('Found documents:\n',docs);

            dboper.updateDocument(db,{name:'Test-db'},{description:'Updated test'},'dishes',(result) =>{
                console.log('Updated document:\n',result.result);

                dboper.findDocument(db, 'dishes',(docs)=>{
                    console.log('Found documents:\n', docs);

                     db.dropCollection('dishes',(result) =>{
                        console.log('Dropped Collection: ',result);

                        client.close();
                     });

                });
            });
        });

    });
});