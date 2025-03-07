import { User } from "../../DB/models/index.js"

export const listAllUsersResolver = async()=>{
    return await User.find()
}
