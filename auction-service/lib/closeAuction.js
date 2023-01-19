import AWS from 'aws-sdk'

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS()

export async function closeAuction(auction) {

    const params = {
        TableName: process.env.AUCTION_TABLE_NAME,
        Key: { id: auction.id },
        UpdateExpression: 'set #status = :status',
        ExpressionAttributeValues: {
            ':status': 'CLOSED',
        },
        ExpressionAttributeNames: {
            '#status': 'status',
        }
    }

    await dynamoDB.update(params).promise();
    
    const {title, seller, highestBid } = auction;
    const { amount, bidder } = highestBid;

    //If there are no Bid for an auction and the auction is closed
    if(amount === 0){
        await sqs.sendMessage({
            QueueUrl: process.env.MAIL_QUEUE_URL,
            MessageBody: JSON.stringify({
                subject: 'No bids on your auction item',
                recipient: seller,
                body: `Oops! Your item ${title} did not get any bids. Better luck next time.`
            }),
        }).promise();
        return;
    }

    // Generate promises
    //One for notifying seller and one for notify bidder
    // Run promise all so that we can send messages to the sqs queue parallely
    const notifySeller = sqs.sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'Your Item has been sold',
            recipient: seller,
            body: `Woohoo! Your item ${title} has been sold at ${amount}`
        }),
    }).promise();

    const notifyBidder = sqs.sendMessage({
        QueueUrl: process.env.MAIL_QUEUE_URL,
        MessageBody: JSON.stringify({
            subject: 'You won an auction',
            recipient: bidder,
            body: `What a great deal! You got yourself a ${title} at ${amount}`
        }),
    }).promise();

    return Promise.all([notifySeller, notifyBidder]);
}