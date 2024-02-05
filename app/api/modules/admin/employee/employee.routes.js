import express from 'express'
import { getEmployee,filterAPIExample } from './employee.controller'

const router = express.Router()

router.get('/', getEmployee)

router.post('/filter', filterAPIExample)

export default router
