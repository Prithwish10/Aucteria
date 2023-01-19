// Our end goal is after one hour, our auction will be closed and an email will be send to both winner and the seller with some congratulation message.
// So after every 1min this function will run and will check if the STATUS is OPEN end-time is in past or not
// If the end time is in past, that means that the aunction has ended, so we'll send an email to both the winner and the seller with some congratulation message
// Since we need to filter the auction based on the STATUS and End-time to we'll use the Global Secondary Index, where the partition key will be the STATUS and the sort key will be the End time.
// We could have also used scan, but it is very bad in terms of efficiency and cost
import createError from 'http-errors';
import { closeAuction } from '../../lib/closeAuction';
import { getEndedAuctions } from '../../lib/getEndedAuctions';

async function processAuction(event, context) {

    try {
        const auctionsToClose = await getEndedAuctions();
        // For performance reson I want to close all the auctions in parallely and not sequentially
        // If we do it sequentially we have to wait to close one, then the next one and ......
        // So we'll iterate over the array of auctionsToClose and the promise result of closeAuction()
        // Then we'll wait for all our promises to be resolved, or in other word close all the auctions parallely
        // So in this way we donot have to wait for each one of those close operations to be finished sequentially
        const closePromises = auctionsToClose.map(auction => closeAuction(auction));
        await Promise.all(closePromises);
        return { closed: closePromises.length }
    } catch(error) {
        console.log(error);
        throw new createError.InternalServerError(error);
    }
}

export const handler = processAuction;