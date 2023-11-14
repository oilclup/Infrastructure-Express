import express from 'express'
import { createExample,getExamples,updateKeyExistingDoc } from './example.controller'

const router = express.Router()


router.post('/', createExample)
router.get('/', getExamples)
router.get('/update/key', updateKeyExistingDoc)

export default router
