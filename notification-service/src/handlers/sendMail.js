// This lambda will retrieve a recipient emailaddress, recipient name, title and email body, and send the email.

import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'eu-west-1' });

async function sendMail(event, context) {
  console.log(event);
  const record = event.Records[0];
  console.log('record ->', record);

  const email = JSON.parse(record.body);

  const { subject, body, recipient } = email;

  const params = {
    Source: 'prithwishdas60@gmail.com', //Sender (email is verified in AWS ses)
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body
        },
      },
      Subject: {
        Data: subject
      }
    }
  };

  try{
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch( error ){
    console.log(error);
  }
}

export const handler = sendMail;