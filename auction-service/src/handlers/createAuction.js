import {v4 as uuid} from 'uuid'
import AWS from 'aws-sdk'
import commonMiddleware from '../../lib/commonMiddleware'
import createError from 'http-errors'

const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function createAuction(event, context) {
  console.log(event);
  // We dont need to parse the body becz this work will be done by the middleware httpJsonBodyParser
  const { title } = event.body;
  // After authorizing with the authorizer we get the claims of the JSON web token in the event obj
  // So fetching the email from that claim.
  // The purpose of this is we'll assign the seller with his email id
  const { email } = event.requestContext.authorizer;  
  const now = new Date();
  // EndDate will be 1hr in the future of the created date 
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const auction = {
    id: uuid(),
    title,
    status: "OPEN",
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0
    },
    seller: email
  }

  try{
    await dynamoDB.put({
      TableName: process.env.AUCTION_TABLE_NAME,  // "AuctionTable",
      Item: auction
    }).promise();
  }catch(error) {
    console.log(' Error while creating table -->',error);
    throw new createError.InternalServerError(error);
  }
  

  return {
    statusCode: 200,
    body: JSON.stringify({ auction }),
  };
}

export const handler = commonMiddleware(createAuction);
  // .use(httpJsonBodyParser())
  // .use(httpEventNormalizer())
  // .use(httpErrorHandler());