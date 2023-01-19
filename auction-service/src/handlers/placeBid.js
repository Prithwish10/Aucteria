import AWS from 'aws-sdk'
import createError from 'http-errors'
import commonMiddleware from '../../lib/commonMiddleware'
import {getAuctionById_Helper} from './getAuctionById'
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function placeBid(event, context) {
    console.log(event);
    const { id } = event.pathParameters;
    const { email } = event.requestContext.authorizer;
    const { amount } = event.body;

    const auction = await getAuctionById_Helper(id);

    //Validate the case where the seller and the bidder is the same individual
    /*if(email === auction.seller){
        throw new createError.Forbidden('You cannot bid your own auction');
    }*/

    //Validate double bidding
    if(email === auction.highestBid.bidder){
        throw new createError.Forbidden('You are already the highest bidder');
    }

    //Auction status validation
    if(auction.status === 'CLOSED'){
        throw new createError.Forbidden('the auction has been closed');
    }

    // Validate for the amount
    if(amount <= auction.highestBid.amount){
        throw new createError.Forbidden(`Your bid must be higher than ${auction.highestBid.amount} !!`);
    }

    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set highestBid.amount = :amount, highestBid.bidder = :bidder',
        ExpressionAttributeValues: {
            ':amount': amount,
            ':bidder': email,
        },
        ReturnValues: 'ALL_NEW'
    }

    let updatedAuction;

    try {
        const result = await dynamoDB.update(params).promise();
        updatedAuction = result.Attributes;
    } catch(error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ updatedAuction }),
    };
}

export const handler = commonMiddleware(placeBid);
    // .use(httpJsonBodyParser())
    // .use(httpEventNormalizer())
    // .use(httpErrorHandler());