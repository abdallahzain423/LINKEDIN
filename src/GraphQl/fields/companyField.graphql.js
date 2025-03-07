

import { GraphQLList } from "graphql";
import { listAllCompaniesResolver } from "../Resolvers/companyResolvers.graphql.js";
import { companyType } from "../AllTypes/companyType.graphql.js";

export const companyFields = {
    Query:{
        companiesList:{
            type:new GraphQLList(companyType),
            description:'list of all companies',
            resolve:listAllCompaniesResolver
        }
    }
}