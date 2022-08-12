let express = require('express');
let router = express.Router();
const {
    MongoClient
} = require('mongodb');
const config = require('../setup/config.json')
// Connection URL
const url =`mongodb+srv://${config.mongoInfo['username']}:${config.mongoInfo['password']}@nodejsmongodb.1sq3z.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

//Get all the students Info
router.get('/students', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db('school_Info');
        const collection = db.collection('Students');
        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
        res.send({
            "status":"Success",
            "response":findResult
        })   
    } catch (error) {
        res.send({'status':'Failure in getting the docs'})
    } finally {
        client.close();
    }
});

//Get particular student with id
router.get('/students/:id', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        let id = req.params.id;
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('Students');
        const findResult = await collection.find({'student_id':Number(id)}).toArray();
        console.log('Found documents =>', findResult);
        res.send({
            "status":"Success",
            "response":findResult
        })   
    } catch (error) {
        res.send({'status':'Failure in getting the doc'})
    } finally {
        client.close();
    }
});

// Insert the docs in student collection
router.post('/students/insert', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db('school_Info');
        const collection = db.collection('Students');
        const insertResult = await collection.insertMany(req.body);
        res.send({
            "status":"Success",
            "response":insertResult
        })   
    } catch (error) {
        res.send({'status':'Failure in inserting the doc'})
    } finally {
        client.close();
    }
});

// Update the doc with class in student collection
router.put('/students/:studentId/:class', async (req, res) => {
    try {
        let id = req.params.studentId;
        let classC = req.params.class;
        await client.connect();
        console.log('Connected successfully to server');
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('Students');
        const updatedResult = await collection.updateOne({student_id:Number(id)},{$set:{'class':classC}});
        console.log('updated documents =>', updatedResult);
        res.send({
            "status":"Success",
            "response":updatedResult
        })
    } catch (error) {
        res.send({'status':'Failure in updating the doc'})
    } finally {
        client.close();
    }
});

//Delete the records with parameter studentId
router.delete('/students/:id', async (req, res) => {
    try {
        let id = req.params.id;
        await client.connect();
        console.log('Connected successfully to server',id);
        console.log(req.url);
        const db = client.db('school_Info');
        const collection = db.collection('Students');
        const deleteResult = await collection.deleteMany({"student_id":Number(id)});
        console.log('deleted documents =>', deleteResult);
        res.send({
            "status":"Success",
            "response":deleteResult
        })
    } catch (error) {
        res.send({'status':'Failure in updating the doc'})
    } finally {
        client.close()
    }
})


module.exports = router;