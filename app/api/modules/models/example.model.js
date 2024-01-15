import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
const schema = new mongoose.Schema(
    {
        no: { type: Number, unique: true },
        title: { type: String, trim: true },
        detail: { type: String, trim: true },
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null },

    },
    { timestamps: true }
)

schema.pre('save', async function (next) {
    try {
        if (this.isNew) {
            const latestAdmin = await this.constructor.findOne({}, {}, { sort: { 'no': -1 } });
            if (latestAdmin && latestAdmin.no) {
                this.no = latestAdmin.no + 1;
            } else {
                this.no = 1;
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

schema.plugin(uniqueValidator, { status: 500 })
schema.plugin(aggregatePaginate)

module.exports = mongoose.model('Example', schema)
