import VehicleModel, { VehicleInterface } from "@models/Vehicle"
import { createItem, get, scan, updateItem, deleteItem } from "./dynamoService"
import { generateUpdateQuery } from "@libs/updateExpressionGenerator"

const TableName: string = process.env.DYNAMODB_DEALER_VEHICLE_TABLE

export const createVehicle = (data: any): Promise<VehicleInterface> => {
    const vehicle = new VehicleModel(data).getMappedObject<VehicleInterface>()
    const params = {
        TableName,
        Item: vehicle,
    }

    return createItem<VehicleInterface>(params)
}

export const getVehicle = (id: string): Promise<VehicleInterface> => {
    const params = {
        TableName,
        Key: {
            sk: id,
        },
    }

    return get<VehicleInterface>(params)
}

export const getAllVehicles = (): Promise<VehicleInterface[]> => {
    const params = {
        TableName,
        FilterExpression: "sk <> :dealer",
        ExpressionAttributeValues: {
            ":dealer": "dealer",
        }
    }

    return scan<VehicleInterface[]>(params)
}

export const updateVehicle = (args) => {
    const updateExpression = generateUpdateQuery(args, ['dealer_id', 'sk'])

    const params = {
        TableName,
        Key: {
            dealer_id: args.dealer_id,
            sk: args.sk,
        },
        ...updateExpression,
        ReturnValues: "ALL_NEW",
    }

    return updateItem(params, args)
}

export function deleteVehicle(args) {
    const params = {
        TableName,
        Key: {
            dealer_id: args.dealer_id,
            sk: args.sk,
        },
    }

    return deleteItem(params, args)
}

export const getAllVehiclesByDealer = (dealerId: string) => {
    const params = {
        TableName,
        FilterExpression: 'dealer_id = :dealer_id AND contains(sk, :vehicle)',
        ExpressionAttributeValues: { ":dealer_id": dealerId, ":vehicle": "vehicle" },
    }

    return scan(params)
}
