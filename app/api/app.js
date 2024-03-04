import express from 'express'
import config from './configs/app'
import AdminRoutes from './modules/admin'
import cors from 'cors'
import path from 'path'

const app = express()

// Express Configs
require('./configs/express')(app)

// Middleware
require('./configs/middleware')
app.use((req, res, next) => {
    const test = /\?[^]*\//.test(req.url)
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
        res.redirect(301, req.url.slice(0, -1))
    else next()
})

// CORS
app.options('*', cors())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
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
app.use('/api/uploads', express.static(`${__dirname}/uploads/images/products`))


// view engine
app.set('views', path.join(__dirname, 'views'))

app.set('view engine', 'ejs')

// Error handler
require('./configs/errorHandler')(config.isProduction, app)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`))
