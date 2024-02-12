import express from 'express'
import { getEmployee,createEmployee,filterAPIExample } from './employee.controller'

const router = express.Router()

router.get('/', getEmployee)
router.post('/', createEmployee)

router.post('/filter', filterAPIExample)

export default router
