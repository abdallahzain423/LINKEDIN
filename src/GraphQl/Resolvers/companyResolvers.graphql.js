
import { Company } from "../../DB/models/index.js"

export const listAllCompaniesResolver = async()=>{
    return await Company.find()
}
