import express from 'express'
import { AuthRoutes } from './auth'
import { ExampleRoutes } from './example'
import { EmployeeRoutes } from './employee'
import { ProductsRoutes } from './products'
import { CustomerRoutes } from './customer'

import { checkAuth,checkRole } from 'api/middleware/auth'
const router = express.Router()

let adminRole = ["admin","superAdmin"]

router.use(AuthRoutes)
 //router.use('/example', checkAuth, checkRole('admin'), ExampleRoutes)
 router.use('/example',checkAuth,checkRole(adminRole), ExampleRoutes)
 router.use('/employee', EmployeeRoutes)
 router.use('/product', ProductsRoutes)
 router.use('/customer', CustomerRoutes)

module.exports = router
