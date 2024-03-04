import express from 'express'

import { uploadProcessImg,resizerImages,} from 'api/helpers/uploadImage'
import { createProduct } from './products.controller'

const router = express.Router()


router.post('/',uploadProcessImg,resizerImages, createProduct);

export default router
