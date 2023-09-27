import express from 'express'
import { filterAPIExample } from './employee.controller'

const router = express.Router()


router.post('/filter', filterAPIExample)

export default router
