import employeeModel from 'api/modules/models/employee.model'
import { paginatedResults } from 'api/services/pagination'
import scopeSearch from 'api/helpers/searchQuery'

export const getEmployee = async (req, res) => {
  try {
      let limit = +(req.query.size || 10)
      let offset = +(limit * ((req.query.page || 1) - 1))

      let _q = scopeSearch(req)

      let rows = await employeeModel
          .find(_q.isDeleted, _q.query)
          .sort(_q.sort)
          .limit(limit)
          .skip(offset)
      let count = await employeeModel.countDocuments(_q.query)
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
    const { filter } = req.body;

    if (!filter || filter.type !== 'operator' || !filter.and || !Array.isArray(filter.and)) {
        return res.status(400).json({ error: 'Invalid filter format' });
      }
  
      const query = {
        $and: filter.and.map(condition => {
          const key = Object.keys(condition)[0];
          const operator = Object.keys(condition[key])[0];
          const value = condition[key][operator];
          return { [key]: { [`$${operator}`]: value } };
        })
      };
      
      console.log(query);

     let result = await employeeModel.find(query)
     console.log("re", result)
    res.success(result)

 } catch (error) {
     res.error(error.message, error.status)
 }

}
