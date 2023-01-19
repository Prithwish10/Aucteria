import AWS from 'aws-sdk'

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function getEndedAuctions() {
    const now  = new Date();

    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        // Query to fetch the auctions where status = OPEN and endtime is in past
        KeyConditionExpression: '#status = :status AND endingAt <= :now',
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now.toISOString(),
        },
        // status is a reserved word in DynamoDB so we cannot write status directly instead of #status
        // So to work around that, in ExpressionAttributeNames we write #status means status
        ExpressionAttributeNames: {
            '#status': 'status',
        },
    }

    const result = await dynamoDB.query(params).promise();

    return result.Items;
}