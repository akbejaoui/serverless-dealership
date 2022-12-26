import * as AWS from "aws-sdk";

let options = {};

const { DYNAMODB_LOCAL_ENDPOINT , DYNAMODB_LOCAL_REGION } = process.env

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: DYNAMODB_LOCAL_REGION,
    endpoint: DYNAMODB_LOCAL_ENDPOINT,
  };
}

const dynamoDBClient = new AWS.DynamoDB.DocumentClient(options);

export default dynamoDBClient
