import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        position: {
            type: String,
        },
        age: {
            type: Number,
        },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },
    },
    { timestamps: true }
)
schema.plugin(uniqueValidator, { status: 500 })
schema.plugin(aggregatePaginate)

module.exports = mongoose.model('Employee', schema)
