import { GraphQLList } from "graphql";
import { listAllUsersResolver } from "../Resolvers/userResolvers.graphql.js";
import { userType } from "../AllTypes/userType.grphql.js";



export const userFields = {
    Query:{
        usersList:{
            type:new GraphQLList(userType),
            description:'list of all users',
            resolve:listAllUsersResolver
        }
    }
}