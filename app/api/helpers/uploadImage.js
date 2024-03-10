const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs')
import { getRandomNumber } from 'api/helpers/generic'

const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true)
        } else {
            const error = new Error('Only PNG and JPG files are allowed.')
            error.status = 403
            cb(error, false)
        }
    } else {
        const error = new Error('Not an image! Please upload only images.')
        error.status = 403
        cb(error, false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

const uploadProcessImg = upload.fields([
    { name: 'products_file', maxCount: 10 },
])

const resizerImages = async (req, res, next) => {
    try {
        let imgRespList = []
        let imglist

        let pathFile = req.files.products_file
            ? 'products'
            : req.files.content_file
            ? 'content'
            : ''

        req.files.products_file
            ? (imglist = req.files.products_file)
            : req.files.content_file
            ? (imglist = req.files.content_file)
            : ''

        if(!req.files.products_file) return next()

        const directoryPath = `uploads/images/${pathFile}`
        if (!fs.existsSync(directoryPath)) {
            console.log(`${pathFile} directory does not exist. Creating...`)
            fs.mkdirSync(directoryPath, { recursive: true })
        }

        const date = Date.now()

        for (let i = 0; i < imglist.length; i++) {
            const file = imglist[i]
            const mimetype = file.mimetype.split('/')[1]
            const randomNum = getRandomNumber(1, 100)

            await sharp(file.buffer)
                .webp({ quality: 75 })
                .toFile(`${directoryPath}/${date}-${i}-${randomNum}.${mimetype}`)
            //.resize({ width: 500, height: 500, fit: 'inside' }) Resize and ensure fit within specified dimensions

            imgRespList.push({
                path: directoryPath,
                name: `${date}-${i}-${randomNum}.${mimetype}`,
            })
        }

        req.body.imgRespList = imgRespList
        next()
    } catch (error) {
        return res.error(`resize : ${error.message}`, error.status)
    }
}

module.exports = {
    uploadProcessImg,
    resizerImages,
}
