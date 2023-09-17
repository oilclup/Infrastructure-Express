import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import cors from 'cors'

import loggerMiddleware from '../middleware/loggerMiddleware'

module.exports = async (app) => {
    // enable files upload
    app.use(
        fileUpload({
            createParentPath: true,
            limits: {
                fileSize: 10 * 1024 * 5024000, //500MB max file(s) size
            },
        })
    )

    // Connect MongoDB
    require('./databases')

    // CORS
    app.use(cors())

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })

    // Parser Body
    app.use(express.json({ limit: '500mb' }))
    app.use(express.urlencoded({ extended: false, limit: '500mb' }))

    // app.use((req, res, next) => {
    //     req.validateRules = validateRules
    //     next()
    // })

    // Cookies
    app.use(cookieParser())
  
    app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"'));

    app.use(loggerMiddleware);
   
  // Custom Response Format
    app.use(require('./responseFormat'))
    
}
