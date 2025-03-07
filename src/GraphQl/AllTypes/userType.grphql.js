import { GraphQLBoolean, GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";


export const userType = new GraphQLObjectType({
    name:'userType',
    description:'this is user type',
    fields:{
        id:{type:GraphQLID},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        username:{type:GraphQLString},
        email:{type:GraphQLString},
        password:{type:GraphQLString},
        provider:{type:GraphQLString},
        gender:{type:GraphQLString},
        DOB:{type:GraphQLString},
        mobileNumber:{type:GraphQLString},
        Role:{type:GraphQLString},
        isconfirmed:{type:GraphQLBoolean},
        deletedAt:{type:GraphQLString},
        pannedAt:{type:GraphQLString},
        confirmOtp:{type:GraphQLString},
        updatedBy:{type:GraphQLString},
        profilepicture:{type:GraphQLString},
        createdAt:{type:GraphQLString},
        updatedAt:{type:GraphQLString},
    }
})
