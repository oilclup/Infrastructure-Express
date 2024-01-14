import dotenv from 'dotenv'
dotenv.config()

module.exports = {
    port: process.env.PORT || 3000,
    isProduction: process.env.NODE_ENV === 'production',
    pageLimit: process.env.PAGE_LIMIT || 20,
    jwt_secret_key: process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
    mongodbUri:
        process.env.NODE_ENV === 'production'
            ? process.env.MONGODB_URI 
            : process.env.MONGODB_URI_LOCAL,
    mailgunApiKey:
        process.env.MAILGUN_API_KEY ||
        '6f7fed9456b97b4f9c9edd5ddb926f17-f7d0b107-bf312bde',
}
