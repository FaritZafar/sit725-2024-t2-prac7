// models/contactModel.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://faritzafar0:vsItIuunyxa2NNPf@cluster0.4s6dgeh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let collection;

async function connectToDatabase() {
    try {
        await client.connect();
        collection = client.db('test').collection('contact');
        console.log('Database connected and collection selected.');
    } catch (ex) {
        console.error('Database connection failed:', ex);
        throw ex;
    }
}

async function getContacts() {
    return collection.find({}).toArray();
}

async function insertContact(contact) {
    return collection.insertOne(contact);
}

module.exports = {
    connectToDatabase,
    getContacts,
    insertContact,
};
