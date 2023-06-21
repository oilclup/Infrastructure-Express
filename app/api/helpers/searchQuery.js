const mongoose = require('mongoose')

const scopeSearch = (req) => {
    let $and = {}
    for (const [key, value] of Object.entries(req.query)) {
        let query = [
            'page',
            'orderByField',
            'orderBy',
            'start_date',
            'end_date',
            'size',
            'createdAt',
            'filterBy',
            'is_video',
            'is_paid',
            'premiumPermission',
            'trial',
            'isActive',

        ]
        if (!value || value != '' || value === undefined) {
            if (mongoose.Types.ObjectId.isValid(value)) {
                $and = Object.assign($and, { [key]: value})
            } else if (!query.includes(key) && value) {
                $and = Object.assign($and, { [key]: { $regex: value } })
            }
        }
    }

    let query = $and ? $and : {}
    let isDeleted = { isDeleted : false }
    let sort = { createdAt: -1 }
    if (req.query.orderByField && req.query.orderBy)
        sort = {
            [req.query.orderByField]:
                req.query.orderBy.toLowerCase() == 'desc' ? -1 : 1,
        }
    return { isDeleted,  query: query, sort: sort }
}

export default scopeSearch
