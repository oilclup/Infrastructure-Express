import express from 'express'
import { AuthRoutes } from './auth'
import { ExampleRoutes } from './example'
import { EmployeeRoutes } from './employee'

import { checkAuth,checkRole } from 'api/middleware/auth'

const router = express.Router()

router.use(AuthRoutes)
 //router.use('/example', checkAuth, checkRole('admin'), ExampleRoutes)
 router.use('/example', ExampleRoutes)
 router.use('/employee', EmployeeRoutes)

module.exports = router
