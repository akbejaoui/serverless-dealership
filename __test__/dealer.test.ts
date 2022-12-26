import { ApolloServer } from "@apollo/server";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { beforeAll, describe, expect, jest, test } from "@jest/globals";

// Types
import dealerType from '@graphql/types/dealer.type';
import vehicleType from '@graphql/types/vehicle.type';

// Resolvers
import dealerResolver from '../src/graphql/resolvers/dealer.resolver';
import vehicleResolver from '@graphql/resolvers/vehicle.resolver';


describe("Integration test for dealers", () => {
    let testingServer
    const sampleResponse = [{ dealer_name: "ahmed"}, {dealer_name:"coding"}]

    interface ContextValue {
        dataSources: {
          dealers: []
        };
      }

    beforeAll(() => {
        dealerResolver.Query.dealers = jest.fn(() => sampleResponse) as any

        const typeDefs = mergeTypeDefs([dealerType, vehicleType]);
        const resolvers = mergeResolvers([dealerResolver, vehicleResolver]);


        testingServer = new ApolloServer<ContextValue>({
            typeDefs,
            resolvers,
          });
    })

    test('Returns list of dealer names', async () => {
        const response: any = await testingServer.executeOperation({
          query: `
            query {
                dealers {
                    dealer_name
                }
           }`
        });
      
        expect(response.body.kind).toEqual('single')
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data?.dealers).toHaveLength(2);
        expect(response.body.singleResult.data?.dealers).toEqual(sampleResponse)
      });

})

