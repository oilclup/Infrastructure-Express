import mongoose from 'mongoose'
import config from './app'

const databases = {
    mongoDB() {   
        const db = mongoose.connect(
            config.mongodbUri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            },
            error => {
                if (error) console.error('MongoDB error: ', error)
                console.log('MongoDB connected')
            }
        )
        return db
    },

    mysql() {
        const connection = mysql.createPool({
            connectionLimit: 10,
            host: config.hostname,
            user: config.username,
            password: config.password,
            database: config.database,
            charset: 'utf8',
        })
        return connection
    },

    postgreSQL() {},

    mssql() {},
}

module.exports = databases.mongoDB()
