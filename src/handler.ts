import {ApolloServer} from "@apollo/server"
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda'; 
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'

// Types
// import dealerType from '../data/types/dealer.type';
//import vehicleType from '../data/types/vehicle.type';

// Resolvers
// import dealerResolver from '../data/resolvers/dealer.resolver';
// import vehicleResolver from '../data/resolvers/vehicle.resolver';

//const typeDefs = mergeTypeDefs([dealerType, vehicleType]);
//const resolvers = mergeResolvers([dealerResolver, vehicleResolver]);



const server = new ApolloServer({
    
})

exports.graphql = startServerAndCreateLambdaHandler(server);
