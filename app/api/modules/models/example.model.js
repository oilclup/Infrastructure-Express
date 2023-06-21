import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
const schema = new mongoose.Schema(
    {
        title: { type: String, trim: true },
        detail: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },

    },
    { timestamps: true }
)

schema.plugin(uniqueValidator, { status: 500 })
schema.plugin(aggregatePaginate)

module.exports = mongoose.model('Example', schema)
