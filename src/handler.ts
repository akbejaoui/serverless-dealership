import {ApolloServer} from "@apollo/server"
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda'; 
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

// Types
import dealerType from '@graphql/types/dealer.type';
import vehicleType from '@graphql/types/vehicle.type';

// Resolvers
import dealerResolver from '@graphql/resolvers/dealer.resolver';
import vehicleResolver from '@graphql/resolvers/vehicle.resolver';

const typeDefs = mergeTypeDefs([dealerType, vehicleType]);
const resolvers = mergeResolvers([dealerResolver, vehicleResolver]);



const server = new ApolloServer({
    typeDefs,
    resolvers
})

exports.graphql = startServerAndCreateLambdaHandler(server);
