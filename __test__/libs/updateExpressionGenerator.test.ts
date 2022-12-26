import { describe, test, expect } from '@jest/globals';
import { generateUpdateQuery } from '@libs/updateExpressionGenerator';

const validUpdateExpression = {
    UpdateExpression: 'set #dealer_name = :dealer_name',
    ExpressionAttributeNames: { '#dealer_name': 'dealer_name' },
    ExpressionAttributeValues: { ':dealer_name': 'ahmed' }
  }

describe("Update Expression Generator tests", () => {
    test('Should return valid dynamodb update expressions', () => {
        const response = generateUpdateQuery({ dealer_name: "ahmed"})
        expect(response).toEqual(validUpdateExpression)
    })

    test('Should return valid dynamo update expression with excluded attributes', () => {
        const response = generateUpdateQuery({ dealer_name: "ahmed", dealer_id: "random_dealer_id"}, ["dealer_id"])
        expect(response).toEqual(validUpdateExpression)
    })
})