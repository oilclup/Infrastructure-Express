import express from 'express'
import { AuthRoutes } from './auth'
import { ExampleRoutes } from './example'
import { checkAuth,checkRole } from 'api/middleware/auth'

const router = express.Router()

router.use(AuthRoutes)
router.use('/example', checkAuth, checkRole('admin'), ExampleRoutes)


module.exports = router
