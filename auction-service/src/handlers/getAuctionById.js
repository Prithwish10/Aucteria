import AWS from 'aws-sdk'
import createError from 'http-errors'
import commonMiddleware from '../../lib/commonMiddleware'
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export async function getAuctionById_Helper(id) {
    let auction;
    try {
        const result = await dynamoDB.get({
            TableName: process.env.AUCTION_TABLE_NAME,
            Key: { id }
        }).promise();

        auction = result.Item;
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    if(!auction) {
        throw new createError.NotFound(`Auction with ID ${id} not found`);
    }

    return auction;
}
async function getAuctionById(event, context) {

    const { id } = event.pathParameters;

    const auction = await getAuctionById_Helper(id);

    return {
        statusCode: 200,
        body: JSON.stringify({ auction }),
    };
}

export const handler = commonMiddleware(getAuctionById);
    // .use(httpJsonBodyParser())
    // .use(httpEventNormalizer())
    // .use(httpErrorHandler());