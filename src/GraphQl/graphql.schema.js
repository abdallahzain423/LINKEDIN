import { companyFields } from "./fields/companyField.graphql.js";
import { userFields } from "./fields/userField.graphql.js";
import { GraphQLSchema, GraphQLObjectType } from "graphql";



export const mainSchema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name:"mainqueryschema",
        description:"this is main query schema",
        fields:{
            ...userFields,
            ...companyFields
        }
    })
})

