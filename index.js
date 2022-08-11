const {
    MongoClient
} = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
    'mongodb+srv://surya:suryam123@nodejsmongodb.1sq3z.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url);

// Database Name
const dbName = 'sample_airbnb';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('listingsAndReviews');
    const findResult = await collection.find({
        _id: "10006546"
    }).toArray();
    console.log('Found documents =>', findResult);
    // the following code examples can be pasted here...

    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());