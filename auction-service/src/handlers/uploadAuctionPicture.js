import middy from '@middy/core';
import cors from '@middy/http-cors';
import httpErrorHandler from '@middy/http-error-handler'
import createError from 'http-errors'
import { uploadPictureToS3 } from '../../lib/uploadPictureToS3';
import { getAuctionById_Helper } from './getAuctionById';
import { setAuctionPictureUrl } from '../../lib/setAuctionPictureUrl'

async function uploadAuctionPicture(event) {
    
    const { id } = event.pathParameters;
    console.log("ID ====>",id);
    const { email } = event.requestContext.authorizer;
    const auction = await getAuctionById_Helper(id);

    //Make sure that the person who is uploading the picture is the seller
    if(auction.seller !== email){
        throw new createError.Forbidden('You have to be a seller to upload a picture!');
    }

    if(!event.body){
        throw new createError.Forbidden('No Picture is there to upload!');
    }
    const base64 = event.body.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');

    let updatedAuction;
    try{
        const pictureUrl = await uploadPictureToS3(auction.id + '.jpg,', buffer);
        updatedAuction = await setAuctionPictureUrl(id, pictureUrl);
    } catch( error ){
        console.log(error);
        throw new createError.InternalServerError(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAuction),
    }
}

export const handler = middy(uploadAuctionPicture)
    .use(httpErrorHandler())
    .use(cors());