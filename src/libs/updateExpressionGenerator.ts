export const generateUpdateQuery = (fields: any, excludes?: string[]) => {
    let expression = {
        UpdateExpression: 'set',
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {}
    }
    Object.entries(fields).forEach(([key, item]) => {
        if (excludes?.includes(key)) return
        expression.UpdateExpression += ` #${key} = :${key},`;
        expression.ExpressionAttributeNames[`#${key}`] = key;
        expression.ExpressionAttributeValues[`:${key}`] = item
    })
    expression.UpdateExpression = expression.UpdateExpression.slice(0, -1);
    return expression
}