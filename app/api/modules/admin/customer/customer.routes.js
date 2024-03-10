import express from 'express'
import { createCustomer } from './customer.controller'
import { customerValidator, validateRules } from '../validator/customer.validator'


const router = express.Router()


router.post('/' ,customerValidator(), validateRules, createCustomer);

export default router
