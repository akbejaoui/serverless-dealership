export default {
    DealerVehicleTable: {
        Type: 'AWS::DynamoDB::Table',
        DeletionPolicy: 'Retain',
        Properties: {
            TableName: '${self:provider.environment.DEALER_VEHICLE_TABLE}',
            AttributeDefinitions: [
                { AttributeName: 'dealer_id', AttributeType: 'S' },
                { AttributeName: 'sk', AttributeType: 'S' } // sorting key will be our vehicle id or dealer type
            ],
            KeySchema: [
                { AttributeName: 'dealer_id', KeyType: 'HASH' },
                { AttributeName: 'sk', KeyType: 'RANGE' },
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: '${self:custom.table_throughput}',
                WriteCapacityUnits: '${self:custom.table_throughput}'
            }
        }
    }
}