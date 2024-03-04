import productModel from 'api/modules/models/product.model'
import { paginatedResults } from 'api/services/pagination'

export const createProduct = async (req, res) => {
    try {
        const product = await new productModel({
            ...req.body,
            image : req.body.imgRespList
        })

        await product.save()
        res.success('created product successfully',201)
    } catch (error) {
        res.error(error.message, error.status)
    }
}