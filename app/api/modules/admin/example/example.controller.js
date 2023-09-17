import exampleModel from 'api/modules/models/example.model'
import scopeSearch  from 'api/helpers/searchQuery'
import { paginatedResults } from 'api/services/pagination'


export const createExample = async (req, res) => {
    try {
       /*  const { title, detail } = req.body
        const example = await new exampleModel({
            title : title,
            detail : detail
        })

        await example.save()
        res.created('created example successfully') */
        res.success('created example successfully',201) 
    } catch (error) {
        res.error(error.message, error.status)
    }
}

export const getExamples = async (req, res) => {
 
       try {
        let limit = +(req.query.size || 10)
        let offset = +(limit * ((req.query.page || 1) - 1))
       
        let _q = scopeSearch(req)

        let rows = await exampleModel.find(_q.isDeleted,_q.query)
            .sort(_q.sort)
            .limit(limit)
            .skip(offset)

        let count = await exampleModel.countDocuments(_q.query)
        const result = await paginatedResults(rows, count, limit, req)
        res.success(result)
    } catch (error) {
        res.error(error.message, error.status)
    }

}
