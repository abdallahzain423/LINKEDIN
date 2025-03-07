import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";


export const companyType = new GraphQLObjectType({
    name:'companyType',
    description:'this is company type',
    fields:{
        id:{type:GraphQLID},
        companyName:{type:GraphQLString},
        description:{type:GraphQLString},
        industry:{type:GraphQLString},
        address:{type:GraphQLString},
        numberOfEmployees:{type:GraphQLInt},
        companyEmail:{type:GraphQLString},
        createdBy:{type:GraphQLString},
        logo:{type:GraphQLString},
        coverPic:{type:GraphQLString},
        HRs:{type:GraphQLString},
        bannedAt:{type:GraphQLString},
        deletedAt:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        updatedAt:{type:GraphQLString},
    }
})
