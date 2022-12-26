import DealerModel, { DealerInterface } from "@models/dealer"

import { createItem, get, scan, updateItem, deleteItem } from "./dynamoService"

const TableName: string = process.env.DYNAMODB_DEALER_VEHICLE_TABLE

export const createDealer = (data): Promise<DealerInterface> => {
    const dealer = new DealerModel(data).getMappedObject<DealerInterface>()

    const params = {
        TableName,
        Item: {
            sk: "dealer",
            ...dealer,
        },
    }

    return createItem<DealerInterface>(params)
}

export const getDealer = (id: string): Promise<DealerInterface> => {
    const params = {
        TableName,
        Key: {
            dealer_id: id,
            sk: "dealer",
        },
    }

    return get<DealerInterface>(params)
}

export const getAllDealers = (): Promise<DealerInterface[]> => {
    const params = {
        TableName,
        FilterExpression: "sk = :dealer",
        ExpressionAttributeValues: {
            ":dealer": "dealer",
        }
    }

    return scan<DealerInterface[]>(params)
}

export const updateDealer = (args) => {
    const params = {
        TableName,
        Key: {
            dealer_id: args.dealer_id,
            sk: "dealer"
        },
        ExpressionAttributeValues: {
            ":dealer_name": args.dealer_name,
            ":last_updated": new Date().toISOString(),
        },
        UpdateExpression: "SET dealer_name = :dealer_name, last_updated = :last_updated",
        ReturnValues: "ALL_NEW",
    }

    return updateItem(params, args)
}

export function deleteDealer(args) {
    const params = {
        TableName,
        Key: {
            dealer_id: args.dealer_id,
            sk: "dealer"
        },
    }

    return deleteItem(params, args)
}
