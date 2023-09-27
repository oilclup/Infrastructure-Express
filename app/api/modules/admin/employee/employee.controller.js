import employeeModel from 'api/modules/models/employee.model'


export const filterAPIExample = async (req, res) => {
 
try {
    let result = await employeeModel.find({$and: [
        { age: { $ne: 32 } },
        { age: { $ne: 32 } }
     ]})
    console.log(result)
    res.success(result)
    // const { filter } = req.body;

    // if (!filter || filter.type !== 'operator' || !filter.and || !Array.isArray(filter.and)) {
    //     return res.status(400).json({ error: 'Invalid filter format' });
    //   }
  
    //   const query = {
    //     $and: filter.and.map(condition => {
    //       const key = Object.keys(condition)[0];
    //       return { [key]: { [`$${Object.keys(condition[key])[0]}`]: condition[key][Object.keys(condition[key])[0]] } };
    //     })
    //   };
    //   console.log("query", JSON.stringify(query) )

    //   const result = await employeeModel.find(query);
    //   console.log("re", result)
    // res.success(result)

 } catch (error) {
     res.error(error.message, error.status)
 }

}
