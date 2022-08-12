const dotenv = require('dotenv')
dotenv.config();
const {
    MONGO_DB_URL
} = process.env
module.exports ={
    MONGO_DB_URL
}