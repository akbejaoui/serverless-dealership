
import { describe, expect, jest, test } from "@jest/globals"

import dealerResolver from "../../../src/graphql/resolvers/dealer.resolver"
import * as dealerService from "../../../src/services/dealerService"

describe("Dealer resolvers", () => {
    const mockContext = {
        dataSources: {
            dealers: { getAllDealers: jest.fn() },
        },
    }

    test("fetch all dealers from dealer resolver", async () => {
      (dealerService as any).getAllDealers = mockContext.dataSources.dealers.getAllDealers

      const { getAllDealers } = mockContext.dataSources.dealers      
       getAllDealers.mockReturnValueOnce([{ dealer_name: "ahmed" }])
        
        // check the resolver response
        const res = await dealerResolver.Query.dealers()

        expect(res).toEqual([{ dealer_name: "ahmed" }])

        // make sure the dataSources were called properly
        expect(getAllDealers).toBeCalled()
    })
})
