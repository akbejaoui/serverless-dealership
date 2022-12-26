import * as AWS from "aws-sdk";

let options = {};

console.log("is offline", process.env.IS_OFFLINE)

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const dynamoDBClient = new AWS.DynamoDB.DocumentClient(options);

export default dynamoDBClient
