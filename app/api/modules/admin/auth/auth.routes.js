import express from 'express'
import { signUp, signIn, signOut, session } from './auth.controller'
import { signupValidator,validateRules } from '../validator/auth.validator'

const router = express.Router()

router.post('/signup',signupValidator(),validateRules, signUp)
router.post('/signin',/* ,signupValidator(),validateRules, */ signIn)

export default router
