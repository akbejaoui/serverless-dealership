import { describe, test, expect } from "@jest/globals"
import { handlerPath } from "@libs/handlerResolver"

describe("Handler resolver function tests", () => {
    test("Should return correct location to file", () => {
        const pathString = handlerPath(__dirname) + "/handlerResolver.test.ts"
        expect(pathString).toEqual("__test__/libs/handlerResolver.test.ts")
    })
})
