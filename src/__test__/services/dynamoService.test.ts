import { beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals"
import { createItem, deleteItem, get, scan, updateItem } from "@services/dynamoService"
import dynamoDBClient from "@models/index"

//* mock aws promise response to resolve to true
const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true))
const awsSdkPromiseFailureResponse = jest.fn().mockReturnValue(Promise.reject({ error: "Not found" }))

//* mock dynamodb return function
const successPromiseFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }))
const failurePromiseFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseFailureResponse }))

describe("dynamo service tests", () => {
    let data

    beforeAll(() => {
        dynamoDBClient.put = successPromiseFn as any
        dynamoDBClient.scan = successPromiseFn as any
        dynamoDBClient.get = successPromiseFn as any
        dynamoDBClient.update = successPromiseFn as any
        dynamoDBClient.delete = successPromiseFn as any
    })

    beforeEach(() => {
        data = {}
    })

    test("CreateItem method", async () => {
        data = { TableName: "Dealer", Item: { dealer_name: "data" } }
        await createItem(data)
        expect(dynamoDBClient.put).toHaveBeenCalledWith(data)
    })

    test("scan method", async () => {
        data = { TableName: "Dealer" }
        await scan(data)
        expect(dynamoDBClient.scan).toHaveBeenCalledWith(data)
    })

    test("get method", async () => {
        data = { TableName: "Dealer" }
        await get(data)
        expect(dynamoDBClient.get).toHaveBeenCalledWith(data)
    })

    test("update method", async () => {
        data = { TableName: "Dealer", Item: { dealer_name: "instamotion" } }
        await updateItem(data, {})
        expect(dynamoDBClient.update).toHaveBeenCalledWith(data)
    })

    test("delete method", async () => {
        data = { TableName: "Dealer", Item: { dealer_id: "dealer_randomId" } }
        await deleteItem(data, {})
        expect(dynamoDBClient.delete).toHaveBeenCalledWith(data)
    })

    test("delete method fails to find object", async () => {
        dynamoDBClient.delete = failurePromiseFn as any
        data = { TableName: "Dealer", Item: { dealer_id: "dealer_randomId" } }

        await expect(() => deleteItem(data, {})).rejects.toEqual({ error: "Not found" })
        expect(dynamoDBClient.delete).toHaveBeenCalledWith(data)
    })
})
