import type { AWS } from "@serverless/typescript"

// DynamoDB
import dynamoDbTables from "./dynamodb/db-tables"

// serverless function - graphql server
import { dealership } from "./src/index"


const SERVICE_NAME = "serverless-dealership"
const STAGE = "dev"

const serverlessConfiguration: AWS = {
    service: SERVICE_NAME,
    frameworkVersion: "3",
    plugins: ["serverless-esbuild", "serverless-dynamodb-local", "serverless-offline", "serverless-dotenv-plugin"],
    provider: {
        name: "aws",
        runtime: "nodejs14.x",
        stage: STAGE,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
            NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
            DEALER_VEHICLE_TABLE: "${self:custom.dealer_vehicle_table}",
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: "Allow",
                        Action: [
                            "dynamodb:DescribeTable",
                            "dynamodb:Query",
                            "dynamodb:Scan",
                            "dynamodb:GetItem",
                            "dynamodb:PutItem",
                            "dynamodb:UpdateItem",
                            "dynamodb:DeleteItem",
                        ],
                        Resource: "arn:aws:dynamodb:${aws:region}:*:table/${SERVICE_NAME}-${sls:stage}",
                    },
                ],
            },
        },
    },
    // import the function via paths
    functions: { dealership },
    package: { individually: true },
    custom: {
        stage: '${opt:stage, self:provider.stage}',
        'serverless-offline': {
            useChildProcesses: true
        },
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ["aws-sdk"],
            target: "node14",
            define: { "require.resolve": undefined },
            platform: "node",
            concurrency: 10,
        },
        dealer_vehicle_table: "${self:service}-table-${opt:stage, self:provider.stage}",
        table_throughputs: {
            prod: 5,
            default: 1,
        },
        table_throughput: '${self:custom.table_throughputs.${self:custom.stage}, self:custom.table_throughputs.default}',
        dynamodb: {
            start: {
                docker: true,
                port: 8000,
                inMemory: true,
                migrate: true,
                seed: true,
                convertEmptyValues: true,
                noStart: true,
            },
            migration: {
                dir: "dynamodb/offline",
            },
            stages: [STAGE],
        }
    },
    resources: {
        Resources: dynamoDbTables,
    },
}

module.exports = serverlessConfiguration
