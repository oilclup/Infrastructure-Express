module.exports = (req, res, next) => {
    res.success = (data = '', statusCode = 200) => {
        if (typeof data === 'string') {
            res.status(statusCode || 200).json({ message: data });
        } else if (Array.isArray(data)) {
            res.status(statusCode || 200).json({ data });
        } else {
            res.status(statusCode || 200).json({ data });
        }
    };
    res.error = (errorMsg = '', statusCode = 500) => {
        res.status(statusCode || 500).json({
            error: {
                status: statusCode,
                message: errorMsg,
            },
        });
    };

    next();
}
