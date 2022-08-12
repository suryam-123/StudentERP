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

//Api to get the class Info with students
router.get('/classInfo', async(req, res) => {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db('school_Info');
        const classCollection = db.collection('Classes');
        const studentCollection = db.collection('Students');
        const findclassCollection = await classCollection.find({}).toArray();
        for(let classInfo of findclassCollection) {
            const findStudentResult = await studentCollection.find({'class':classInfo['class'],'section':classInfo['section']}).toArray();
            classInfo['students'] = findStudentResult
        }
        console.log('Found documents =>', findclassCollection);
        res.send({
            "status":"Success",
            "response":findclassCollection
        })   
    } catch (error) {
        console.log('Error in getting the docs==>',error);
        res.send({'status':'Failure in getting the docs'})
    } finally {
        client.close();
    }
});
//Api to get the particular class and section Info with students
router.get('/classInfo/:class/:section', async(req, res) => {
    try {
        let section = req.params.section;
        let selectedClass = req.params.class;
        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db('school_Info');
        const classCollection = db.collection('Classes');
        const studentCollection = db.collection('Students');
        const findclassCollection = await classCollection.find({'class':selectedClass,'section':section}).toArray();
        for(let classInfo of findclassCollection) {
            const findStudentResult = await studentCollection.find({'class':classInfo['class'],'section':classInfo['section']}).toArray();
            classInfo['students'] = findStudentResult
        }
        console.log('Found documents =>', findclassCollection);
        res.send({
            "status":"Success",
            "response":findclassCollection
        })   
    } catch (error) {
        console.log('Error in inserting the doc==>',error);
        res.send({'status':'Failure in getting the doc'})
    } finally {
        client.close();
    }
});
// Insert Parent Records with ChildInfo
router.post('/studentParentInfo/insert', async(req, res) => {
    try {
        await client.connect();
        let parentInfo = req.body;
        let studentDetails = parentInfo[0]['studentDetails'];
        const db = client.db('school_Info');
        const parentCollection = db.collection('parentDetails');
        const findParentCollection = await parentCollection.find({'parentId':parentInfo['parentId']}).toArray();
        if(findParentCollection.length === 0 ) {
            delete parentInfo[0]['studentDetails'];
            await parentCollection.insertMany(parentInfo);
        }
        const studentCollection = db.collection('Students');
        const insertResult = await studentCollection.insertMany(studentDetails);
        res.send({
            "status":"Success",
            "response":insertResult
        })   
    } catch (error) {
        console.log('Error in inserting the doc ==>',error);
        res.send({'status':'Failure in inserting the doc'});
    } finally {
        client.close();
    }
});

// Update Section for all the students
router.put('/updateStudent/:class/:section/:modifiedSection', async (req, res) => {
    try {
        let section = req.params.section;
        let classC = req.params.class;
        let modifiedSection = req.params.modifiedSection;
        await client.connect();
        const db = client.db('school_Info');
        const classCollection = db.collection('Classes');
        const findClassCollection = await classCollection.find({'class': classC ,'section':section}).toArray();
        if(findClassCollection.length === 0 ) {
            res.send({
                'status':'Success',
                'response':'No records Found'
            })
        } else {
            await classCollection.updateOne({'class': classC ,'section':section},{$set:{'section': modifiedSection}});
            const studentCollection = db.collection('Students');
            await studentCollection.updateMany({'class': classC ,'section':section},{$set:{'section': modifiedSection}});
            res.send({
                "status":"Success",
                "response":"Documents Updated"
            });
        }
    } catch (error) {
        console.log('Error in updating the doc ==>',error);
        res.send({'status':'Failure in updating the doc'})
    } finally {
        client.close();
    }
});

//Delete records with ParentName in student and parentdb
router.delete('/studentRecords/:parentName', async (req, res) => {
    try {
        await client.connect();
        let parentName = req.params.parentName;
        const db = client.db('school_Info');
        const parentCollection = db.collection('parentDetails');
        const findParentCollection = await parentCollection.find({'parentName':parentName}).toArray();
        if(findParentCollection.length === 0 ) {
            res.send({
                'status':'Success',
                'response':'No parent Records Found'
            })
        } else {
            for(let parent of findParentCollection) {
                await parentCollection.deleteMany({"parentName":parentName});
                const studentCollection = db.collection('Students');
                await studentCollection.deleteMany({"student_id":parent['student_id']});
            }
            res.send({
                "status":"Success",
                "response":'Data has been deleted Successfully'
            })  
        }
    } catch (error) {
        console.log('Error in deleting the doc==>',error);
        res.send({'status':'Failure in deleting the doc'})
    } finally {
        client.close()
    }
})


module.exports = router;