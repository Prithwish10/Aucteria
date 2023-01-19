import AWS from 'aws-sdk';
import commonMiddleware from '../../lib/commonMiddleware';
import validator from '@middy/validator';
import getAuctionSchema from '../../lib/schemas/getAuctionSchema'
import createError from 'http-errors'; // This package allows us to create errors in a very declarative way

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function getAuction(event, context) {

    let {status} = event.queryStringParameters;

    if(!status){
        status = 'OPEN';
    }

    else if(status != 'OPEN' && status != 'CLOSED'){
        throw new createError.Forbidden('Enter a valid status');
    }
    let auctions;

    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status',
        ExpressionAttributeValues: {
            ':status' : status
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        }
    }

    try {
        const result = await dynamoDB.query(params).promise();
        auctions = result.Items;
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        // headers: {
        //     "Access-Control-Allow-Headers": "*",
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "*",
        //     "Accept": "*/*",
        //     "Content-Type": 'application/json'
        // },
        body: JSON.stringify({ auctions }),
    };
}

export const handler = commonMiddleware(getAuction);
    // .use(validator({ inputSchema: getAuctionSchema, useDefaults: true }));