let express = require('express');
let router = express.Router();
const {
    MongoClient
} = require('mongodb');
const config = require('../setup/config.json')
// Connection URL
const url =`mongodb+srv://${config.mongoInfo['username']}:${config.mongoInfo['password']}@nodejsmongodb.1sq3z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

//Get all the parentData
router.get('/parentDetails', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db('school_Info');
        const collection = db.collection('parentDetails');
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
        res.send({
            "status":"Success",
            "response":findResult
        })   
    } catch (error) {
        console.log('Error in getting the doc==>',error);
        res.send({'status':'Failure in getting the docs'})
    } finally {
        client.close();
    }
});
//Get the particular parentData
router.get('/parentDetails/:id', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        let id = req.params.id;
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('parentDetails');
        const findResult = await collection.find({'parentId':Number(id)}).toArray();
        console.log('Found documents =>', findResult);
        res.send({
            "status":"Success",
            "response":findResult
        })   
    } catch (error) {
        console.log('Error in getting the doc ==>',error);
        res.send({'status':'Failure in getting the doc'})
    } finally {
        client.close();
    }
});
// Insert new record in parent collection
router.post('/parentDetails/insert', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db('school_Info');
        const collection = db.collection('parentDetails');
        const insertResult = await collection.insertMany(req.body);
        res.send({
            "status":"Success",
            "response":insertResult
        })   
    } catch (error) {
        console.log('Error in inserting the doc==>',error);
        res.send({'status':'Failure in inserting the doc'})
    } finally {
        client.close();
    }
});

// Update a record in parent collection
router.put('/parentDetails/:parentId/:parentName', async (req, res) => {
    try {
        let id = req.params.parentId;
        let parentName = req.params.parentName;
        await client.connect();
        console.log('Connected successfully to server');
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('parentDetails');
        const updatedResult = await collection.updateOne({'parentId':Number(id)},{$set:{'parentName':parentName,'emailid':`${parentName.replace(' ','')}@gmail.com`}});
        console.log('updated documents =>', updatedResult);
        res.send({
            "status":"Success",
            "response":updatedResult
        })
    } catch (error) {
        console.log('Error in updating the doc==>',error);
        res.send({'status':'Failure in updating the doc'})
    } finally {
        client.close();
    }
});

// Delete  records in parent collection
router.delete('/parentDetails/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await client.connect();
        console.log('Connected successfully to server');
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('parentDetails');
        const deleteResult = await collection.deleteMany({"parentId":Number(id)});
        console.log('deleted documents =>', deleteResult);
        res.send({
            "status":"Success",
            "response":deleteResult
        })
    } catch (error) {
        console.log('Error in deleting the doc==>',error);
        res.send({'status':'Failure in deleting the doc'})
    } finally {
        client.close()
    }
})


module.exports = router;