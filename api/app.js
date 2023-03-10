import express from 'express'
import config from './configs/app'
import AdminRoutes from './modules/admin'

import cors from 'cors'

import path from 'path'

const app = express()

// Express Configs
require('./configs/express')(app)



// CORS
app.options('*', cors())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://iyarinmuaythai.com/', 'https://www.iyarinmuaythai.com/'],
    optionsSuccessStatus: 200
  })
);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/api', AdminRoutes)


// view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Error handler
require('./configs/errorHandler')(config.isProduction, app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
