import express from 'express'
import { signUp, signIn, signOut, session } from './auth.controller'

const router = express.Router()


router.post('/signup', signUp)
router.post('/signin', signIn)

export default router
