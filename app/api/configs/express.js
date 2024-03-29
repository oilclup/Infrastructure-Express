import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'

import loggerMiddleware from '../middleware/loggerMiddleware'

module.exports = async (app) => {
    // enable files upload

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
    app.use(express.json({ limit: '500mb' }));
    app.use(express.urlencoded({ extended: true, limit: '500mb' }));

    // app.use((req, res, next) => {
    //     req.validateRules = validateRules
    //     next()
    // })

    // Cookies
    app.use(cookieParser())
    // full option
    //app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :response-time ms - :res[content-length] ":referrer" ":user-agent"'));
    app.use(morgan(':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :response-time ms'));
    app.use(loggerMiddleware);
   
  // Custom Response Format
    app.use(require('./responseFormat'))
    
}
