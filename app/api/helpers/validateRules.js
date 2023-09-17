const { validationResult } = require('express-validator')

const validateRules = (req, res, next) => {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

const validateOne = (req, res, next) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
    let error = {}
    errors.array().map(err => (error[err.param] = err.msg))
    return res.status(422).json({ error })
   }

    next()
}
module.exports = {
    validateRules,
}
