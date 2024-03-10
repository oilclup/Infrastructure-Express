const { body } = require("express-validator");
import { validateRules } from '../../../helpers/validateRules'

const customerValidator = () => {
    return [
        body('email', 'Email must be between 3 to 32 characters')
            .matches(/.+\@.+\..+/)
            .withMessage('Email must contain @')
            .isLength({
                min: 4,
                max: 32,
            }),
    ]
}


module.exports = {
    customerValidator,
    validateRules
}

