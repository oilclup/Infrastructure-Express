import employeeModel from 'api/modules/models/employee.model'
import { paginatedResults } from 'api/services/pagination'

export const createEmployee = async (req, res) => {
    try {
        const employee = await new employeeModel({
            ...req.body
        })

        await employee.save()
        res.success('created employee successfully',201)
    } catch (error) {
        res.error(error.message, error.status)
    }
}

export const getEmployee = async (req, res) => {
    try {
        let limit = +(req.query.size || 10)
        let offset = +(limit * ((req.query.page || 1) - 1))
        let searchText = req.query.searchText // Extract search text from query parameters

        let conditionQuery = {
            $or: [
                { name: { $regex: searchText, $options: 'i' } },
                { email: { $regex: searchText, $options: 'i' } },
                { position: { $regex: searchText, $options: 'i' } },
            ],
            isDeleted: false, // Fix the condition for isDeleted
        }

        let rows = await employeeModel
            .find(conditionQuery)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset)

        let count = await employeeModel.countDocuments(conditionQuery) // Use conditionQuery for counting documents

        const result = await paginatedResults(rows, count, limit, req)
        res.success(result)
    } catch (error) {
        res.error(error.message, error.status)
    }
}

export const filterAPIExample = async (req, res) => {
    try {
        /*     let query = {$and: [
        { age: { $gt: 32 } },
        { age: { $lte: 35 } }
     ]}
    console.log(JSON.stringify(query))

    let result = await employeeModel.find(query)

    res.success(result) */
        const { filter } = req.body

        if (
            !filter ||
            filter.type !== 'operator' ||
            !filter.and ||
            !Array.isArray(filter.and)
        ) {
            return res.status(400).json({ error: 'Invalid filter format' })
        }

        const query = {
            $and: filter.and.map((condition) => {
                const key = Object.keys(condition)[0]
                const operator = Object.keys(condition[key])[0]
                const value = condition[key][operator]
                return { [key]: { [`$${operator}`]: value } }
            }),
        }

        console.log(query)

        let result = await employeeModel.find(query)
        console.log('re', result)
        res.success(result)
    } catch (error) {
        res.error(error.message, error.status)
    }
}
