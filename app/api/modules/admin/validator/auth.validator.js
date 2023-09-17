const { body } = require("express-validator");
import { validateRules } from '../../../helpers/validateRules'

const signupValidator = () => {
    return [
        body('email', 'Email must be between 3 to 32 characters')
            .matches(/.+\@.+\..+/)
            .withMessage('Email must contain @')
            .isLength({
                min: 4,
                max: 32,
            }),
            body('password', 'Password is required').notEmpty(),
            body('password')
            .isLength({ min: 6 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
    ]
}

const signinValidator = () => {
    return [
        body('email', 'Email must be between 3 to 32 characters')
            .matches(/.+\@.+\..+/)
            .withMessage('Email must contain @')
            .isLength({
                min: 4,
                max: 32,
            }),
            body('password', 'Password is required').notEmpty(),
            body('password')
            .isLength({ min: 6 })
            .withMessage('Password must contain at least 6 characters')
            .matches(/\d/)
            .withMessage('Password must contain a number'),
    ]
}

module.exports = {
    signupValidator,
    signinValidator,
    validateRules
}

