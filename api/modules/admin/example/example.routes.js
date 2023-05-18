import express from 'express'
import { createExample,getExamples } from './example.controller'

const router = express.Router()


router.post('/', createExample)
router.get('/', getExamples)


export default router
