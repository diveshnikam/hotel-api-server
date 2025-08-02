const mongoose = require("mongoose")
require("dotenv").config()

const MongoUri = process.env.MONGODB

const initDatabase = async () => {
    await mongoose.connect(MongoUri).then(() => {
        console.log("Database Connected")
    }).catch((error) => {
        console.log("Error", error)
    })
}

module.exports = {initDatabase}