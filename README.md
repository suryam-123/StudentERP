# StudentERP

## 🛠️ Installation Steps

1. Clone the repository

```bash
git clone -Dev https://github.com/suryam-123/StudentERP.git
```

2. Change the working directory

```bash
cd StudentERP
```

3. Install dependencies

```bash
npm install
```

4. Run the app

```bash
npm start
```
The sample for the apis used in the app is described below.

## GET /classes
**http://localhost:4500/classes**
```
Response 
{
  "status": "Success",
  "response": [
    {
      "_id": "62f610950373986fafef0432",
      "class": "1",
      "section": "A",
      "classId": 1,
      "classTeacher": "Andrew Waters"
    }
    ,..19 more items
    ]
}
```

## GET /classes/:id(classId)

**http://localhost:4500/classes/1**
```
Response 
{
  "status": "Success",
  "response": [
    {
      "_id": "62f610950373986fafef0432",
      "class": "1",
      "section": "A",
      "classId": 1,
      "classTeacher": "Andrew Waters"
    }]
}
```
## POST /classes/insert

**http://localhost:4500/classes/insert**
**Request**
```

[{
    "class": "1",
    "section": "A",
    "classId": 1,
    "classTeacher": "Andrew Waters"
}]

```
**Response**
```
{
  "status": "Success",
  "response": [
    {
      "_id": "62f610950373986fafef0432",
      "class": "1",
      "section": "A",
      "classId": 1,
      "classTeacher": "Andrew Waters"
    }]
}
```


## PUT /classes/classId/sectionId


**http://localhost:4500/classes/2/C**

**Response**
```
{
  "status": "Success",
  "response": {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
  }
}
```

## DELETE /classes/class


**http://localhost:4500/classes/10**

**Response**
```
{
    "status": "Success",
    "response": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```
**For student and parentInfo simliar apis are used .For every function description is added**
