let express = require('express');
let router = express.Router();
const {
    MongoClient
} = require('mongodb');
const {
    MONGO_DB_URL
} = require('../setup/config.js')
// Connection URL
const client = new MongoClient(MONGO_DB_URL);

//Get all the classes Info
router.get('/classes', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('Classes');
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
        res.send({
            "status":"Success",
            "response":findResult
        })   
    } catch (error) {
        console.log('Error in getting the docs==>',error);
        res.send({'status':'Failure in getting the docs'})
    } finally {
        client.close();
    }
});

//Get the particular class with classId
router.get('/classes/:id', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        let id = req.params.id;
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('Classes');
        const findResult = await collection.find({classId:Number(id)}).toArray();
        console.log('Found documents =>', findResult);
        res.send({
            "status":"Success",
            "response":findResult
        })   
    } catch (error) {
        console.log('Error in getting the doc==>',error);
        res.send({'status':'Failure in getting the doc'})
    } finally {
        client.close();
    }
});

//Insert the record in classes collection
router.post('/classes/insert', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db('school_Info');
        const collection = db.collection('Classes');
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

//Update a record in classes collection
router.put('/classes/:classId/:section', async (req, res) => {
    try {
        let id = req.params.classId;
        let section = req.params.section;
        await client.connect();
        console.log('Connected successfully to server');
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('Classes');
        const updatedResult = await collection.updateOne({classId:Number(id)},{$set:{section:section}});
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
//delete a record in classes collection
router.delete('/classes/:class', async (req, res) => {
    try {
        let id = req.params.class;
        await client.connect();
        console.log('Connected successfully to server',id);
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('Classes');
        const deleteResult = await collection.deleteMany({"class":id.toString()});
        console.log('deleted documents =>', deleteResult);
        res.send({
            "status":"Success",
            "response":deleteResult
        })
    } catch (error) {
        console.log('Error in deleting the doc ==>',error);
        res.send({'status':'Failure in deleting the doc'})
    } finally {
        client.close()
    }
})


module.exports = router;