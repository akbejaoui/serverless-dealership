import dynamoDBClient from "@models/index"


export function scan<T>(params): Promise<T> {
    return new Promise((resolve, reject) =>
        dynamoDBClient
            .scan(params)
            .promise()
            .then((data) => resolve(data.Items as T))
            .catch((err) => reject(err))
    )
}

export function get<T>(params): Promise<T> {
    return new Promise((resolve, reject) =>
        dynamoDBClient
            .get(params)
            .promise()
            .then((data) => resolve(data.Item as T))
            .catch((err) => reject(err))
    )
}

export function createItem<T>(params): Promise<T> {
    return new Promise((resolve, reject) =>
        dynamoDBClient
            .put(params)
            .promise()
            .then(() => resolve(params.Item as T))
            .catch((err) => reject(err))
    )
}

export function updateItem(params, args) {
    return new Promise((resolve, reject) =>
        dynamoDBClient
            .update(params)
            .promise()
            .then(() => resolve(args))
            .catch((err) => reject(err))
    )
}

export function deleteItem(params, args) {
    return new Promise((resolve, reject) =>
        dynamoDBClient
            .delete(params)
            .promise()
            .then(() => resolve(args))
            .catch((err) => reject(err))
    )
}
