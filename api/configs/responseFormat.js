module.exports = (req, res, next) => {
    res.success = (data = '', statusCode = 200) => {
        if (typeof data === 'string')
            res.status(statusCode || 200).json({ message: data })
        else res.status(statusCode || 200).json(data)
    }
    res.created = (data = '', statusCode = 201) => {
        if (typeof data === 'string')
            res.status(statusCode || 201).json({ message: data })
        else res.status(statusCode || 201).json(data)
    }
    res.unauthorized = (data = '', statusCode = 401) => {
        if (typeof data === 'string')
            res.status(statusCode || 401).json({ message: data })
        else res.status(statusCode || 401).json(data)
    }
    res.other = (data = '', statusCode = 1010) => {
        if (typeof data === 'string')
            res.status(statusCode || 1010).json({ message: data })
        else res.status(statusCode || 1010).json(data)
    }
    res.error = (errorMsg = '', statusCode = 500) => {
        res.status(statusCode || 500).json({
            error: {
                status: statusCode,
                message: errorMsg,
            },
        })
    }

    next()
}
