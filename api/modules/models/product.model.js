import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        prod_name: { type: String, trim: true,required: true},
        prod_detail: { type: String, trim: true, required: true},
        price: { type: Number,trim: true,required: true,unique: true},
        qty: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
        },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },

    },
    { timestamps: true }
)



module.exports = mongoose.model('Admin', schema)
